const API_KEY = 'de697eeb-4ec1-4916-a767-910172fdb60f';

/**
 * 
 * @param {string} url - Ссылка для вызова метода
 * @returns {object}
 */
 export async function getData(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        }
    }).catch((err) => {
        console.error('Could not fetch', err)
    });
    if (!resp.ok) {
        throw new  Error(`Could not fetch ${url}` + `, received ${resp.status}`)
    }
    return await resp.json();
}

/**
 * Выбор цвета иконки в зависимости от рейтинга
 * 
 * @param {string} rate - Рейтинг фильма
 * @returns {string} - Строка, означающая используемый цвет
 */
export function getColorByRating(rate) {
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
export function getRating(rate) {
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
 * Если фильм новый, то изменяет заголовок на 'Рейтинг ожидания'
 * 
 * @param {string} rate - Рейтинг фильма
 * @param {string} rateAwait - Рейтинг ожидания фильма
 * @returns {string}
 */
 export function checkExpRating(rate, rateAwait) {
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
export function getRatingMP(rate, rateAwait) {
    if (!rate && !rateAwait) {
        return '😞Рейтинг отсутстует😞'
    } else if (!rate) {
        return rateAwait + '%'
    } else {
        return rate
    }
}