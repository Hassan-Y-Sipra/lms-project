import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../../pages/admin/login/Login";
import Dashboard from "../../pages/admin/Dashboard/Dasboard";
import Course from "../../pages/admin/courses/Course";
import Module from "../../pages/admin/courses/Module";
const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedLogin>
              <Dashboard />
            </ProtectedLogin>
          }
        />

        <Route
          path="/course"
          element={
            <ProtectedLogin>
              <Course />
            </ProtectedLogin>
          }
        />
        <Route
          path="/course/module/:id"
          element={
            <ProtectedLogin>
              <Module />
            </ProtectedLogin>
          }
        />
      </Routes>
    </>
  );
};

const ProtectedLogin = ({ children }) => {
  const isLoddedIn = localStorage.getItem("isLogin");
  return isLoddedIn ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
