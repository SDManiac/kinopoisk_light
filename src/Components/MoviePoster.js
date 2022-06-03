import React from "react";

const MoviePoster = ({data}) => {
    return (
        <div className="poster">
            <div className="poster_img">
                <img className="poster_img_inner" src={data.posterUrl}
                    alt={data.nameRu}>
                </img>
            </div>
        </div>
    )
}

export default MoviePoster;