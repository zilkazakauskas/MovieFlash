const contactForm = document.querySelector('#contactForm');
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = event.target.elements;

    if (!fields.sendTo.value.includes('@')) {
        return;
    }
    if (!fields.sendFrom.value.includes('@')) {
        return;
    }
    if (fields.name.value === '') {
        return;
    }
    if (fields.message.value === '') {
        return;
    }

    // eslint-disable-next-line no-alert
    alert(`
        To: ${fields.sendTo.value}
        From: ${fields.sendFrom.value}
        Name: ${fields.name.value}
        Message: ${fields.message.value}

        Message was sent! Thank you!
    `);
});
