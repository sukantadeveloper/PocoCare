import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    // Redirect to the login page if refreshToken is not available
    return <Navigate to="/login" />;
  }

  // If refreshToken is available, render the child components
  return <>{children}</>;
}

export default PrivateRoutes;
