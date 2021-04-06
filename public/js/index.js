import '../vendor/swiper.min.js';
import '../vendor/jquery-3.1.1.min.js';

const { $, Swiper } = window;

$(document).ready(() => {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.homeslider > .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        preventClicks: false,
        preventClicksPropagation: false,
        effect: 'fade',
        breakpoints: {
            320: {
                height: 200,
            },

            480: {
                height: 300,
            },

            768: {
                height: 400,
            },
            1024: {
                height: 500,
            },
        },
    });

    // eslint-disable-next-line no-unused-vars
    const recentswiper = new Swiper('.recentslider > .swiper-container', {
        nextButton: '.recent-next',
        prevButton: '.recent-prev',
        slidesPerView: 8,
        paginationClickable: true,
        preventClicks: false,
        preventClicksPropagation: false,
        spaceBetween: 10,
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 5,
            },

            480: {
                slidesPerView: 3,
                spaceBetween: 5,
            },

            768: {
                slidesPerView: 5,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 10,
            },
        },
    });

    // eslint-disable-next-line no-unused-vars
    const mostswiper = new Swiper('.mostslider > .swiper-container', {
        nextButton: '.most-next',
        prevButton: '.most-prev',
        slidesPerView: 8,
        paginationClickable: true,
        preventClicks: false,
        preventClicksPropagation: false,
        spaceBetween: 10,
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 5,
            },

            480: {
                slidesPerView: 3,
                spaceBetween: 5,
            },

            768: {
                slidesPerView: 5,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 10,
            },
        },
    });

    // eslint-disable-next-line no-unused-vars
    const topswiper = new Swiper('.topslider > .swiper-container', {
        nextButton: '.top-next',
        prevButton: '.top-prev',
        slidesPerView: 8,
        paginationClickable: true,
        preventClicks: false,
        preventClicksPropagation: false,
        spaceBetween: 10,
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 5,
            },

            480: {
                slidesPerView: 3,
                spaceBetween: 5,
            },

            768: {
                slidesPerView: 5,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 10,
            },
        },
    });
});
