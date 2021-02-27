//When the users scrolls execute the function
window.onscroll = function() {
    stickyFunction();
}

//Get the header
const header = document.querySelector('.header');

//Get the offset position
let sticky = header.offsetTop;

//Add sticky class to navbar when scroll position is reached
const stickyFunction = () => {
    if(window.pageXOffset >= sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}