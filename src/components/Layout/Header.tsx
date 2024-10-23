import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTransition } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
const Header = () => {
  const { t, i18n } = useTransition();
  const [isDarkMore, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMore);
    document.documentElement.classList.toggle("dark");
  };

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
      <nav>
        <Link to="/" className="mr-4">
          {t("Home")}
        </Link>
        <Link to="/templates" className="mr-4">
          {t("Templates")}
        </Link>
        <Link to="/admin" className="mr-4">
          {t("Admin Panel")}
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <button onClick={() => switchLanguage("ka")}>Geo</button>
        <button onClick={() => switchLanguage("en")}>EN</button>
        <button onClick={() => switchLanguage("ru")}>RU</button>
        <button onClick={toggleTheme}>
          {isDarkMore ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-500" />
          )}
        </button>

        <input type="text" placeholder={t("Search")} className="p-2 rounded" />
      </div>
    </header>
  );
};

export default Header;
