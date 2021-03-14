import CartStorage from './CartStorage.js';

const url_string = window.location.href;
const url = new URL(url_string);
const pageName = url.searchParams.get('p');
const movieId = url.searchParams.get('id');
const anchor = url.searchParams.get('a');
let href = "";

if (pageName) {
    href = `${pageName}.html`;
    if (movieId) {
        href += `?id=${movieId}`;
    }
    if (anchor) {
        href += `#${anchor}`;
    }
}

document.querySelector('#back-page').setAttribute('href', href);

const ul = document.querySelector('#ticketsList');
const emptyMsg = document.querySelector('#empty-msg');

const btnCheckout = document.querySelector('#btnCheckout');
const btnClearCart = document.querySelector('#btnClearCart');

// Bilietų sąrašas tuščias
function storageIsEmpty() {
    ul.innerHTML = '';
    emptyMsg.classList.remove('invisible');
    btnClearCart.classList.add('invisible');
    btnCheckout.classList.add('invisible');
}

// Bilietų sąrašas užpildytas
function storageIsFull() {
    emptyMsg.classList.add('invisible');
    btnClearCart.classList.remove('invisible');
    btnCheckout.classList.remove('invisible');
}

const cartStorage = CartStorage.instance('tickets');
const cartTickets = cartStorage.store;

//bilietu sąrašo įvykių apdorojimas
function handleBtnClick(event) {
    const key = event.target.getAttribute('data-key');
    const span = document.querySelector(`span[data-key="${key}"]`);
    const action = event.target.getAttribute('data-action');
    let quantity = parseInt(span.innerHTML);

    if (action == 'plus') {
        quantity++;
    } else if (action == 'minus') {
        quantity--;
    } else if (action == 'remove') {
        quantity = 0;
    }

    if (quantity > 0) {
        span.textContent = `${quantity}`;
        cartStorage.setItem(key, { quantity });
        return;
    }

    const li = document.querySelector(`li[data-key="${key}"]`);
    li.innerHTML = '';
    cartStorage.removeItem(key);
    if (Object.keys(cartStorage.store).length < 1) {
        storageIsEmpty();
    }
    document.querySelector('#cart-size').textContent = cartStorage.size;
}

// bilietų sąrašo generavimas
function createCartItemList(movies, cartTickets) {
    Object.entries(cartTickets).forEach((ticket) => {
        const [key, value] = ticket;
        const [id, cinema, date, time] = key.split(';');
        const { quantity } = value;
        const { title } = movies[id];
        const li = document.createElement('li');
        li.setAttribute('className', 'tickets');
        li.setAttribute('data-key', key);
        li.innerHTML = `
        Movie title: ${title}<br />
        Cinema: ${cinema}<br />
        Date: ${date}<br />
        Time: ${time}<br />
        Quantity: <span data-key="${key}">${quantity}</span><br />
        <button class="btn btn-success mt-2" data-key="${key}" data-action="plus">+</button>
        <button class="btn btn-danger mt-2" data-key="${key}" data-action="minus">-</button> <br />
        <button class="btn btn-warning mt-2" data-key="${key}" data-action="remove">Remove movie</button>
        <hr />
    `;

        ul.appendChild(li);
    });

    ul.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', handleBtnClick);
    });
}

function createPage() {
    if (Object.keys(cartTickets).length < 1) {
        storageIsEmpty();
        return;
    }

    storageIsFull();

    fetch('./data/movies.json')
        .then(res => res.json())
        .then(movies => createCartItemList(movies, cartTickets));

    btnClearCart.addEventListener('click', function () {
        swal({
            title: 'Are you sure want to clear the cart?',
            icon: 'warning',
            buttons: ['Cancel', 'Yes'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                storageIsEmpty();
                cartStorage.clear();
                document.querySelector('#cart-size').textContent = cartStorage.size;
            }
        });
    });

    btnCheckout.addEventListener('click', function () {
        swal('Thank you for purchase!');
        storageIsEmpty();
        cartStorage.clear();
        document.querySelector('#cart-size').textContent = cartStorage.size;
    });
}

createPage();
