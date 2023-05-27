import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoutes({ children }) {
  const AccessToken = localStorage.getItem("AccessToken");
  if (!AccessToken) {
    return <Navigate to="/register" />;
  }
  return <>{children}</>;
}

export default PrivateRoutes;
