document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const bookingForm = document.getElementById('booking-form');
    const questionForm = document.getElementById('question-form');
    const contactSubmit = document.getElementById('contact-submit');
    const contactSpinner = document.getElementById('contact-spinner');
    const contactButtonText = document.getElementById('contact-button-text');
    const bookingButton = bookingForm?.querySelector('button[type="submit"]');
    const bookingSpinner = document.getElementById('spinner');
    const bookingButtonText = document.getElementById('button-text');
    const questionSpinner = document.getElementById('question-spinner');
    const questionButtonText = document.getElementById('question-button-text');

    // Replace with your Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyjCt9mfh-X3LRiwgpNUnrUTIUNZ6D-DGyhkOnyjHc8R9neeW8wkQsQKmxO5HQFkreqAw/exec';

    // Close Modal Function
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        // Clear animation containers
        ['fireworks-container', 'confetti-container', 'starburst-container'].forEach(id => {
            const container = document.getElementById(id);
            if (container) container.innerHTML = '';
        });
    };

    // Fireworks Animation (Contact Form)
    function createFireworks() {
        const container = document.getElementById('fireworks-container');
        container.style.display = 'block';
        for (let i = 0; i < 30; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            firework.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(firework);
        }
        setTimeout(() => {
            container.style.display = 'none';
            container.innerHTML = '';
        }, 2000);
    }

    // Confetti Animation (Booking Form)
    function createConfetti() {
        const container = document.getElementById('confetti-container');
        container.style.display = 'block';
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(confetti);
        }
        setTimeout(() => {
            container.style.display = 'none';
            container.innerHTML = '';
        }, 3000);
    }

    // Starburst Animation (Question Form)
    function createStarbursts() {
        const container = document.getElementById('starburst-container');
        container.style.display = 'block';
        for (let i = 0; i < 15; i++) {
            const starburst = document.createElement('div');
            starburst.className = 'starburst';
            starburst.style.left = Math.random() * 100 + 'vw';
            starburst.style.top = Math.random() * 100 + 'vh';
            starburst.style.animationDelay = Math.random() * 0.4 + 's';
            starburst.style.transform = `rotate(${Math.random() * 360}deg)`;
            container.appendChild(starburst);
        }
        setTimeout(() => {
            container.style.display = 'none';
            container.innerHTML = '';
        }, 1600);
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            contactSpinner.classList.remove('hidden');
            contactButtonText.textContent = 'Sending...';
            contactSubmit.disabled = true;

            const formData = new FormData(contactForm);
            formData.append('formType', 'contact');

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    contactSpinner.classList.add('hidden');
                    contactButtonText.textContent = 'Send Message';
                    contactSubmit.disabled = false;

                    if (data.result === 'success') {
                        document.getElementById('contact-modal').style.display = 'flex';
                        createFireworks();
                        contactForm.reset();
                    } else {
                        alert('Error: ' + data.error);
                    }
                })
                .catch(error => {
                    contactSpinner.classList.add('hidden');
                    contactButtonText.textContent = 'Send Message';
                    contactSubmit.disabled = false;
                    alert('Error: ' + error.message);
                });
        });
    }

    // Booking Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', e => {
            e.preventDefault();

            const lastBookingTime = localStorage.getItem('lastBookingTime');
            const now = new Date().getTime();
            const oneDay = 24 * 60 * 60 * 1000;

            if (lastBookingTime && (now - lastBookingTime) < oneDay) {
                const nextBookingTime = new Date(parseInt(lastBookingTime) + oneDay);
                document.getElementById('repeat-booking-time').textContent = nextBookingTime.toLocaleString();
                document.getElementById('repeat-booking-modal').style.display = 'flex';
                return;
            }

            bookingSpinner.classList.remove('hidden');
            bookingButtonText.textContent = 'Submitting...';
            bookingButton.disabled = true;

            const formData = new FormData(bookingForm);
            formData.append('formType', 'booking');

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    bookingSpinner.classList.add('hidden');
                    bookingButtonText.textContent = 'Submit Booking';
                    bookingButton.disabled = false;

                    if (data.result === 'success') {
                        localStorage.setItem('lastBookingTime', now);
                        document.getElementById('booking-success-modal').style.display = 'flex';
                        createConfetti();
                        bookingForm.reset();
                    } else {
                        alert('Error: ' + data.error);
                    }
                })
                .catch(error => {
                    bookingSpinner.classList.add('hidden');
                    bookingButtonText.textContent = 'Submit Booking';
                    bookingButton.disabled = false;
                    alert('Error: ' + error.message);
                });
        });
    }

    // Question Form Submission
    if (questionForm) {
        questionForm.addEventListener('submit', e => {
            e.preventDefault();
            questionSpinner.classList.remove('hidden');
            questionButtonText.textContent = 'Submitting...';
            questionForm.querySelector('button[type="submit"]').disabled = true;

            const formData = new FormData(questionForm);
            formData.append('formType', 'question');

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    questionSpinner.classList.add('hidden');
                    questionButtonText.textContent = 'Submit Question';
                    questionForm.querySelector('button[type="submit"]').disabled = false;

                    if (data.result === 'success') {
                        document.getElementById('question-modal').style.display = 'flex';
                        createStarbursts();
                        questionForm.reset();
                    } else {
                        alert('Error: ' + data.error);
                    }
                })
                .catch(error => {
                    questionSpinner.classList.add('hidden');
                    questionButtonText.textContent = 'Submit Question';
                    questionForm.querySelector('button[type="submit"]').disabled = false;
                    alert('Error: ' + error.message);
                });
        });
    }
});