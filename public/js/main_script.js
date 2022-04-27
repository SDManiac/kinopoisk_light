const API_key = 'e0b8ee73-8e36-4d46-9651-177fdcb541a8';
const API_url_pop = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_url_search = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

getMovies(API_url_pop);

/**
 * 
 * @param {string} url 
 */
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_key
        }
    });
    const respData = await resp.json();
    showMovies(respData)
}

/**
 * Выбор цвета иконки в зависимости от рейтинга
 * 
 * @param {string} rate 
 * @returns {string}
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
 * @param {string} rate 
 * @returns {string}
 */
function getRating(rate) {
    if (/^[\d\.]+%$/.test(rate)) {
        return 'Soon'
    } else if (rate == 'null') {
        return 'N/R'
    }
    else {
        return rate
    }
}

/**
 * 
 * @param {object} data 
 */
function showMovies(data) {
    const moviesEl = document.querySelector('.container');

    // Высвобождение места для фильмов по запросу
    document.querySelector('.container').innerHTML = '';

    data.films.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        let location = "/movie_page.html?id=" + movie.filmId;
        movieEl.innerHTML = `
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
        `;
        moviesEl.appendChild(movieEl)
    });
}

const form = document.querySelector('.submiting_form');
const search = document.querySelector('.header_search');


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchURL = `${API_url_search}${search.value}`;
    if (search.value) {
        getMovies(apiSearchURL);

        search.value = ''
}
})