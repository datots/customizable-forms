import { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase"; // Firebase authentication and Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore document functions
import { useNavigate } from "react-router-dom"; // React Router for navigation
import TemplateList from "../FormTemplates/TemplateList"; // Component to list templates
import TemplateTabs from "../FormTemplates/TemplateTabs"; // Component for tab navigation
import CreateTemplate from "../FormTemplates/CreateTemplate"; // Component to create new templates
import EditTemplate from "../FormTemplates/EditTemplate"; // Component to edit templates
import TemplateDetails from "../FormTemplates/TemplateDetails"; // Component to show template details

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("templates");

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(
            doc(firestore, "users", auth.currentUser.uid)
          );
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user is currently logged in.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading user data...</p>;
  }

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      {userData ? (
        <div>
          <h2>Welcome, {userData.firstname}!</h2>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>

          <h3>Your Details:</h3>
          <p>City: {userData.city}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <TemplateTabs onTabChange={handleTabChange} />
          {activeTab === "templates" && <TemplateList />}
          {activeTab === "create" && <CreateTemplate />}
          {activeTab === "edit" && <EditTemplate />}
          {activeTab === "details" && <TemplateDetails />}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDashboard;
