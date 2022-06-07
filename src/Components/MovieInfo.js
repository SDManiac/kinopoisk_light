import React from "react";
import { getRatingMP, checkExpRating, splitDesc } from "../utils/utils";

const MovieInfo = ({data}) => {
    return (
        <table className="rwd-table">
        <tr className="t-row">
            <th className="row-name">Название</th>
            <td className="row-content">
                {data.nameRu}</td>
        </tr>
        <tr className="t-row">
            <th className="row-name">Жанр</th>
            <td className="row-content">
                {data.genres.map(
                    (genre) => ` ${genre.genre}`)}
            </td>
        </tr>
        <tr className="t-row">
            <th className="row-name">Год</th>
            <td className="row-content">
                {data.year}</td>
        </tr>
        <tr className="t-row">
            <th className="row-name">Страна</th>
            <td className="row-content">
                {data.countries.map(
                    (country) => ` ${country.country}`)}
            </td>
        </tr>
        <tr className="t-row">
            <th className="row-name">Синопсис</th>
            <td className="row-content">
                <label className="text-chkbox">
                    <div className="label-text" title="Читать полностью">{data.description.slice(0,56).trimEnd()}</div>
                    <input type="checkbox" className="checkbox"/>
                    <div className="hidden-text">{splitDesc(data.description)}</div>
                </label>
            </td>
        </tr>
        <tr className="t-row">
            <th className="row-name">{checkExpRating(data.ratingKinopoisk, data.ratingAwait)}</th>
            <td className="row-content">{getRatingMP(data.ratingKinopoisk, data.ratingAwait)}</td>
        </tr>
    </table>
    )
}

export default MovieInfo;