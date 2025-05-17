document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const bookingForm = document.getElementById("booking-form");
  const questionForm = document.getElementById("question-form");
  const admissionForm = document.getElementById("admission-form");
  const contactSubmit = document.getElementById("contact-submit");
  const contactSpinner = document.getElementById("contact-spinner");
  const contactButtonText = document.getElementById("contact-button-text");
  const bookingButton = bookingForm?.querySelector('button[type="submit"]');
  const bookingSpinner = document.getElementById("spinner");
  const bookingButtonText = document.getElementById("button-text");
  const questionSpinner = document.getElementById("question-spinner");
  const questionButtonText = document.getElementById("question-button-text");
  const admissionSubmit = document.getElementById("admission-submit");
  const admissionSpinner = document.getElementById("admission-spinner");
  const admissionButtonText = document.getElementById("admission-button-text");

  // Replace with your Google Apps Script Web App URL
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwnKmoXP1tJE-SLd9Rro85JnuapcjDbENCfByha6xZEfR1SLk2V4_57J4Vwioid2MmQiQ/exec";

  // Close Modal Function
  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      // Clear animation containers
      [
        "fireworks-container",
        "confetti-container",
        "starburst-container",
      ].forEach((id) => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = "";
      });
    }
  };

  // Fireworks Animation (Contact and Admission Forms)
  function createFireworks() {
    const container = document.getElementById("fireworks-container");
    if (container) {
      container.style.display = "block";
      for (let i = 0; i < 30; i++) {
        const firework = document.createElement("div");
        firework.className = "firework";
        firework.style.left = Math.random() * 100 + "vw";
        firework.style.top = Math.random() * 100 + "vh";
        firework.style.animationDelay = Math.random() * 0.5 + "s";
        container.appendChild(firework);
      }
      setTimeout(() => {
        container.style.display = "none";
        container.innerHTML = "";
      }, 2000);
    }
  }

  // Confetti Animation (Booking Form)
  function createConfetti() {
    const container = document.getElementById("confetti-container");
    if (container) {
      container.style.display = "block";
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(confetti);
      }
      setTimeout(() => {
        container.style.display = "none";
        container.innerHTML = "";
      }, 3000);
    }
  }

  // Starburst Animation (Question Form)
  function createStarbursts() {
    const container = document.getElementById("starburst-container");
    if (container) {
      container.style.display = "block";
      for (let i = 0; i < 15; i++) {
        const starburst = document.createElement("div");
        starburst.className = "starburst";
        starburst.style.left = Math.random() * 100 + "vw";
        starburst.style.top = Math.random() * 100 + "vh";
        starburst.style.animationDelay = Math.random() * 0.4 + "s";
        starburst.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(starburst);
      }
      setTimeout(() => {
        container.style.display = "none";
        container.innerHTML = "";
      }, 1600);
    }
  }

  // Create Custom Pop-up for Question Form Fallback
  function showCustomPopup() {
    // Create pop-up container
    const popup = document.createElement("div");
    popup.id = "custom-question-popup";
    popup.className =
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-6 rounded-lg shadow-xl z-50 max-w-sm w-full opacity-0 transition-opacity duration-500";
    popup.innerHTML = `
        <h2 class="text-xl font-bold mb-2">Awesome! 🎉</h2>
        <p class="text-gray-300 mb-4">Your question is sent! We'll reply on WhatsApp soon!</p>
        <button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors" onclick="this.parentElement.remove()">Close</button>
      `;
    document.body.appendChild(popup);

    // Fade in
    setTimeout(() => {
      popup.style.opacity = "1";
    }, 100);

    // Trigger starbursts if container exists
    createStarbursts();

    // Fade out and remove after 3 seconds
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => {
        popup.remove();
      }, 500);
    }, 3000);
  }

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactSpinner.classList.remove("hidden");
      contactButtonText.textContent = "Sending...";
      contactSubmit.disabled = true;

      const formData = new FormData(contactForm);
      formData.append("formType", "contact");

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          contactSpinner.classList.add("hidden");
          contactButtonText.textContent = "Send Message";
          contactSubmit.disabled = false;

          if (data.result === "success") {
            const modal = document.getElementById("contact-modal");
            if (modal) {
              modal.style.display = "flex";
              createFireworks();
              contactForm.reset();
            } else {
              alert("Contact form submitted successfully!");
              contactForm.reset();
            }
          } else {
            alert("Error: " + data.error);
          }
        })
        .catch((error) => {
          contactSpinner.classList.add("hidden");
          contactButtonText.textContent = "Send Message";
          contactSubmit.disabled = false;
          alert("Error: " + error.message);
        });
    });
  }

  // Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const lastBookingTime = localStorage.getItem("lastBookingTime");
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (lastBookingTime && now - lastBookingTime < oneDay) {
        const nextBookingTime = new Date(parseInt(lastBookingTime) + oneDay);
        const repeatModal = document.getElementById("repeat-booking-modal");
        if (repeatModal) {
          document.getElementById("repeat-booking-time").textContent =
            nextBookingTime.toLocaleString();
          repeatModal.style.display = "flex";
        } else {
          alert(
            "You can only book once every 24 hours. Please try again after " +
              nextBookingTime.toLocaleString()
          );
        }
        return;
      }

      bookingSpinner.classList.remove("hidden");
      bookingButtonText.textContent = "Submitting...";
      bookingButton.disabled = true;

      const formData = new FormData(bookingForm);
      formData.append("formType", "booking");

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          bookingSpinner.classList.add("hidden");
          bookingButtonText.textContent = "Submit Booking";
          bookingButton.disabled = false;

          if (data.result === "success") {
            localStorage.setItem("lastBookingTime", now);
            const successModal = document.getElementById(
              "booking-success-modal"
            );
            if (successModal) {
              successModal.style.display = "flex";
              createConfetti();
              bookingForm.reset();
            } else {
              alert("Booking submitted successfully!");
              bookingForm.reset();
            }
          } else {
            alert("Error: " + data.error);
          }
        })
        .catch((error) => {
          bookingSpinner.classList.add("hidden");
          bookingButtonText.textContent = "Submit Booking";
          bookingButton.disabled = false;
          alert("Error: " + error.message);
        });
    });
  }

  // Question Form Submission
  if (questionForm) {
    questionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      questionSpinner.classList.remove("hidden");
      questionButtonText.textContent = "Submitting...";
      questionForm.querySelector('button[type="submit"]').disabled = true;

      const formData = new FormData(questionForm);
      formData.append("formType", "question");

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          questionSpinner.classList.add("hidden");
          questionButtonText.textContent = "Submit Question";
          questionForm.querySelector('button[type="submit"]').disabled = false;

          if (data.result === "success") {
            const modal = document.getElementById("question-modal");
            if (modal) {
              modal.style.display = "flex";
              createStarbursts();
              questionForm.reset();
            } else {
              showCustomPopup();
              questionForm.reset();
            }
          } else {
            alert("Error: " + data.error);
          }
        })
        .catch((error) => {
          questionSpinner.classList.add("hidden");
          questionButtonText.textContent = "Submit Question";
          questionForm.querySelector('button[type="submit"]').disabled = false;
          alert("Error: " + error.message);
        });
    });
  }

  // Admission Form Submission
  if (admissionForm) {
    admissionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      admissionSpinner.classList.remove("hidden");
      admissionButtonText.textContent = "Submitting...";
      admissionSubmit.disabled = true;

      const formData = new FormData(admissionForm);
      formData.append("formType", "admission");

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
          admissionSpinner.classList.add("hidden");
          admissionButtonText.textContent = "Submit Admission";
          admissionSubmit.disabled = false;

          if (data.result === "success") {
            const modal = document.getElementById("admission-modal");
            if (modal) {
              modal.style.display = "flex";
              createFireworks();
              admissionForm.reset();
            } else {
              alert("Admission form submitted successfully!");
              admissionForm.reset();
            }
          } else {
            alert("Error: " + data.error);
          }
        })
        .catch((error) => {
          admissionSpinner.classList.add("hidden");
          admissionButtonText.textContent = "Submit Admission";
          admissionSubmit.disabled = false;
          alert("Error: " + error.message);
        });
    });
  }
});
