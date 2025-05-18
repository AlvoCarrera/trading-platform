// src/pages/Dashboard.tsx

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="login-container">
      <h2>Bienvenido, {user?.displayName}</h2>
      <p>Tu correo: {user?.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
