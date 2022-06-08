const API_URL_FILM = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
import { getData } from './api.js';


// Получение текущего id фильма и рендер страницы
const currFilmId = new URLSearchParams(window.location.search).get('id');
getData(`${API_URL_FILM}${currFilmId}`).then((respData) => {
    showMoviePoster(respData);
    showMovieInfo(respData);
    showSynopsis(respData)
});

/**
 * Если фильм новый, то изменяет заголовок на 'Рейтинг ожидания'
 * 
 * @param {string} rate - Рейтинг фильма
 * @param {string} rateAwait - Рейтинг ожидания фильма
 * @returns {string}
 */
function checkExpRating(rate, rateAwait) {
    if (!rate && rateAwait) {
        return 'Рейтинг ожидания'
    } else {
        return 'Рейтинг'
    }
}

/**
 * Если рейтинг отсутсвует, возвращает 'Рейтинг отсутстует'
 * Если фильм новый, возвращает рейтинг ожидания в процентах
 * 
 * @param {string} rate - Рейтинг фильма
 * @param {string} rateAwait - Рейтинг ожидания фильма
 * @returns {string}
 */
 function getRating(rate, rateAwait) {
    if (!rate && !rateAwait) {
        return '😞Рейтинг отсутстует😞'
    } else if (!rate) {
        return rateAwait + '%'
    } else {
        return rate
    }
}

/**
 * Метод отрисовывает постер фильма
 * 
 * @param {object} data - Данные, полученные с API
 */
function showMoviePoster(data) {
    const moviePosterContainer = document.querySelector('.container-mp');

    const moviePoster = document.createElement('div');
    moviePoster.insertAdjacentHTML('afterBegin', `
    <div class="poster">
        <div class="poster_img">
            <img class="poster_img_inner" src="${data.posterUrl}"
                alt="${data.nameRu}">
        </div>
    </div>
    `);
    moviePosterContainer.appendChild(moviePoster);
}

/**
 * Метод отрисовывает таблицу с подробной информацией о фильме
 * 
 * @param {object} data - Данные, полученные с API
 */
function showMovieInfo(data) {
    const movieInfoContainer = document.querySelector('.container-mp');

    const infoTable = document.createElement('table');
    infoTable.classList.add('rwd-table');
    infoTable.insertAdjacentHTML('afterBegin', `
    <table>
        <tr class="t-row">
            <th class="row-name">Название</th>
            <td class="row-content">
                ${data.nameRu}</td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Жанр</th>
            <td class="row-content">
                ${data.genres.map(
                    (genre) => ` ${genre.genre}`)}
            </td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Год</th>
            <td class="row-content">
                ${data.year}</td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Страна</th>
            <td class="row-content">
                ${data.countries.map(
                    (country) => ` ${country.country}`)}
            </td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Синопсис</th>
            <td class="row-content">
                <a href="#popup" title="Читать полностью" style="text-decoration: none; color: #fff;">${data.description.slice(0,56).trimEnd() + '...'}</a>
            </td>
        </tr>
        <tr class="t-row">
            <th class="row-name">${checkExpRating(data.ratingKinopoisk, data.ratingAwait)}</th>
            <td class="row-content">${getRating(data.ratingKinopoisk, data.ratingAwait)}</td>
        </tr>
    </table>
    `);
    movieInfoContainer.appendChild(infoTable);
}

/**
 * Метод отрисовывает попап с синопсисом фильма
 * 
 * @param {object} data - Данные, полученные с API
 */
function showSynopsis(data) {
    const descPopupArea = document.querySelector('.body_style');
    const descPopup = document.createElement('div');
    descPopup.insertAdjacentHTML('afterBegin', `
    <div class="popup" id="popup">
        <a href="#header" class="popup__area"></a>
        <div class="popup-inner">
            <div class="popup__text">
                <p>${data.description}</p>
            </div>
            <a class="popup__close" href="#header">X</a>
        </div>
    </div>
    `);
    descPopupArea.appendChild(descPopup);
}