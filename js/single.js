import movies, { index } from '../data/movies.js';

const url_string = window.location.href
const url = new URL(url_string);
const id = url.searchParams.get("id");
const key = index[id];
const movieData = movies[key];

document.querySelector('#trailer').setAttribute('src', movieData['trailer'])
document.querySelector('#movie-image').setAttribute('src', movieData['image'])
let dataStr = `<li><h1>${movieData['title']}</h1></li>`;
dataStr += `\n<li>${movieData['description']}</li>`;
dataStr += `\n<li>` + movieData['genre'].map(item => `<a href="genre.html">${item}</a>`).join(', ') + `</li>`;
dataStr += `\n<li>` + movieData['cast'].map(item => `<a href="cast.html">${item}</a>`).join(', ') + `</li>`;
dataStr += `\n<li><h3>Score: ` + movieData['score'] + "/10" + `</h3></li>\n`
document.querySelector('#movie-data').innerHTML = dataStr;

const times = Object.entries(movieData['times']).map(
    cinema => `\n<div class="col">\n<ul class="dlinks">\n<li><a>${cinema[0]}</a></li>` +
        cinema[1].map(time => `\n<li><a href="#">${time}</a></li>`).join('') +
        `\n</ul>\n</div>`
);
document.querySelector('#cinema-times').innerHTML = times;