// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  
  // Search functionality
  const searchInput = document.querySelector("nav input");
  const exploreBtn = document.querySelector("nav button");

  exploreBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      alert(`Searching for: ${query}`);
      // Later you can connect this to a backend or API
    } else {
      alert("Please enter something to search.");
    }
  });

  // Sign In and Join Free buttons
  const buttons = document.querySelectorAll("nav div button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert(`You clicked: ${btn.textContent}`);
    });
  });

  // Event cards hover effect (extra JS animation)
  const eventCards = document.querySelectorAll(".event-cards article");
  eventCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.backgroundColor = "#fde68a"; // light yellow
    });
    card.addEventListener("mouseleave", () => {
      card.style.backgroundColor = "#f3f4f6"; // reset
    });
  });

  // Store cards click action
  const storeCards = document.querySelectorAll(".store-cards article");
  storeCards.forEach(card => {
    card.addEventListener("click", () => {
      alert(`Opening details for: ${card.querySelector("h4").textContent}`);
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  
  // --- Detect user location ---
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Reverse geocoding to get country
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
      .then(res => res.json())
      .then(data => {
        const country = data.address.country;
        showCitySuggestions(country);
      })
      .catch(err => console.error("Error fetching location:", err));
  }

  function error() {
    alert("Unable to retrieve your location.");
  }

  // --- Suggest cities by country ---
  function showCitySuggestions(country) {
    const cityList = document.querySelector("#browse-city ul");
    cityList.innerHTML = "";

    const suggestions = {
      "India": ["Kolkata", "Delhi", "Mumbai", "Bangalore", "Chennai"],
      "United States": ["New York", "Los Angeles", "Chicago", "Miami", "Austin", "Nashville"],
      "United Kingdom": ["London", "Manchester", "Liverpool", "Birmingham", "Edinburgh"]
    };

    const cities = suggestions[country] || ["Popular City 1", "Popular City 2"];

    cities.forEach(city => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="city-card">
          <img src="https://source.unsplash.com/400x200/?${city},city" alt="${city}">
          <p>${city}</p>
        </div>
      `;
      cityList.appendChild(li);

      // --- Click action: fetch events for city ---
      li.addEventListener("click", () => {
        fetchEvents(city);
      });
    });
  }

  // --- Fetch events for selected city ---
  function fetchEvents(city) {
    const eventsSection = document.querySelector("#events-shows .event-cards");
    eventsSection.innerHTML = "<p>Loading events...</p>";

    // Example: Ticketmaster Discovery API (free key required)
    // Replace YOUR_API_KEY with your real key
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=YOUR_API_KEY`)
      .then(res => res.json())
      .then(data => {
        eventsSection.innerHTML = ""; // clear loading

        if (data._embedded && data._embedded.events) {
          data._embedded.events.forEach(event => {
            const card = document.createElement("article");
            card.innerHTML = `
              <span>${event.classifications[0].segment.name}</span>
              <h4>${event.name}</h4>
              <p>${event.dates.start.localDate} • ${event._embedded.venues[0].name}</p>
            `;
            eventsSection.appendChild(card);
          });
        } else {
          eventsSection.innerHTML = "<p>No events found for this city.</p>";
        }
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        eventsSection.innerHTML = "<p>Failed to load events.</p>";
      });
  }

});
