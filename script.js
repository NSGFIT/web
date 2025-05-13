<script>
    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Show spinner and update button text
        const buttonText = document.getElementById('button-text');
        const spinner = document.getElementById('spinner');
        const formMessage = document.getElementById('form-message');
        buttonText.textContent = 'Submitting...';
        spinner.classList.remove('hidden');

        // Get form data
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            sessionType: formData.get('sessionType'),
            preferredTime: formData.get('preferredTime')
        };

        // Send data to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbwLBhQ4UBNSntSYWcajVjYoXHDTii5idcKHMl9wHfxC7SnMr-SqUirZH3-EVDW9kepp/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Success response
            formMessage.classList.remove('hidden');
            if (data.result === 'success') {
                formMessage.classList.add('text-green-500');
                formMessage.textContent = 'Thank you! Your booking has been submitted successfully.';
                event.target.reset(); // Reset form
            } else {
                formMessage.classList.add('text-red-500');
                formMessage.textContent = 'Error: Could not submit booking.';
            }
            buttonText.textContent = 'Submit Booking';
            spinner.classList.add('hidden');
        })
        .catch(error => {
            // Error response
            formMessage.classList.remove('hidden');
            formMessage.classList.add('text-red-500');
            formMessage.textContent = 'Error submitting booking: ' + error.message;
            buttonText.textContent = 'Submit Booking';
            spinner.classList.add('hidden');
            console.error('Error:', error);
        });
    });
</script>
