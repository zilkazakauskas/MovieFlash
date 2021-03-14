import CartStorage from './CartStorage.js'

const cartStorage = CartStorage.instance('tickets');
const tickets = cartStorage.store;

const cartSize = document.querySelector('#cart-size')

function buttonClick(event, title) {
    event.preventDefault();
    const target = event.target;
    const quantity = target.getAttribute('data-quantity');
    const newQuantity = target.getAttribute('data-new-quantity');
    if (!newQuantity || newQuantity < 0) {
        alert('You must specify a valid number of tickets');
        target.setAttribute('data-new-quantity', quantity);
        event.target.parentElement.querySelector('input').value = quantity;
        return;
    }
    if (quantity === newQuantity) {
        alert(`You specified the same number of tickets.\nIt is nothing to do.`);
        return;
    }
    const cinema = target.getAttribute('data-cinema');
    const date = target.getAttribute('data-date');
    const time = target.textContent;
    if (confirm(`
                    Movie: ${title}
                    Cinema: ${cinema}
                    Date: ${date}
                    Time: ${time}
                    Quantity: ${newQuantity}
            `)) {
        const key = `${id};${cinema};${date};${time}`;
        if (newQuantity > 0) {
            cartStorage.setItem(key, { quantity: newQuantity });
        } else {
            cartStorage.removeItem(key);
        }
        target.setAttribute('data-quantity', newQuantity)
        if (newQuantity > 0) {
            target.classList.add('golden');
        } else {
            target.classList.remove('golden');
        }
    }
    cartSize.textContent = cartStorage.size;
}

function dateTimes(id, cinema, date, time) {
    const key = `${id};${cinema};${date};${time}`;
    const quantity = tickets[key] ? tickets[key].quantity : 0;
    const golden = Number(quantity) > 0 ? 'golden' : '';
    return `
        <li>
            <a
                class="${golden}"
                href="#"
                data-cinema="${cinema}"
                data-date="${date}"
                data-quantity="${quantity}"
                data-new-quantity="${quantity}"
            >
                ${time}
            </a>
            <input class="quantity" type="number" min="0" value="${quantity}"/>
        </li>
    `;
};

function cinemaDates(id, cinema, [date, times]) {
    const dateTimesHtml = times.map(time => dateTimes(id, cinema, date, time)).join("\n");
    return `
        <li>
            <a>${date}</a>
            <ul class="wlinks times">
                ${dateTimesHtml}
            </ul>
        </li>
    `;
}

function showingByCinema(id, [cinema, dates]) {
    const cinemaDatesHtml = Object.entries(dates).map(dateTimes => cinemaDates(id, cinema, dateTimes)).join("\n");
    return `
        <div class="row">
            <ul class="wlinks col cinemas">
                <li><a>${cinema}</a></li>
            </ul>
            <ul class="wlinks col">
                ${cinemaDatesHtml}
            </ul>
        </div>
    `;
}

function movieData(movies, id) {
    const movieData = movies[id];
    const { title, trailer, image, description, cast, genre, score, showing } = movieData;

    document.querySelector('#trailer').setAttribute('src', trailer)
    document.querySelector('#movie-image').setAttribute('src', image)

    const genres = genre.map(item => `<a href="genre.html">${item}</a>`).join(', ');
    const casting = cast.map(item => `<a href="cast.html">${item}</a>`).join(', ');

    document.querySelector('#movie-data').innerHTML = `
        <li><h1>${title}</h1></li>
        <li>${description}</li>
        <li>${genres}</li>
        <li>${casting}</li>
        <!-- <li><div class="stars-outer"><div class="stars-inner"></div></div></li> -->
        <li><h3>Score: ${score}/10</h3></li>
    `;

    const showingByCinemaHtml = Object.entries(showing).map(cinemaDates => showingByCinema(id, cinemaDates));

    document.querySelector('#cinemas-times').innerHTML += showingByCinemaHtml;

    document.querySelectorAll('input.quantity').forEach(element => element.addEventListener(
        'blur',
        event => {
            event.target.parentElement.querySelector('a[data-cinema]').setAttribute('data-new-quantity', event.target.value)
        }
    ));

    document.querySelectorAll('a[data-cinema]').forEach(
        element => element.addEventListener('click', (event) => buttonClick(event, title))
    );
}

function showMovieData(moviesUrl, id) {
    fetch(moviesUrl)
        .then(res => res.json())
        .then(movies => movieData(movies, id));
}

const url_string = window.location.href
const url = new URL(url_string);
const id = url.searchParams.get("id");
const href = `cart.html?p=single&id=${id}&a=cinemas-times`;
const moviesUrl = "./data/movies.json";

document.querySelector('#cart-li > a').setAttribute('href', href);

showMovieData(moviesUrl, id);
