// NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-4 text-blue-500 underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
