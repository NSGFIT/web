document.getElementById('contact-form')?.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        formType: 'contact',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    // Get UI elements
    const messageDiv = document.getElementById('form-message');
    messageDiv.classList.remove('hidden', 'text-green-500', 'text-red-500');
    messageDiv.textContent = 'Submitting...';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzcrBnRXWZxXAbAEuozeB_pY6wXVaFp0f_w37Cn9MzYbyXuI9p7hN5K03V51AKlZjIk/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString(),
            redirect: 'follow'
        });

        const result = await response.text();
        if (result === 'Data Saved Successfully') {
            messageDiv.textContent = 'Thank you! Your message has been sent.';
            messageDiv.classList.add('text-green-500');
            form.reset(); // Clear the form
        } else {
            messageDiv.textContent = result || 'Error: Could not send message.';
            messageDiv.classList.add('text-red-500');
        }
    } catch (error) {
        messageDiv.textContent = 'Error: Could not connect to the server.';
        messageDiv.classList.add('text-red-500');
    }
});

document.getElementById('booking-form')?.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        formType: 'booking',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        sessionType: formData.get('sessionType'),
        preferredTime: formData.get('preferredTime')
    };

    // Get UI elements
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');
    const messageDiv = document.getElementById('form-message');

    // Update UI
    buttonText.textContent = 'Submitting...';
    spinner.classList.remove('hidden');
    messageDiv.classList.remove('hidden', 'text-green-500', 'text-red-500');
    messageDiv.textContent = '';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyJ6PN51cqd87S6UxiMwZ1xWbzV1GizuEUPoGi9uyw4uq2J8qHVFg6YPZY3tOmQY3Vx/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString(),
            redirect: 'follow'
        });

        const result = await response.text();
        if (result === 'Data Saved Successfully') {
            messageDiv.textContent = 'Booking submitted successfully!';
            messageDiv.classList.add('text-green-500');
            form.reset(); // Clear the form
        } else {
            messageDiv.textContent = result || 'Error: Could not submit booking.';
            messageDiv.classList.add('text-red-500');
        }
    } catch (error) {
        messageDiv.textContent = 'Error: Could not connect to the server.';
        messageDiv.classList.add('text-red-500');
    } finally {
        buttonText.textContent = 'Submit Booking';
        spinner.classList.add('hidden');
    }
});
