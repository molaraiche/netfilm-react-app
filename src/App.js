import { useEffect, useState } from "react";
import Movies from "./components/Movies";
import Shows from "./components/Shows";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [trends, setTrends] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchLogic, setSearchLogic] = useState("");
  const [searchMovies, setSearchMovies] = useState("");
  const [searchParam] = useState(["title"]);
  const [searchMParam] = useState(["title"]);
  useEffect(() => {
    const getMovies = async () => {
      setisLoading(true);
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=a947b0189bb3d9fa0a8bc001124b7487&language=en-US&page=1"
      );
      const data = await res.json();
      setMovies(data.results);
      setisLoading(false);
    };
    const getShows = async () => {
      setisLoading(true);
      const res = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=a947b0189bb3d9fa0a8bc001124b7487&language=en-US&page=1"
      );
      const data = await res.json();
      setShows(data.results);
      setisLoading(false);
    };
    const getTrends = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=a947b0189bb3d9fa0a8bc001124b7487"
      );
      const data = await res.json();
      setTrends(data.results);
    };

    getTrends();
    getMovies();
    getShows();
  }, []);
  return (
    <div className="box">
      <NavBar />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home trends={trends} isLoading={isLoading} />}
        />
        <Route
          path="/movie"
          element={
            <Movies
              searchMParam={searchMParam}
              searchMovies={searchMovies}
              setSearchMovies={setSearchMovies}
              movies={movies}
              isLoading={isLoading}
              setisLoading={setisLoading}
            />
          }
        />
        <Route
          path="/show"
          element={
            <Shows
              shows={shows}
              isLoading={isLoading}
              setisLoading={setisLoading}
              searchLogic={searchLogic}
              setSearchLogic={setSearchLogic}
              searchParam={searchParam}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
