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

const cinemasTimes = Object.entries(movieData['showing']).map(cinemaDates => {
    const [cinema, dates] = cinemaDates;
    const dateStr = Object.entries(dates).map(dateTimes => {
        const [date, times] = dateTimes;
        const timesStr = times.map(time => `<li><a href="#">${time}</a></li>`).join("\n");
        return `<li><a>${date}</a><ul class="wlinks times">${timesStr}</ul></li>`;
    }).join("\n");
    return `
    <div class="row">
        <ul class="wlinks col cinemas">
            <li><a>${cinema}</a></li>
        </ul>
        <ul class="wlinks col">
            ${dateStr}
        </ul>
    </div>`;
});
document.querySelector('#cinemas-times').innerHTML += cinemasTimes;