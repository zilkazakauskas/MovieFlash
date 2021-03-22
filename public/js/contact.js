import { cinemaList } from './loadData.js';

const urlString = window.location.href;
const url = new URL(urlString);
const cinemaId = url.searchParams.get('cinema');

let cinemaDataEntries = Object.entries(cinemaList);
if (cinemaId) {
    cinemaDataEntries = cinemaDataEntries.filter((entry) => entry[0] === cinemaId);
}

const cinemasContainer = document.querySelector('#cinemas');

function cinema(entry) {
    const [key, cinemaData] = entry;
    const { image, name, streetAddress, city, postalCode, email } = cinemaData;
    return `
        <div id="${key}" class="my-2 py-3">
            <h3>${name}</h3>
            <img class="w-75" src="${image}" alt="Cinema's image"/>
            <p class="text-white">
                <span>${streetAddress}</span><br />
                <span>${city}</span>, <span>${postalCode}</span>
            </p>
            <button type="button" class="btn btn-dark col-1 toggle-form" data-key="${key}" data-to="${email}">
                Contact
            </button>
        </div>
    `;
}

cinemaDataEntries.forEach((entry) => {
    const cinemaDataStr = cinema(entry);
    cinemasContainer.innerHTML += cinemaDataStr;
});

document.querySelectorAll('#cinemas button.toggle-form').forEach(
    (button) => button.addEventListener('click', (event) => {
        const key = event.currentTarget.getAttribute('data-key');
        const container = document.querySelector(`#${key}`);
        let formContainer = container.querySelector('#formContainer');
        if (formContainer) {
            formContainer.parentNode.removeChild(formContainer);
            return;
        }

        formContainer = document.querySelector('#formContainer');
        if (formContainer) {
            formContainer.parentNode.removeChild(formContainer);
        }

        const template = document.querySelector('#formTemplate');
        const templateClone = template.content.cloneNode(true);
        container.appendChild(templateClone);
        container.querySelector('#sendTo').value = event.currentTarget.getAttribute('data-to');
    }),
);
