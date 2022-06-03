import React from "react";
import { Link } from "react-router-dom";

const Popup = ({data}) => {
    return (
        <div className="popup" id="popup">
            <Link to={`/film/${data.kinopoiskId}`} className="popup__area"></Link>
            <div className="popup-inner">
                <div className="popup__text">
                    <p>{data.description}</p>
                </div>
                <Link className="popup__close" to={`/film/${data.kinopoiskId}`}>X</Link>
            </div>
        </div>
    )
}

export default Popup;