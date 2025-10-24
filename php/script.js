// Data for the regions and cities/municipalities
const addressData = [
    {
      "region": "National Capital Region (NCR)",
      "cities_or_municipalities": ["Manila", "Quezon City", "Makati", "Pasig", "Taguig"]
    },
    {
      "region": "Region IV-A (CALABARZON)",
      "cities_or_municipalities": ["Antipolo", "Calamba", "Batangas City", "Lucena", "Dasmariñas"]
    },
    {
      "region": "Region VII (Central Visayas)",
      "cities_or_municipalities": ["Cebu City", "Lapu-Lapu City", "Mandaue", "Tagbilaran", "Toledo"]
    },
    {
      "region": "Region XI (Davao Region)",
      "cities_or_municipalities": ["Davao City", "Tagum", "Panabo", "Digos", "Mati"]
    }
];

const regionSelect = document.getElementById('region');
const cityMunicipalitySelect = document.getElementById('cityMunicipality');

/**
 * Populates the Region dropdown.
 */
function populateRegions() {
    // Start from index 0 because the "Select A Region" option is already in the HTML
    addressData.forEach(data => {
        const option = document.createElement('option');
        // Use the full region name as both value and visible text
        option.value = data.region;
        option.textContent = data.region;
        regionSelect.appendChild(option);
    });
}

/**
 * Populates the City/Municipality dropdown using <optgroup>s for grouping,
 * simulating dependency without full interactivity.
 */
function populateGroupedCities() {
    // Clear existing options (except the "Select" placeholder, which is handled in HTML)
    // Note: In the revised HTML, the placeholder option is no longer being cleared here.
    
    // Iterate through each region data object
    addressData.forEach(data => {
        // Create an <optgroup> for the current region
        const optgroup = document.createElement('optgroup');
        optgroup.label = data.region; // The label shown for the group

        // Iterate through cities/municipalities in that region
        data.cities_or_municipalities.forEach(city => {
            const option = document.createElement('option');
            // Use the city name as both value and visible text
            // The value submitted will be just the city name.
            option.value = city; 
            option.textContent = city;
            optgroup.appendChild(option);
        });

        // Add the completed group to the select box
        cityMunicipalitySelect.appendChild(optgroup);
    });
}

// Initialize the dropdowns when the script loads
document.addEventListener('DOMContentLoaded', () => {
    populateRegions();
    populateGroupedCities();
});


// Optional: Add event listener to clear/reset the city selection when region changes
// This fulfills the spirit of the challenge (dependency) even if the optgroups remain visible.
regionSelect.addEventListener('change', () => {
    // Simply reset the city/municipality selection to the placeholder
    cityMunicipalitySelect.value = ""; 
    
    // Alternatively, you could filter and repopulate the cityMunicipalitySelect here 
    // to achieve true interactivity, but the requirement specifically asks for 
    // the grouped dropdown options *instead of* actual interactivity.
});

// Example of a basic validation check (optional, but good practice)
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    const messageBox = document.getElementById('validationMessage');
    
    // Check if a region has been selected
    if (!regionSelect.value) {
        e.preventDefault();
        messageBox.textContent = "Please select a Region.";
        messageBox.style.display = 'block';
        return;
    }
    
    // Check if a city/municipality has been selected
    if (!cityMunicipalitySelect.value) {
        e.preventDefault();
        messageBox.textContent = "Please select a City or Municipality.";
        messageBox.style.display = 'block';
        return;
    }
    
    // If validation passes
    messageBox.style.display = 'none';
    messageBox.textContent = '';
    
    // Form submission proceeds
});