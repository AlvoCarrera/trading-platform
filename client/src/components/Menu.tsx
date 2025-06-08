import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiBook,
  FiEdit,
  FiBarChart2,
  FiMail,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiSun,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const Menu = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    { path: "/dashboard", label: "Inicio", icon: <FiHome /> },
    { path: "/cursos", label: "Cursos", icon: <FiBook /> },
    { path: "/bitacora", label: "Bitácora", icon: <FiEdit /> },
    { path: "/noticias", label: "Noticias", icon: <FiBarChart2 /> },
    { path: "/contacto", label: "Contacto", icon: <FiMail /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </div>

        <div className="logo">{!collapsed && "Trading App"}</div>

        <nav className="menu-items">
          {menuItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              {icon}
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="user-section" ref={dropdownRef}>
          <div
            className="user-name"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="avatar">{user?.displayName?.[0] || "U"}</div>
            {!collapsed && <span>{user?.displayName || "Usuario"}</span>}
          </div>

          {dropdownOpen && !collapsed && (
            <div className="dropdown animated">
              <div className="dropdown-item">
                <FiUser /> Ver perfil
              </div>
              <div className="dropdown-item">
                <FiSun /> Modo claro/oscuro
              </div>
              <div className="dropdown-item">
                <FiSettings /> Configuración
              </div>
              <hr />
              <button onClick={logout} className="dropdown-item logout">
                <FiLogOut /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Menu;
