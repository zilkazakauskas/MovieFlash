const moviesUrl = './data/movies.json';
const cinemasUrl = './data/cinemas.json';

async function getCinemas() {
    const cinemasResp = await fetch(cinemasUrl);
    return cinemasResp.json();
}

async function getMovies() {
    const moviesResp = await fetch(moviesUrl);
    return moviesResp.json();
}

const cinemaList = await getCinemas();
const movieList = await getMovies();

export { cinemaList, movieList };
