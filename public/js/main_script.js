const API_URL_POP = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
import { getData } from './api.js';


getData(API_URL_POP).then((respData) => {
    renderingCards(respData);
});

/**
 * Выбор цвета иконки в зависимости от рейтинга
 * 
 * @param {string} rate - Рейтинг фильма
 * @returns {string} - Строка, означающая используемый цвет
 */
function getColorByRating(rate) {
    if (rate >= 8) {
        return 'green_accent'
    } else if (rate >= 6) {
        return 'light_green'
    } else if (rate >= 4) {
        return 'orange'
    } else if (rate >= 1) {
        return 'red'
    } else {
        return 'grey'
    }
}

/**
 * Если указан рейтинг ожидания, возвращает 'Soon'
 * Если рейтинг в принципе отсутсвует, возвращает 'N/R'
 * 
 * @param {string} rate - Рейтинг фильма, как указан в базе данных
 * @returns {string} - Рейтинг/Скоро будет/Отсутствие рейтинга
 */
function getRating(rate) {
    if (/^[\d\.]+%$/.test(rate)) {
        return 'Soon'
    } else if (rate == 'null' || !rate) {
        return 'N/R'
    }
    else {
        return rate
    }
}

/**
 * В данном методе описан рендер карточек через цикл.
 * В каждую карточку добавляются данные, полученные через метод API.
 * Если по запросу не было найдено фильмов, выведет информацию об этом.
 * 
 * @param {object} data - Данные, полученные с API
 */
function renderingCards(data) {
    const moviesEl = document.querySelector('.container');

    // Высвобождение места для фильмов по запросу
    document.querySelector('.container').innerHTML = '';

    if (data.films.length === 0) {
        const noFilmsText = document.createElement('p');
        noFilmsText.style.color = '#fff';
        noFilmsText.textContent = 'По вашему запросу ничего не найдено';
        moviesEl.appendChild(noFilmsText)
    } else {
        data.films.forEach(movie => {
            const movieEl = document.createElement('div');
            const location = "/movie_page.html?id=" + movie.filmId;
    
            movieEl.insertAdjacentHTML('afterBegin', `
            <div class="card">
                <a href="${location}">
                    <div class="content">
                        <div class="img_container">
                            <img class="img_inner"
                                src="${movie.posterUrlPreview}"
                                alt="${movie.nameRu}">
                        </div>
                        <div class="movie_score movie_score--${getColorByRating(movie.rating)}">${getRating(movie.rating)}</div>
                    </div>
                </a>
                <div class="movie_category">${movie.genres.slice(0, 2).map(
                    (genre) => ` ${genre.genre}`
                )}</div>
            </div>
            `);
            moviesEl.appendChild(movieEl)
        });
    }
}

const form = document.querySelector('.submiting_form');
const search = document.querySelector('.header_search');


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchURL = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getData(apiSearchURL).then((respData) =>{
            renderingCards(respData);
        });
}
})