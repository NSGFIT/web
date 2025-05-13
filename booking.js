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
  .then(response => response.json())
  .then(data => {
    // Success response
    formMessage.classList.remove('hidden');
    formMessage.classList.add('text-green-500');
    formMessage.textContent = data.message;
    buttonText.textContent = 'Submit Booking';
    spinner.classList.add('hidden');
    event.target.reset(); // Reset form
  })
  .catch(error => {
    // Error response
    formMessage.classList.remove('hidden');
    formMessage.classList.add('text-red-500');
    formMessage.textContent = 'Error submitting booking. Please try again.';
    buttonText.textContent = 'Submit Booking';
    spinner.classList.add('hidden');
    console.error('Error:', error);
  });
});
