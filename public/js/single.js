import CartStorage from './CartStorage.js';
import { cinemaList, movieList } from './loadData.js';

const cartStorage = CartStorage.instance('tickets');
const tickets = cartStorage.store;

const cartSize = document.querySelector('#cart-size');

const urlString = window.location.href;
const url = new URL(urlString);
const id = url.searchParams.get('id');
const href = `cart.html?p=single&id=${id}&a=cinemas-times`;

document.querySelector('#cart-li > a').setAttribute('href', href);

function buttonClick(event, title) {
    event.preventDefault();
    const { target } = event;
    const quantity = target.getAttribute('data-quantity');
    const newQuantity = target.getAttribute('data-new-quantity');
    if (!newQuantity || newQuantity < 0) {
        // eslint-disable-next-line no-alert
        window.alert('You must specify a valid number of tickets');
        target.setAttribute('data-new-quantity', quantity);
        target.parentElement.querySelector('input').value = quantity;
        return;
    }
    if (quantity === newQuantity) {
        // eslint-disable-next-line no-alert
        alert('You specified the same number of tickets.\nIt is nothing to do.');
        return;
    }
    const cinema = target.getAttribute('data-cinema');
    const cinemaName = cinemaList[cinema].name;
    const date = target.getAttribute('data-date');
    const time = target.getAttribute('data-time');
    // eslint-disable-next-line no-alert
    if (window.confirm(`
                Movie: ${title}
                Cinema: ${cinemaName}
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
        target.setAttribute('data-quantity', newQuantity);
        if (newQuantity > 0) {
            target.classList.add('golden');
        } else {
            target.classList.remove('golden');
        }
    }
    cartSize.textContent = cartStorage.size;
}

function dateTimes(cinema, date, time) {
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
                data-time="${time}"
                data-quantity="${quantity}"
                data-new-quantity="${quantity}"
            >
                ${time}
            </a>
            <input class="quantity" type="number" min="0" value="${quantity}"/>
        </li>
    `;
}

function cinemaDates(cinema, date, times) {
    const dateTimesHtml = times.map((time) => dateTimes(cinema, date, time)).join('\n');
    return `
        <li>
            <a>${date}</a>
            <ul class="wlinks times">
                ${dateTimesHtml}
            </ul>
        </li>
    `;
}

function showingByCinema(cinema, dates) {
    const cinemaData = cinemaList[cinema];
    const cinemaDatesHtml = Object.entries(dates).map(([date, times]) => cinemaDates(cinema, date, times)).join('\n');
    const contactUrl = `contact.html?cinema=${cinema}`;
    return `
        <div class="row">
            <ul class="wlinks col cinemas">
                <li><a href="${contactUrl}">${cinemaData.name}</a></li>
            </ul>
            <ul class="wlinks col">
                ${cinemaDatesHtml}
            </ul>
        </div>
    `;
}

function movieData() {
    const { title, trailer, image, description, cast, genre, score, showing } = movieList[id];

    document.querySelector('#trailer').setAttribute('src', trailer);
    document.querySelector('#movie-image').setAttribute('src', image);

    const genres = genre.map((item) => `<a href="genre.html">${item}</a>`).join(', ');
    const casting = cast.map((item) => `<a href="cast.html">${item}</a>`).join(', ');

    document.querySelector('#movie-data').innerHTML = `
        <li><h1>${title}</h1></li>
        <li>${description}</li>
        <li>${genres}</li>
        <li>${casting}</li>
        <!-- <li><div class="stars-outer"><div class="stars-inner"></div></div></li> -->
        <li><h3>Score: ${score}/10</h3></li>
    `;

    const showingByCinemaHtml = Object.entries(showing).map(([cinema, dates]) => showingByCinema(cinema, dates));

    document.querySelector('#cinemas-times').innerHTML += showingByCinemaHtml;

    document.querySelectorAll('input.quantity').forEach((element) => element.addEventListener(
        'blur',
        (event) => {
            event.target.parentElement
                .querySelector('a[data-cinema]')
                .setAttribute('data-new-quantity', event.target.value);
        },
    ));

    document.querySelectorAll('a[data-cinema]').forEach(
        (element) => element.addEventListener('click', (event) => buttonClick(event, title)),
    );
}

movieData();
