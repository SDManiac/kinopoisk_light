import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header_container">
      <div className="header_content">
        <Link to="/" className="header_logo">
          Кинопоиск Light
        </Link>
        {location.pathname === "/" && (
          <form className="submiting_form">
            <input
              type="text"
              className="header_search"
              placeholder="Поиск"
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
