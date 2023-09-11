import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentwraper/Contentwraper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../Assets/images/no-results.png";
import './SearchResult.scss'

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {loading && (
        <ContentWrapper>
          {data.results.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "results " : "result"} Of '${query}'`}
              </div>
            </>
          ) : (
            <span className="resultNotFount">
              Sorry Result Not found
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};


export default SearchResult;