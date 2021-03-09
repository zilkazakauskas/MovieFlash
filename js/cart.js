import movies, { index } from '../data/movies.js'
import CartStorage from './CartStorage.js'

//bilietu listas
const ul = document.getElementById("ticketsList");
const emptyMsg = document.querySelector(".cartTickets");

const btnCheckout = document.getElementById("btnCheckout");
const btnClearCart = document.getElementById("btnClearCart");

// bilietu listo generavimas

function storageIsEmpty() {
    ul.innerHTML = '';
    emptyMsg.innerHTML = "<h3 style='color: white; text-align: center'>Cart is empty!</h3>"
    btnClearCart.setAttribute('class', 'btnHidden');
    btnCheckout.setAttribute('class', 'btnHidden');
}

function createPage() {

    const cartStorage = CartStorage.instance('tickets');
    const cartTickets = cartStorage.store;
    console.log(cartTickets);

    if (Object.keys(cartTickets).length < 1) {
        storageIsEmpty();
        return;
    }


    Object.entries(cartTickets).forEach(ticket => {
        const [key, value] = ticket;
        const [id, cinema, date, time] = key.split(';');
        const { quantity } = value;
        const idx = index[id];
        const { title } = movies[idx];
        const li = document.createElement("li");
        li.setAttribute('className', 'tickets');
        li.setAttribute('data-key', key);
        li.innerHTML = `
        Movie tittle: ${title}<br />
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

        if (quantity < 1) {
            storageIsEmpty();
            cartStorage.removeItem(key);
            return;
        }
        span.textContent = `${quantity}`;
        cartStorage.setItem(key, { quantity });
    }

    ul.querySelectorAll('button').forEach(button => {
        button.addEventListener("click", handleBtnClick)
    });

    btnClearCart.addEventListener("click", function () {
        swal({
            title: "Are you sure want to clear the cart?",
            icon: "warning",
            buttons: ["Cancel", "Yes"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                storageIsEmpty();
                cartStorage.clear();
            }
        });
    });

    btnCheckout.addEventListener("click", function () {
        swal("Thank you for purchase!");
        storageIsEmpty();
        cartStorage.clear();
    });

}

createPage();
