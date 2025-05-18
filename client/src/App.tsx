// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import Menu from "./pages/Menu";
import TopBar from "./pages/TopBar";

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <>
      {user && <TopBar />}
      <div className="layout">
        {user && <Menu />}
        <AppRoutes />
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <AppContent />
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
