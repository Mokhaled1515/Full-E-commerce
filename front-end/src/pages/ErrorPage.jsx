import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const is404 = error?.status === 404 || error?.statusText === "Not Found";

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-green-600">
          {is404 ? "404" : "Oops!"}
        </h1>

        <h2 className="text-2xl font-semibold mt-4 dark:text-white">
          {is404 ? "Page Not Found" : "Something went wrong"}
        </h2>

        <p className="text-gray-500 mt-2 dark:text-gray-400">
          The page you're looking for doesn't exist or the URL is incorrect.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
