const API_key = 'e0b8ee73-8e36-4d46-9651-177fdcb541a8';
const API_url_filmInfo = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'


// Получение текущего id фильма для поиска информации о нем
const currFilmId = new URLSearchParams(window.location.search).get('id');
getMovieInfo(`${API_url_filmInfo}${currFilmId}`);

/**
 * 
 * @param {string} url 
 */
async function getMovieInfo(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_key
        }
    });
    const respData = await resp.json();
    showMovieInfo(respData)
}

/**
 * Если фильм новый, то изменяет заголовок на 'Рейтинг ожидания'
 * 
 * @param {string} rate 
 * @param {string} rateAwait
 * @returns {string}
 */
function checkExpRating(rate, rateAwait) {
    if (rate == null && rateAwait != null) {
        return 'Рейтинг ожидания'
    } else {
        return 'Рейтинг'
    }
}

/**
 * Если рейтинг отсутсвует, возвращает 'Рейтинг отсутстует'
 * Если фильм новый, возвращает рейтинг ожидания в процентах
 * 
 * @param {string} rate 
 * @param {string} rateAwait
 * @returns {string}
 */
 function getRating(rate, rateAwait) {
    if (rate == null && rateAwait == null) {
        return '😞Рейтинг отсутстует😞'
    } else if (rate == null) {
        return rateAwait + '%'
    } else {
        return rate
    }
}

/**
 * 
 * @param {object} data 
 */
function showMovieInfo(data) {
    const movieInfo = document.querySelector('.container-mp');

    const moviePoster = document.createElement('div');
    moviePoster.classList.add('big_poster');
    moviePoster.innerHTML = `
    <div class="poster">
        <div class="poster_img">
            <img class="poster_img_inner" src="${data.posterUrl}"
                alt="${data.nameRu}">
        </div>
    </div>
    `;
    movieInfo.appendChild(moviePoster);


    const infoTable = document.createElement('table');
    infoTable.classList.add('rwd-table');
    infoTable.innerHTML = `
    <table>
        <tr class="t-row">
            <th class="row-name">Название</th>
            <td class="row-content" data-td="Movie Title">
                ${data.nameRu}</td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Жанр</th>
            <td class="row-content" data-td="Genre">
                ${data.genres.map(
                    (genre) => ` ${genre.genre}`)}
            </td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Год</th>
            <td class="row-content" data-td="Year">
                ${data.year}</td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Страна</th>
            <td class="row-content" data-td="Country">
                ${data.countries.map(
                    (country) => ` ${country.country}`)}
            </td>
        </tr>
        <tr class="t-row">
            <th class="row-name">Синопсис</th>
            <td class="row-content" data-td="Description">
                <a href="#popup" title="Читать полностью" style="text-decoration: none; color: #fff;">${data.description.slice(0,56).trimEnd() + '...'}</a>
            </td>
        </tr>
        <tr class="t-row">
            <th class="row-name">${checkExpRating(data.ratingKinopoisk, data.ratingAwait)}</th>
            <td class="row-content" data-td="Score">${getRating(data.ratingKinopoisk, data.ratingAwait)}</td>
        </tr>
    </table>
    `;
    movieInfo.appendChild(infoTable);


    const descPopupArea = document.querySelector('.body_style');
    const descPopup = document.createElement('div');
    descPopup.classList.add('dPopup');
    descPopup.innerHTML = `
    <div class="popup" id="popup">
        <a href="#header" class="popup__area"></a>
        <div class="popup-inner">
            <div class="popup__text">
                <p>${data.description}</p>
            </div>
            <a class="popup__close" href="#header">X</a>
        </div>
    </div>
    `;
    descPopupArea.appendChild(descPopup);
}