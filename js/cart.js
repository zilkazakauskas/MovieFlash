import tickets from '../data/tickets.js'

localStorage.setItem('tickets', JSON.stringify(tickets));

let cartTickets = JSON.parse(localStorage.getItem('tickets'));
//bilietu listas
let ul = document.getElementById("ticketsList");
let emptyMsg = document.querySelector(".cartTickets");

let btnCheckout = document.getElementById("btnCheckout");
let btnClearCart = document.getElementById("btnClearCart");

// bilietu listo generavimas

cartTickets.forEach(ticket => {
    let li = document.createElement("li");
    li.setAttribute('id', ticket.id);
    li.setAttribute('class', 'tickets');
    li.innerHTML = `Movie tittle: ${ticket.title} <br> Cinema: ${ticket.cinema}<br> Date: ${ticket.date}<br> Time: ${ticket.time}<br> Amount: ${ticket.amount}<br><button class='btn btn-danger mt-2' id='btnDelete'>Remove</button><hr>`
    ul.appendChild(li);

    let btnDelete = document.getElementById("btnDelete");
    btnDelete.addEventListener("click", function(){
        li.innerHTML="";
    })


    console.log(li);
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


