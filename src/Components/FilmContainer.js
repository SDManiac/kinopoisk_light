import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../utils/utils";
import MoviePoster from "./MoviePoster";
import MovieInfo from "./MovieInfo";

const API_URL_FILM = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

const FilmContainer = () => {
    const {id} = useParams();


    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    useEffect( () => {
        getData(`${API_URL_FILM}${id}`).then((respData) => {
            setData(respData)
        });
    },[]);
    useEffect( () => {
        if (data && Object.keys(data).length === 0) {
            setError(true)
        }
    })
    return (
        <div className="container-mp">
            {!(Object.keys(data).length === 0) && (<MoviePoster data={data} />)}
            {!(Object.keys(data).length === 0) && (<MovieInfo data={data} />)}
            {!error && (<p style={{color: '#fff'}}>По вашему запросу ничего не найдено</p>)}
        </div>
    )
}

export default FilmContainer;