 // Load saved entries when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadEntries();
            
            // Set up form validation
            document.getElementById('registrationForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate email
                const email = document.getElementById('email').value;
                const emailError = document.getElementById('emailError');
                if (!validateEmail(email)) {
                    emailError.textContent = 'Please enter a valid email address';
                    return;
                } else {
                    emailError.textContent = '';
                }
                
                // Validate age (18-55 years)
                const dob = document.getElementById('dob').value;
                const ageError = document.getElementById('ageError');
                const age = calculateAge(new Date(dob));
                
                if (age < 18 || age > 55) {
                    ageError.textContent = 'Age must be between 18 and 55 years';
                    return;
                } else {
                    ageError.textContent = '';
                }
                
                // If validations pass, save the entry
                saveEntry();
            });
        });

        // Email validation function
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Age calculation function
        function calculateAge(birthDate) {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        }

        // Save entry to localStorage and table
        function saveEntry() {
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const acceptedTerms = document.getElementById('acceptTerms').checked;
            
            // Create entry object
            const entry = {
                name,
                email,
                password,
                dob,
                acceptedTerms
            };
            
            // Get existing entries from localStorage
            let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
            
            // Add new entry
            entries.push(entry);
            
            // Save back to localStorage
            localStorage.setItem('formEntries', JSON.stringify(entries));
            
            // Add to table
            addEntryToTable(entry);
            
            // Reset form
            document.getElementById('registrationForm').reset();
        }

        // Add entry to the table
        function addEntryToTable(entry) {
            const tableBody = document.querySelector('#entriesTable tbody');
            const newRow = tableBody.insertRow();
            
            newRow.insertCell(0).textContent = entry.name;
            newRow.insertCell(1).textContent = entry.email;
            newRow.insertCell(2).textContent = entry.password;
            newRow.insertCell(3).textContent = entry.dob;
            newRow.insertCell(4).textContent = entry.acceptedTerms ? 'true' : 'false';
        }

        // Load saved entries from localStorage
        function loadEntries() {
            const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
            const tableBody = document.querySelector('#entriesTable tbody');
            
            // Clear existing rows (except header)
            tableBody.innerHTML = '';
            
            // Add each entry to the table
            entries.forEach(entry => {
                addEntryToTable(entry);
            });
        }
