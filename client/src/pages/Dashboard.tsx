// src/pages/Dashboard.tsx

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <span>{user?.displayName}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      </header>
      <aside className="dashboard-sidebar">
        <nav>
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Cursos</a>
            </li>
            <li>
              <a href="#">Bitácora</a>
            </li>
            <li>
              <a href="#">Noticias</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <h2>Bienvenido, {user?.displayName}</h2>
        <p>Este será tu centro de control.</p>
      </main>
    </div>
  );
};

export default Dashboard;
