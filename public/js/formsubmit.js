const careerForm = document.getElementById("careerForm");
const contactForm = document.getElementById("contactForm");

if (careerForm) {
    careerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(this);

        // Form validation
        const fullName = formData.get("fullName");
        const mobileNumber = formData.get("mobileNumber");
        const email = formData.get("email");
        const address = formData.get("address");
        const education = formData.get("education");
        const resume = formData.get("resume");

        if (!fullName || !mobileNumber || !email || !address || !education || !resume) {
            alert("Please fill out all required fields.");
            return;
        }

        // Validating phone number (should match the pattern: 10 digits)
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(mobileNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Validating email (basic validation)
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // If everything is valid, send the data
        try {
            const response = await fetch("/send-career-email", {
                method: "POST",
                body: formData, // Send the FormData object directly
            });

            const data = await response.json();
            if (data.status) {
                // Display the success message
                const successMessage = document.getElementById("career-successMessage");
                successMessage.style.display = "block";

                // Reset the form
                careerForm.reset();

                // Hide the success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 3000);
            } else {
                // Display the error message
                document.getElementById("career-errorMessage").style.display = "block";
                setTimeout(() => {
                    document.getElementById("career-errorMessage").style.display = "none";
                }, 3000);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form data
        const formData = new FormData(this);
    
        // Form validation
        const fullName = formData.get("fullName");
        const mobileNumber = formData.get("mobileNumber");
        const email = formData.get("email");
        const address = formData.get("address");
        const enquiry = formData.get("enquiry");
        console.log(!fullName || !mobileNumber || !email || !address || !enquiry)
        if (!fullName || !mobileNumber || !email || !address || !enquiry) {
            alert("Please fill out all required fields.");
            return;
        }
    
        // Validating phone number (should match the pattern: 10 digits)
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(mobileNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
    
        // Validating email (basic validation)
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        // If everything is valid, send the data
        try {
            const response = await fetch("/send-contact-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    mobileNumber,
                    email,
                    address,
                    enquiry,
                }),
            });

            const data = await response.json();
            if (data.status) {
                // Display the success message
                const successMessage = document.getElementById("contact-successMessage");
                successMessage.style.display = "block";

                // Reset the form
                contactForm.reset();

                // Hide the success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 3000);
            } else {
                // Display the error message
                document.getElementById("contact-errorMessage").style.display = "block";
                setTimeout(() => {
                    document.getElementById("contact-errorMessage").style.display = "none";
                }, 3000);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    });
}