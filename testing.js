fetch("https://jkpgcity.se/_next/data/jJttluyoc1kBByErAiBuo/sv/upptack/uppleva.json?slug=uppleva")
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
        console.log(data);  // Display venues in the console
        displayVenues(data); // Call function to display venues
    })
    .catch(error => console.error("Error fetching venues:", error));

// Function to display venues on the page
function displayVenues(venues) {
    const venueContainer = document.getElementById("venue-list");
    
    venues.forEach(venue => {
        let venueDiv = document.createElement("div");
        venueDiv.classList.add("venue");
        venueDiv.innerHTML = `<h2>${venue.name}</h2><p>${venue.location}</p>`;
        venueContainer.appendChild(venueDiv);
    });
}
