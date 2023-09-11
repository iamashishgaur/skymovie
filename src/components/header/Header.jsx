import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.scss";

import ContentWrapper from "../contentwraper/Contentwraper";
import logo from "../../Assets/images/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandlar = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const opensearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobilMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <h1>SKYmovie</h1>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("Tv")}>
            Tv Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={opensearch} />
          </li>
        </ul>
        <div className="mobileMenuItems ">
          <HiOutlineSearch onClick={opensearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobilMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <contentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search Movie And Tv Show"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandlar}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </contentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
