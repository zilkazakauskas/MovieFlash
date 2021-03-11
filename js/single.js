import movies, { index } from '../data/movies.js';
import CartStorage from './CartStorage.js'

const url_string = window.location.href
const url = new URL(url_string);
const movieId = url.searchParams.get("id");
const idx = index[movieId];
const movieData = movies[idx];
const { id, title, trailer, image, description, cast, genre, score, showing } = movieData;

const cartStorage = CartStorage.instance('tickets');
const tickets = cartStorage.store;

document.querySelector('#cart-li > a').setAttribute('href', `cart.html?p=single&id=${movieId}&a=cinemas-times`);
const cartSize = document.querySelector('#cart-size')

document.querySelector('#trailer').setAttribute('src', trailer)
document.querySelector('#movie-image').setAttribute('src', image)

const genres = genre.map(item => `<a href="genre.html">${item}</a>`).join(', ');
const casting = cast.map(item => `<a href="cast.html">${item}</a>`).join(', ');

const dataStr = [
    `<li><h1>${title}</h1></li>`,
    `<li>${description}</li>`,
    `<li>${genres}</li>`,
    `<li>${casting}</li>`,
    // `<li><div class="stars-outer"><div class="stars-inner"></div></div></li>`,
    `<li><h3>Score: ${score}/10</h3></li>`
];

document.querySelector('#movie-data').innerHTML = dataStr.join("\n");

const cinemasTimes = Object.entries(showing).map(cinemaDates => {
    const [cinema, dates] = cinemaDates;
    const dateStr = Object.entries(dates).map(dateTimes => {
        const [date, times] = dateTimes;
        const timesStr = times.map(
            time => {
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
                        data-new-quantity="${quantity}">${time}</a>
                    <input class="quantity" type="number" min="0" value="${quantity}"/>
                </li>`
            }
        ).join("\n");
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

document.querySelectorAll('input.quantity').forEach(element => element.addEventListener(
    'blur',
    event => {
        event.target.parentElement.querySelector('a[data-cinema]').setAttribute('data-new-quantity', event.target.value)
    }
));

function clickHandler(event) {
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

document.querySelectorAll('a[data-cinema]').forEach(
    element => element.addEventListener('click', clickHandler)
);
