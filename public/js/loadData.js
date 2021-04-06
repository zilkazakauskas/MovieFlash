import JSON5 from '../vendor/json5/index.mjs';

const moviesUrl = '../data/movies.json5';
const cinemasUrl = '../data/cinemas.json5';

async function getJson(url) {
    const response = await fetch(url);
    const text = await response.text();
    return JSON5.parse(text);
}

const cinemaList = await getJson(cinemasUrl);
const movieList = await getJson(moviesUrl);

export { cinemaList, movieList };
