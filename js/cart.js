import movies, { index } from '../data/movies.js'
import CartStorage from './CartStorage.js'

const cartStorage = CartStorage.instance('tickets');
const cartTickets = cartStorage.store;

//bilietu listas
const ul = document.getElementById("ticketsList");
const emptyMsg = document.querySelector(".cartTickets");

const btnCheckout = document.getElementById("btnCheckout");
const btnClearCart = document.getElementById("btnClearCart");

// bilietu listo generavimas

Object.entries(cartTickets).forEach(ticket => {
    const [ key, value ] = ticket;
    const [ id, cinema, date, time ] = key.split(';');
    const { quantity } = value;
    const idx = index[id];
    const { title } = movies[idx];
    const li = document.createElement("li");
    li.setAttribute('id', `liTicket_${id}`);
    li.setAttribute('className', 'tickets');
    li.setAttribute('data-key', key);
    li.innerHTML = `
        Movie tittle: ${title} <br />
        Cinema: ${cinema}<br />
        Date: ${date}<br />
        Time: ${time}<br />
        Quantity: ${quantity}<br />
        <button id="btnDelete_${id}" class="btn btn-danger mt-2" data-key="${key}">Remove</button>
        <hr />
    `;
    ul.appendChild(li);
    console.log(li);
});

ul.querySelectorAll('button').forEach(button => {
    button.addEventListener("click", event => {
        const key = event.target.getAttribute('data-key');
        const li = document.querySelector(`li[data-key="${key}"]`);
        li.innerHTML = "";
        cartStorage.removeItem(key);
    })
});

btnClearCart.addEventListener("click", function () {
    swal({
        title: "Are you sure want to clear the cart?",
        icon: "warning",
        buttons: ["Cancel","Yes"],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            ul.innerHTML = '';
            emptyMsg.innerHTML = "<h3 style='color: white; text-align: center'>Cart is empty!</h3>"
            localStorage.clear();
            btnClearCart.setAttribute('class', 'btnHidden');
            btnCheckout.setAttribute('class', 'btnHidden');
        } 
      });
    
});

btnCheckout.addEventListener("click", function () {
    swal("Thank you for purchase!");
    ul.innerHTML = '';
    emptyMsg.innerHTML = "<h3 style='color: white; text-align: center'>Cart is empty!</h3>"
    localStorage.clear();
    btnClearCart.setAttribute('class', 'btnHidden');
    btnCheckout.setAttribute('class', 'btnHidden');   
});


