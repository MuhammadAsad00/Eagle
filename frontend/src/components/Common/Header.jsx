import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { userDataContext } from "../../context/UserContext";

const Header = ({ isTransparent = false }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("home");

  // Detect current page from route
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") setCurrentPage("home");
    else if (path.includes("collection")) setCurrentPage("collection");
    else if (path.includes("profile")) setCurrentPage("profile");
    else if (path.includes("product")) setCurrentPage("product");
    else if (path.includes("checkout")) setCurrentPage("checkout");
    else if (path.includes("order-confirmation")) setCurrentPage("order-confirmation");
    else if (path.includes("order")) setCurrentPage("order");
    else setCurrentPage("other");
  }, [location]); // re-run when route changes 

  const shouldBeTransparent = isTransparent || currentPage === "home";

  const headerClass = shouldBeTransparent
    ? "absolute top-0 left-0 w-full z-50 bg-transparent"
    : "sticky top-0 w-full z-50 bg-white shadow-sm";

  const textColor = shouldBeTransparent ? "text-white" : "text-black";
  const hoverColor = "hover:text-yellow-500";

  const { userData } = useContext(userDataContext);

  return (
    <header className={headerClass}>
      <Navbar
        textColor={textColor}
        hoverColor={hoverColor}
        shouldBeTransparent={shouldBeTransparent}
      />
    </header>
  );
};

export default Header;
