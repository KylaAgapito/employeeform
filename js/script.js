        // Data structure containing the required regions and cities
        const regionData = [
            {
                "id": "NCR",
                "region": "National Capital Region (NCR)",
                "cities_or_municipalities": ["Manila", "Quezon City", "Makati", "Pasig", "Taguig"]
            },
            {
                "id": "CALABARZON",
                "region": "Region IV-A (CALABARZON)",
                "cities_or_municipalities": ["Antipolo", "Calamba", "Batangas City", "Lucena", "Dasmariñas"]
            },
            {
                "id": "CentralVisayas",
                "region": "Region VII (Central Visayas)",
                "cities_or_municipalities": ["Cebu City", "Lapu-Lapu City", "Mandaue", "Tagbilaran", "Toledo"]
            },
            {
                "id": "DavaoRegion",
                "region": "Region XI (Davao Region)",
                "cities_or_municipalities": ["Davao City", "Tagum", "Panabo", "Digos", "Mati"]
            }
        ];

        const regionSelect = document.getElementById('region');
        const citySelect = document.getElementById('city_municipality');
        
        // --- Core Functions ---
        
        /**
         * Populates the Region dropdown from the regionData array.
         */
        function populateRegions() {
            regionData.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.region;
                regionSelect.appendChild(option);
            });
        }

        /**
         * Clears and populates the City/Municipality dropdown based on the selected region.
         * @param {string} regionId - The ID of the selected region (e.g., 'NCR'). // BASICALLY DECLARING THIS VARIABLE AS A PARAMETER FOR REGIONID
         */
        function populateCities(regionId) {
            // // 1. Clear previous options
            // citySelect.innerHTML = '<option value="" disabled selected>Select A City/Municipality</option>';
            // citySelect.disabled = true; // Disable until cities are added

            // // If no region is selected, stop
            // if (!regionId) {
            //     citySelect.innerHTML = '<option value="" disabled selected>Select A Region First</option>';
            //     return;
            // }

            // 2. Find the corresponding region data
            const selectedRegion = regionData.find(item => item.id === regionId);

            if (selectedRegion) {
                // 3. Populate cities
                selectedRegion.cities_or_municipalities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                // 4. Enable the city dropdown
                citySelect.disabled = false;
                citySelect.focus();
            }
        }
        
        // --- Event Listener ---

        // Listen for changes on the Region select
        regionSelect.addEventListener('change', (event) => {
            const selectedRegionId = event.target.value;
            populateCities(selectedRegionId);
        });

        // --- Initialization and Validation ---
        
        // Run on load to populate the initial list of regions
        populateRegions();
        
        // Simple form validation and submission simulation
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const messageBox = document.getElementById('validationMessage');
            
            // Helper function to set message style
            const setMessage = (message, isError) => {
                messageBox.textContent = message;
                messageBox.classList.remove('hidden', 'text-red', 'text-green');
                if (isError) {
                    messageBox.classList.add('text-red');
                } else {
                    messageBox.classList.add('text-green');
                    // Clear the form after success
                    document.getElementById('registrationForm').reset();
                    // Reset city dropdown state
                    populateCities(null); 
                }
            };

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const selectedRegion = regionSelect.value;
            const selectedCity = citySelect.value;
            
            if (firstName.length < 2 || lastName.length < 2) {
                setMessage('Please ensure both first and last names are at least 2 characters long.', true);
                return;
            }

            if (!selectedRegion || !selectedCity) {
                 setMessage('Please select both a Region and a City/Municipality.', true);
                return;
            }

            // Simulate successful submission
            console.log("Form data submitted (simulated):", {
                firstName: firstName,
                lastName: lastName,
                region: selectedRegion,
                city: selectedCity,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value
            });
            
            setMessage('Registration submitted successfully!', false);
        });