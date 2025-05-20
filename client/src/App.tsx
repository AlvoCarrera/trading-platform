// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import Menu from "./components/Menu";
import TopBar from "./components/TopBar";
import Spinner from "./components/Spinner";

const AppContent = () => {
  const { user, loading } = useAuth();
  const { loading: globalLoading } = useLoading();

  if (loading) return null;

  return (
    <>
      {globalLoading && <Spinner />}
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
        <LoadingProvider>
          <MenuProvider>
            <AppContent />
          </MenuProvider>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
