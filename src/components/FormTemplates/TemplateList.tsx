import { useEffect, useState, useCallback } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  startAfter,
  limit,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import debounce from "lodash.debounce";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt?: any;
  popularity?: number;
}

const TemplateList = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [latestVisible, setLatestVisible] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"latest" | "popular">("latest");
  const [noResults, setNoResults] = useState(false);
  const [authError, setAuthError] = useState(false);

  const getTemplateQuery = (startAfterDoc?: any) => {
    const baseQuery = collection(db, "templates");
    const userId = auth.currentUser?.uid;
    const orderField = filter === "latest" ? "createdAt" : "popularity";

    if (!userId) {
      console.error("No user ID found.");
      return null;
    }

    let templateQuery = query(
      baseQuery,
      where("creatorId", "==", userId),
      orderBy(orderField, filter === "latest" ? "desc" : "asc"),
      limit(19)
    );

    if (startAfterDoc) {
      templateQuery = query(templateQuery, startAfter(startAfterDoc));
    }

    return templateQuery;
  };

  const loadTemplates = useCallback(
    async (isLoadMore = false) => {
      setLoading(true);
      setAuthError(false);
      try {
        if (!auth.currentUser) {
          setAuthError(true);
          return;
        }

        const templateQuery = getTemplateQuery(
          isLoadMore ? latestVisible : null
        );
        if (!templateQuery) return;

        const querySnapshot = await getDocs(templateQuery);

        if (!querySnapshot.empty) {
          const lastVisibleDoc =
            querySnapshot.docs[querySnapshot.docs.length - 1];
          setLatestVisible(lastVisibleDoc);

          const newTemplates = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Template[];

          if (isLoadMore) {
            setTemplates((prev) => [...prev, ...newTemplates]);
            if (newTemplates.length < 19) {
              alert("No more templates available.");
            }
          } else {
            setTemplates(newTemplates);
            setNoResults(newTemplates.length === 0);
          }
        } else {
          setNoResults(true);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
        alert("Failed to load templates. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [filter, latestVisible]
  );

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      setLoading(true);
      if (!term.trim()) {
        setTemplates([]);
        setNoResults(false);
        setLoading(false);
        return;
      }

      try {
        const searchQuery = query(
          collection(db, "templates"),
          where("name", ">=", term),
          where("name", "<=", term + "\uf8ff"),
          limit(10)
        );

        const querySnapshot = await getDocs(searchQuery);
        const searchResults = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Template[];

        setNoResults(searchResults.length === 0);
        setTemplates(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
        alert("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    debouncedSearch(searchTerm);
    setSearchTerm("");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);
        loadTemplates();
      } else {
        console.log("No user is logged in.");
        setAuthError(true);
        setTemplates([]);
      }
    });

    return () => unsubscribe();
  }, [loadTemplates]);

  return (
    <div className="template-list max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Template List
      </h2>

      {authError && (
        <p className="text-center text-red-500">
          Please log in to view your templates.
        </p>
      )}

      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-4 mb-6"
      >
        <input
          type="text"
          placeholder="Search by template name..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>

      <div className="mb-6">
        <select
          onChange={(event) =>
            setFilter(event.target.value as "latest" | "popular")
          }
          value={filter}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card p-4 border rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600">{template.description}</p>
              <p className="text-sm text-gray-500">
                Category: {template.category}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && templates.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => loadTemplates(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Load More
          </button>
        </div>
      )}

      {!loading && templates.length === 0 && noResults && (
        <p className="text-center text-gray-500">No templates found.</p>
      )}
    </div>
  );
};

export default TemplateList;
