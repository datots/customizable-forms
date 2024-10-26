// src/Forms/Comments.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import your Firebase config
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Comments = ({ templateId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, "comments"),
        where("templateId", "==", templateId)
      );
      const querySnapshot = await getDocs(q);
      const commentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsList);
    };

    fetchComments();
  }, [templateId]);

  const handleAddComment = async () => {
    await addDoc(collection(db, "comments"), { text: newComment, templateId });
    setNewComment("");
    // Re-fetch comments to show the new one
    const fetchComments = async () => {
      const q = query(
        collection(db, "comments"),
        where("templateId", "==", templateId)
      );
      const querySnapshot = await getDocs(q);
      const commentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsList);
    };
    fetchComments();
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Comments</h2>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="border p-2 mb-2">
            {comment.text}
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white p-2 mt-2 rounded"
      >
        Submit Comment
      </button>
    </div>
  );
};

export default Comments;
