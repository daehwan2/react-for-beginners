import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  console.log(movie);
  return (
    <div>
      <div className={styles.home}>
        <Link to={`${process.env.PUBLIC_URL}/`} className={styles.home_text}>
          HOME
        </Link>
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <h1 className={styles.loading}>Loading...</h1>
        </div>
      ) : (
        <div className={styles.container}>
          <img className={styles.image} src={movie.large_cover_image} />

          <div className={styles.container2}>
            <h1 className={styles.title}>{movie.title_long}</h1>

            <strong className={styles.rating}>⭐ : {movie.rating}</strong>
            <div className={styles.runtime}>
              runtime: {movie.runtime}minutes
            </div>
            <p className={styles.description}>{movie.description_full}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
