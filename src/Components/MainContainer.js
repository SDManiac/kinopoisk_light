import React, { useEffect, useState } from "react";
import { getData } from "../utils/utils";
import Card from "./Card";

const API_URL_POP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const MainContainer = () => {
    const form = document.querySelector('.submiting_form');
    const search = document.querySelector('.header_search');

    useEffect( () => {
        if (data.films && data.films.length !== 0) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
        
                const apiSearchURL = `${API_URL_SEARCH}${search.value}`;
                if (search.value) {
                    getData(apiSearchURL).then((respData) =>{
                        setData(respData);
                    });
                }
            });
        }
    })

    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    useEffect( () => {
        getData(API_URL_POP).then((respData) => {
            setData(respData)
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
            {error && (<p style={{color: '#fff'}}>По вашему запросу ничего не найдено</p>)}
        </div>
    )
}

export default MainContainer