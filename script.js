document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    // Get message div
    const messageDiv = document.getElementById('form-message');
    messageDiv.classList.remove('hidden', 'text-green-500', 'text-red-500');
    messageDiv.textContent = 'Submitting...';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxPki13HvK3HpMAkRbi6uEDTgwfCkLfRe9GRdxo1ihZ6m5vQbtDDXDFHzkJzGq-Y7reQg/exec', {
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
