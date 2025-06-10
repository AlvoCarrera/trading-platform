// src/layout/PrivateLayout.tsx
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

const PrivateLayout = () => {
  return (
    <>
      <Menu
        collapsed={false}
        setCollapsed={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
