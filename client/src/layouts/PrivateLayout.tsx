// src/layout/PrivateLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../pages/Menu";

const PrivateLayout = () => {
  return (
    <>
      <Menu />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
