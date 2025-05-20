// src/components/Menu.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBookOpen,
  FiPlayCircle,
  FiTrendingUp,
  FiMail,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={`menu-wrapper ${collapsed ? "collapsed" : ""}`}>
      <button
        className="toggle-button"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      <nav className="menu-nav">
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={location.pathname === "/dashboard" ? "active" : ""}
            >
              <FiHome /> {!collapsed && "Inicio"}
            </Link>
          </li>
          <li>
            <Link
              to="/cursos"
              className={location.pathname === "/cursos" ? "active" : ""}
            >
              <FiPlayCircle /> {!collapsed && "Cursos"}
            </Link>
          </li>
          <li>
            <Link
              to="/bitacora"
              className={location.pathname === "/bitacora" ? "active" : ""}
            >
              <FiBookOpen /> {!collapsed && "Bitácora"}
            </Link>
          </li>
          <li>
            <Link
              to="/noticias"
              className={location.pathname === "/noticias" ? "active" : ""}
            >
              <FiTrendingUp /> {!collapsed && "Noticias"}
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className={location.pathname === "/contacto" ? "active" : ""}
            >
              <FiMail /> {!collapsed && "Contacto"}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="menu-footer">{!collapsed && "© 2025 Álvaro Trader"}</div>
    </div>
  );
};

export default Menu;
