import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({onChange}) => {
  const location = useLocation();

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(searchValue);
  }

  return (
    <header className="header_container">
      <div className="header_content">
        <Link to="/" className="header_logo">
          Кинопоиск Light
        </Link>
        {location.pathname === "/" && (
          <form onSubmit={handleSubmit} className="submiting_form">
            <input
              type="text"
              className="header_search"
              placeholder="Поиск"
              onChange={handleSearchChange}
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
