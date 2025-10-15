<?php

session_start();
include 'config.php'; // Ensure database connection

?>

<!DOCTYPE html>
<html lang = "en">
<head>
    <title>Employee Dashboard</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container">
        <h2>New Employee Registration</h2>
        
        <!-- Form submits to process.php -->
        <form id="registrationForm" action="process.php" method="POST">
            
            <div class="form-grid">
                
                <!-- 1. Full Name (Left Side) -->
                <div class="field-group">
                    <label>Full Name (First and Last)</label>
                    <div class="name-fields">
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" required>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" required>
                    </div>
                </div>

                <!-- 2. Date of Birth (Right Side) -->
                <div class="field-group">
                    <label for="dob">Date of Birth</label>
                    <!-- Date Picker Input -->
                    <input type="date" id="dob" name="dob" required>
                </div>

                <!-- 3. Email (Left Side) -->
                <div class="field-group">
                    <label for="email">Email</label>
                    <!-- Only accepts email input -->
                    <input type="email" id="email" name="email" placeholder="example@company.com" required>
                </div>

                <!-- 4. Phone Number (Right Side) -->
                <div class="field-group">
                    <label for="phone">Phone Number</label>
                    <!-- Input a valid number (using tel type for mobile keyboards) -->
                    <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" required>
                    <small style="color: #666;">Format: 10 to 15 digits.</small>
                </div>

            </div>

            <!-- Message box for JavaScript validation errors -->
            <div id="validationMessage" class="message error"></div>

            <div class="submit-area">
                <button type="submit">Register Employee</button>
            </div>
        </form>
    </div>

    <!-- Link the JavaScript file -->
    <script src="script.js"></script>
</body>