import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import Register from "./Register";
import PrivateRoutes from "./PrivateRoutes";
import HomePage from "./HomePage";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              {" "}
              <HomePage />
            </PrivateRoutes>
          }
        >
          {" "}
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default AllRoutes;
