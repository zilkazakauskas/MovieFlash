import '../libs/jquery-3.1.1.min.js';

const { $ } = window;

$(document).ready(() => {
    $('.toggle img').click(() => {
        $('.menu').slideToggle();
    });
});
