// Get the header
import CartStorage from './CartStorage.js';

const header = document.querySelector('.header');

// Get the offset position
const sticky = header.offsetTop;

// Add sticky class to navbar when scroll position is reached
const stickyFunction = () => {
    if (window.pageXOffset >= sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
};

// When the users scrolls execute the function
window.onscroll = () => {
    stickyFunction();
};

const cartStorage = CartStorage.instance('tickets');
const cartSize = document.querySelector('#cart-size');
cartSize.textContent = cartStorage.size;
