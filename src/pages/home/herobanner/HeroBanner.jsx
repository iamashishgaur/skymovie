import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.scss";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/imgLazyloading/img";
import ContentWrapper from "../../../components/contentwraper/Contentwraper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandlar = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };
  
  return (
    <>
      <div className="hero-banner">
        {!loading && (
          <div className="backdrop-img">
            <img src={background} />
          </div>
        )}

        <div className="opacity-layer"></div>

        <ContentWrapper>
          <div className="hero-banner-content">
            <span className="title">Welcome</span>
            <span className="sub-title">
              {" "}
              Miliens Of Movie an show discover
            </span>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search Movie And Tv Show"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandlar}
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
