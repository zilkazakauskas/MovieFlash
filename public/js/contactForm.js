const scripts = document.querySelectorAll('script[data-dep="form"]');
const currentScript = scripts[scripts.length - 1];
const contactForm = currentScript.parentNode.querySelector('form');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const { sendTo, sendFrom, name, message } = event.target.elements;

    if (!sendTo.value.includes('@')) {
        return;
    }
    if (!sendFrom.value.includes('@')) {
        return;
    }
    if (name.value === '') {
        return;
    }
    if (message.value === '') {
        return;
    }

    // eslint-disable-next-line no-alert
    alert(`
        To: ${sendTo.value}
        From: ${sendFrom.value}
        Name: ${name.value}
        Message: ${message.value}

        Message was sent! Thank you!
    `);
});
