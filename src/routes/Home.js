import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [rating, setRating] = useState(9.0);
  const [sortby, setSortby] = useState("year");
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=${sortby}`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, [rating, sortby]);
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
            className={styles.select2}
            onChange={(e) => {
              setLoading(true);
              setRating(Number(e.target.value));
            }}
          >
            <option key="9.0" value="9.0">
              9.0
            </option>
            <option key="8.0" value="8.0">
              8.0
            </option>
            <option key="7.0" value="7.0">
              7.0
            </option>
            <option key="6.0" value="6.0">
              6.0
            </option>
            <option key="5.0" value="5.0">
              5.0
            </option>
            <option key="4.0" value="4.0">
              4.0
            </option>
            <option key="3.0" value="3.0">
              3.0
            </option>
            <option key="2.0" value="2.0">
              2.0
            </option>
            <option key="1.0" value="1.0">
              1.0
            </option>
          </select>
          <div className={styles.arrow}>↑</div>
        </div>
        <div className={styles.select_container2}>
          <div className={styles.solt}>SoltBy: </div>
          <select
            className={styles.select}
            onChange={(e) => {
              setLoading(true);
              setSortby(e.target.value);
            }}
          >
            <option key="year" value="year">
              year
            </option>
            <option key="title" value="title">
              title
            </option>
            <option key="rating" value="rating">
              rating
            </option>
            <option key="download_count" value="download_count">
              download_count
            </option>
            <option key="like_count" value="like_count">
              like_count
            </option>
          </select>
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
