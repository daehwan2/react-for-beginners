import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [rating, setRating] = useState(9.0);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, [rating]);
  console.log(movies);
  return (
    <div>
      <div className={styles.home}>
        <Link to={`${process.env.PUBLIC_URL}/`} className={styles.home_text}>
          MOVIES
        </Link>
        <div className={styles.select_container}>
          <div className={styles.star}>★</div>
          <select
            className={styles.select}
            onChange={(e) => {
              setLoading(true);
              setRating(Number(e.target.value));
            }}
          >
            <option key="9.5" value="9.5">
              9.5
            </option>
            <option key="9.0" value="9.0">
              9.0
            </option>
            <option key="8.5" value="8.5">
              8.5
            </option>
            <option key="8.0" value="8.0">
              8.0
            </option>
            <option key="7.5" value="7.5">
              7.5
            </option>
            <option key="7.0" value="7.0">
              7.0
            </option>
            <option key="6.5" value="6.5">
              6.5
            </option>
            <option key="6.0" value="6.0">
              6.0
            </option>
          </select>
          <div className={styles.arrow}>↑</div>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <h1 className={styles.loading}>Loading...</h1>
        </div>
      ) : (
        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                coverImg={movie.medium_cover_image}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
