import "./App.scss";
import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfrigration,getGenres } from "./store/homeslice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Pagenotfount from "./pages/404/Pagenotfount";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchresult/SearchResult";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    apiFetchConfig();
    genresCall();
  }, []);

  const apiFetchConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url ={
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }

      dispatch(getApiConfrigration(url));
    });
  };


  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<Pagenotfount />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
