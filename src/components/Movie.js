import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
function Movie({ id, title, coverImg, summary, genres }) {
  return (
    <div className={styles.movie_item}>
      <Link
        className={styles.link_item}
        to={`${process.env.PUBLIC_URL}/movie/${id}`}
      >
        <h2 className={styles.movie_title}>{title}</h2>
        <div className={styles.movie_imageAndDescription}>
          <img className={styles.movie_image} src={coverImg} alt={title} />

          <p>
            {summary.length >= 300 ? summary.slice(0, 300) + "..." : summary}
          </p>
        </div>
      </Link>
    </div>
  );
}
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
