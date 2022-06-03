import React from "react";
import { Link } from "react-router-dom";
import { getColorByRating, getRating } from "../utils/utils";

const Card = ({movie}) => {
    return (
        <div className="card">
            <Link to={`film/${movie.filmId}`}>
                <div className="content">
                    <div className="img_container">
                        <img className="img_inner"
                            src={movie.posterUrlPreview}
                            alt={movie.nameRu} />
                    </div>
                    <div className={`movie_score movie_score--${getColorByRating(movie.rating)}`}>{getRating(movie.rating)}</div>
                </div>
            </Link>
        <div className="movie_category">{movie.genres.slice(0, 2).map(
            (genre) => ` ${genre.genre}`
            )}
        </div>
        </div>
    )
}

export default Card