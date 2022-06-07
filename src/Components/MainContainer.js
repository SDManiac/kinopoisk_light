import React, { useEffect, useState } from "react";
import { getData } from "../utils/utils";
import { useStateIfMounted } from "use-state-if-mounted";
import Card from "./Card";


const API_URL_POP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const MainContainer = ({searchValue, removeSearch}) => {
    const [data, setData] = useStateIfMounted({});
    const [error, setError] = useState(false);

    useEffect( () => {
        if (data.films && data.films.length !== 0) {
            const apiSearchURL = `${API_URL_SEARCH}${searchValue}`;
            if (searchValue) {
                getData(apiSearchURL).then((respData) =>{
                    setData(respData);
                    removeSearch();
                });
            }
        }
    })

    useEffect( () => {
        getData(API_URL_POP).then((respData) => {
            setData(respData);
        });
    },[]);
    useEffect( () => {
        if (data.films && data.films.length === 0) {
            setError(true)
        }
    })
    return (
        <div className="container">
            {data.films && data.films.map(film => <Card movie={film} />)}
            {error && (<p className="text_color">По вашему запросу ничего не найдено</p>)}
        </div>
    )
}

export default MainContainer