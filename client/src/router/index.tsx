// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Noticias from "../pages/News";
import Bitacora from "../pages/Bitacora";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/noticias"
        element={
          <PrivateRoute>
            <Noticias />
          </PrivateRoute>
        }
      />

      <Route
        path="/bitacora"
        element={
          <PrivateRoute>
            <Bitacora />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
