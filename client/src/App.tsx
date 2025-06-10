// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { NotificationProvider } from "./context/NotificationContext";
import Menu from "./components/Menu";
import Spinner from "./components/Spinner";
import { useState } from "react";

const AppContent = () => {
  const { user, loading } = useAuth();
  const { loading: globalLoading } = useLoading();
  const [collapsed, setCollapsed] = useState(false);

  if (loading) return null;

  return (
    <>
      {globalLoading && <Spinner />}
      {user ? (
        <div className={`layout-container ${collapsed ? "collapsed" : ""}`}>
          <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="layout">
            <AppRoutes />
          </div>
        </div>
      ) : (
        <AppRoutes />
      )}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <LoadingProvider>
            <MenuProvider>
              <AppContent />
            </MenuProvider>
          </LoadingProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
