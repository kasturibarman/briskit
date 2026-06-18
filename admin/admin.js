document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const dashboard = document.getElementById("dashboard");
  const eventForm = document.getElementById("event-form");
  const eventList = document.getElementById("event-list");

  // --- Simple login (replace with real auth later) ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginForm.querySelector("input[type=text]").value;
    const password = loginForm.querySelector("input[type=password]").value;

    if (username === "admin" && password === "password123") {
      alert("Login successful!");
      loginForm.parentElement.style.display = "none";
      dashboard.style.display = "block";
    } else {
      alert("Invalid credentials.");
    }
  });

  // --- Add new event ---
  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("event-title").value;
    const category = document.getElementById("event-category").value;
    const description = document.getElementById("event-description").value;
    const poster = document.getElementById("event-poster").files[0];
    const price = document.getElementById("ticket-price").value;

    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");
    eventCard.innerHTML = `
      <h4>${title}</h4>
      <p><strong>Category:</strong> ${category}</p>
      <p>${description}</p>
      <p><strong>Price:</strong> $${price}</p>
      ${poster ? `<img src="${URL.createObjectURL(poster)}" alt="${title}" style="width:100%;max-height:200px;object-fit:cover;">` : ""}
    `;

    eventList.appendChild(eventCard);
    eventForm.reset();
  });
});
