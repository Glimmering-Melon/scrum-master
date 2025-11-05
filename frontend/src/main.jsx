import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import DashboardSupervisor from "./pages/DashboardSupervisor.jsx";
import MyReports from "./pages/MyReports.jsx";
import EmployeeDetail from "./pages/EmployeeDetail.jsx";


const Guard = ({ role, children }) => {
  const me = JSON.parse(localStorage.getItem("user") || "null");
  if (!me) return <Navigate to="/login" replace />;
  if (role && me.role !== role) return <Navigate to="/login" replace />;
  return children;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/supervisor"
        element={
          <Guard role="supervisor">
            <DashboardSupervisor />
          </Guard>
        }
      />
      <Route
        path="/me"
        element={
          <Guard role="employee">
            <MyReports />
          </Guard>
        }
      />
      <Route
  path="/employee/:id"
  element={
    <Guard role="supervisor">
      <EmployeeDetail />
    </Guard>
  }
/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
