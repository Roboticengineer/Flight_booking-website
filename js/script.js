// Mock flight data
const flightsData = [
    { id: 1, from: "New York", to: "Los Angeles", date: "2024-10-30", flightName: "Flight A", pnr: "PNR123" },
    { id: 2, from: "New York", to: "Chicago", date: "2024-10-30", flightName: "Flight B", pnr: "PNR124" },
    { id: 3, from: "Los Angeles", to: "New York", date: "2023-10-30", flightName: "Flight C", pnr: "PNR125" },
    { id: 4, from: "Chicago", to: "New York", date: "2024-10-30", flightName: "Flight D", pnr: "PNR126" },
    { id: 5, from: "Miami", to: "New York", date: "2024-10-30", flightName: "Flight E", pnr: "PNR127" },
    { id: 6, from: "New York", to: "Miami", date: "2024-10-30", flightName: "Flight F", pnr: "PNR128" },
    { id: 7, from: "San Francisco", to: "New York", date: "2024-10-30", flightName: "Flight G", pnr: "PNR129" },
    { id: 8, from: "New York", to: "San Francisco", date: "2024-10-30", flightName: "Flight H", pnr: "PNR130" },
    { id: 9, from: "New York", to: "India", date: "2024-10-30", flightName: "Flight H", pnr: "PNR170" },
    { id: 10, from: "India", to: "New York", date: "2024-10-30", flightName: "Flight I", pnr: "PNR179" },
    { id: 11, from: "India", to: "New York", date: "2024-11-08", flightName: "Flight J", pnr: "PNR134" },
    { id: 12, from: "Delhi", to: "Mumbai", date: "2024-11-08", flightName: "Vistara Airlines", pnr: "PNR180" },
    { id: 13, from: "Mumbai", to: "Delhi", date: "2024-11-08", flightName: "Flight L", pnr: "PNR165" },
];

// Function to generate a random time
function generateRandomTime() {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Function to generate a random price
function generateRandomPrice() {
    return Math.floor(Math.random() * (4000 - 1000 + 1) + 1000);
}

// Function to generate a random duration
function generateRandomDuration() {
    const hours = Math.floor(Math.random() * 10) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
}

// Handle the search form submission
document.getElementById('search-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;

    // Format the date to match the data format
    const formattedDate = new Date(date).toISOString().split('T')[0];

    // Redirect to flights page with search parameters
    window.location.href = `flights.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${formattedDate}`;
});

// Function to simulate booking a flight
function bookFlight(flightName) {
    // Simulate booking process
    alert(`You have booked ${flightName}.`);
    window.location.href = 'confirm.html';
}

// Function to display flights
function displayFlights() {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    const to = urlParams.get('to');
    const date = urlParams.get('date');

    // Filter flights based on search parameters
    const filteredFlights = flightsData.filter(flight => {
        const matchFrom = flight.from.toLowerCase() === from.toLowerCase();
        const matchTo = flight.to.toLowerCase() === to.toLowerCase();
        const matchDate = flight.date === date;
        return matchFrom && matchTo && matchDate;
    });

    const flightListDiv = document.getElementById('flight-list');
    flightListDiv.innerHTML = '';

    if (filteredFlights.length > 0) {
        filteredFlights.forEach(flight => {
            const departureTime = generateRandomTime();
            const arrivalTime = generateRandomTime();
            const price = generateRandomPrice();
            const duration = generateRandomDuration();
            
            const flightCard = `
                <div class="flight-card">
                    <div class="airline-info">
                        <img src="/Html project/images/vistara.jpg" alt="${flight.flightName}">
                        <span class="airline-name">${flight.flightName}</span>
                    </div>
                    <div class="flight-details">
                        <div class="route">
                            <span class="departure">${flight.from}</span>
                            <span class="arrow">→</span>
                            <span class="arrival">${flight.to}</span>
                        </div>
                        <div class="time">
                            <span class="departure-time">${departureTime}</span>
                            -
                            <span class="arrival-time">${arrivalTime}</span>
                        </div>
                        <div class="duration">Duration: ${duration}</div>
                        <div class="price">₹${price}</div>
                        <div class="pnr">PNR: ${flight.pnr}</div>
                        <button class="book-btn" onclick="bookFlight('${flight.flightName}')">Book Now</button>
                    </div>
                </div>
            `;
            flightListDiv.innerHTML += flightCard;
        });
    } else {
        flightListDiv.innerHTML = `
            <div class="no-flights">
                <div class="error-message">
                    <h3>No Flights Available</h3>
                    <p>No flights available for the selected criteria.</p>
                    <div class="search-details">
                        <p><strong>From:</strong> ${from}</p>
                        <p><strong>To:</strong> ${to}</p>
                        <p><strong>Date:</strong> ${date}</p>
                    </div>
                    <a href="index.html" class="back-button">Back to Search</a>
                </div>
            </div>
        `;
    }
}

// Check if we're on the flights page and display flights
if (window.location.pathname.includes('flights.html')) {
    displayFlights();
}

// Handle the PNR form submission
document.getElementById('pnr-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const pnr = document.getElementById('pnr').value;

    // Find the flight with the given PNR
    const flight = flightsData.find(flight => flight.pnr === pnr);

    const pnrResultDiv = document.getElementById('pnr-result');
    if (flight) {
        const departureTime = generateRandomTime();
        const arrivalTime = generateRandomTime();
        const duration = generateRandomDuration();
        
        pnrResultDiv.innerHTML = `
            <div class="pnr-box">
                <h3>Flight Details </h3>
                <div class="pnr-info">
                    <p><strong>PNR Number:</strong> ${pnr}</p>
                    <p><strong>Flight:</strong> ${flight.flightName}</p>
                    <p><strong>From:</strong> ${flight.from}</p>
                    <p><strong>To:</strong> ${flight.to}</p>
                    <p><strong>Date:</strong> ${flight.date}</p>
                    <p><strong>Departure:</strong> ${departureTime}</p>
                    <p><strong>Arrival:</strong> ${arrivalTime}</p>
                    <p><strong>Duration:</strong> ${duration}</p>
                    <p class="status confirmed"><strong>Status:</strong> Confirmed</p>
                </div>
            </div>
        `;
    } else {
        pnrResultDiv.innerHTML = `
            <div class="pnr-box not-found">
                <h3>PNR Status</h3>
                <p>PNR Number: ${pnr}</p>
                <p class="status not-found">Status: Not Found</p>
            </div>
        `;
    }
});