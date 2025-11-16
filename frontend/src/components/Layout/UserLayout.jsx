import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet, useLocation } from "react-router-dom";


const UserLayout = () => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/register'];

  const shouldHideLayout = hideOnRoutes.includes(location.pathname);
  return (
     <>
    {!shouldHideLayout && <Header/>}
      <main>
        <Outlet/>
      </main>
     {!shouldHideLayout && <Footer/>}
     </>
  );
};

export default UserLayout;
