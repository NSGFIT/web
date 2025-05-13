// Contact Form Submission (Unchanged)
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbzhlNPUPQdPTm4vf4yoAbncdWZ8D7bOgAAtveuELE-9FBeDJKdABPVITm60q-ppVwYi/exec', {
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

// Newsletter Form Submission
document.getElementById('newsletter-form')?.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        formType: 'newsletter',
        email: formData.get('email')
    };

    // Get UI elements
    const messageDiv = document.getElementById('newsletter-message');
    messageDiv.classList.remove('hidden', 'text-green-500', 'text-red-500');
    messageDiv.textContent = 'Subscribing...';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzhlNPUPQdPTm4vf4yoAbncdWZ8D7bOgAAtveuELE-9FBeDJKdABPVITm60q-ppVwYi/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString(),
            redirect: 'follow'
        });

        const result = await response.json();
        if (result.result === 'success') {
            messageDiv.textContent = 'Thank you for subscribing!';
            messageDiv.classList.add('text-green-500');
            form.reset(); // Clear the form
            triggerConfetti(); // Show confetti animation
        } else {
            messageDiv.textContent = result.message || 'Error: Could not subscribe.';
            messageDiv.classList.add('text-red-500');
        }
    } catch (error) {
        messageDiv.textContent = 'Error: Could not connect to the server.';
        messageDiv.classList.add('text-red-500');
        console.error('Error:', error);
    }
});

// Confetti Animation Function
function triggerConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.style.display = 'block';

    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);
    }

    // Clear confetti after animation
    setTimeout(() => {
        confettiContainer.style.display = 'none';
        confettiContainer.innerHTML = '';
    }, 3000);
}
