// src/components/TopBar.tsx
import { useAuth } from "../context/AuthContext";

const TopBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>Trading App</h1>
      </div>
      <div className="topbar-right">
        <span>{user?.displayName}</span>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default TopBar;
