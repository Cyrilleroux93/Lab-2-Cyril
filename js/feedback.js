/* get the form from the HTML doc */
const form = document.querySelector(".contact-form");

/* Get all the inoputed field fron HTML*/
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const topic = document.getElementById("topic");
const comments = document.getElementById("comments");
const website = document.getElementById("website");

/* Get the character counter element */
const characterCounter = document.getElementById("character-counter");
/* Get the success message element */
const successMessage = document.getElementById("success-message");

/* Validation functions for different fields*/
function validateFullName() {
    const name = fullName.value.trim();
    if (name.length < 2) {
        return false;
    }
    if (!/^[\p{L}\p{M} '-]+$/u.test(name)) {
        return false;
    }
    return true;
}


function validateEmail() {
    const emailValue = email.value.trim();
    if (emailValue === "") {
        return false;
    }
    // Alternative could be return email.checkValidity(); It uses the built-in HTML validation instead of a regex but the assignment required a regex.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        return false;
    }
    return true;}



function validateTopic() {
    if (topic.value === "") {
        return false;
    }
    return true;
}


function validateComments() {
    const commentText = comments.value.trim();
    if (commentText.length < 15) return false;
    if (commentText.length > 40) return false;
    return true;}

/* Function to update the character counter as the user types */
function updateCharacterCounter() {
    const count = comments.value.length;
    characterCounter.textContent = count + " characters (minimum 15, maximum 40)";
    if (count === 0) {
        /* make sure that we do not have a red or green text before user start to type */
        characterCounter.style.color = "";
        comments.classList.remove("invalid");
        comments.classList.remove("valid");
        /* Make it more accessible for screen readers */
        comments.removeAttribute("aria-invalid");

    } else if (count < 15) {
        characterCounter.style.color = "red";
        comments.classList.add("invalid");
        comments.classList.remove("valid");
        comments.setAttribute("aria-invalid", "true");
    } else if (count > 40) {
         characterCounter.style.color = "red";
        comments.classList.add("invalid");
        comments.classList.remove("valid");
        comments.setAttribute("aria-invalid", "true");
    } else {
        characterCounter.style.color = "green";
        comments.classList.add("valid");
        comments.classList.remove("invalid");
        comments.setAttribute("aria-invalid", "false");}}

/* Check if the website URL is valid using the built-in HTML validation */
function validateWebsite() {
    return website.checkValidity();}



/* Function to display error messages */
function showError(field, message) {
    /* create a error message element built with the name of the field plus error to match the right id in the HTML. Found this technique online */
    const errorMessage = document.getElementById(field.id + "-error");
/* this part edit the paragraph currently empty into the error message */
    errorMessage.textContent = message;
    /* add a class to the field to indicate it is invalid and turn on the red border */
    field.classList.add("invalid");
    /* remove the valid class if relevent so the green border is removed */
    field.classList.remove("valid");
    /* Accesibility coponent for screen readers */
    field.setAttribute("aria-invalid", "true");
}


/* Opposite as above */
function clearError(field) {
    const errorMessage = document.getElementById(field.id + "-error");
    errorMessage.textContent = "";
    field.classList.remove("invalid");
    field.classList.add("valid");
    field.setAttribute("aria-invalid", "false");
}


/* Function that manage the form reseting part */
function resetForm() {
    /* Built in reset function */
    form.reset();
    /* reset all error messages */
    clearError(fullName);
    clearError(email);
    clearError(topic);
    clearError(website);
    /* Arraying all the fields so the part after does not need to be repeated */
    const fields = [fullName, email, topic, comments, website];
    /* built in function that willbe executed once for each component of the array */
    fields.forEach(function(field) {
        /* remove the valid and invalid classes and styling */
        field.classList.remove("valid");
        field.classList.remove("invalid");
        field.removeAttribute("aria-invalid");});
        /* Reset the character counter */
    updateCharacterCounter();
    /* remove the success message */
    successMessage.textContent = "";
}





/* Function which ask JavaScipt to listen to an event, here the user typing */
fullName.addEventListener("input", function() {
    /* When input happen the below if is trigered and call the calidate function */
    /* If correct error are cleared */
    if (validateFullName()) {
        clearError(fullName);
        /* If not the error message trigger */
    } else {
        showError(fullName, "Please enter a valid name with at least 2 characters.");
    }});


email.addEventListener("input", function() {
    if (validateEmail()) {
        clearError(email);
    } else {
        showError(email, "Please enter a valid email address.");
    }
});

topic.addEventListener("change", function() {
    if (validateTopic()) {
        clearError(topic);
    } else {
        showError(topic, "Please select a topic.");
    }});

website.addEventListener("input", function() {
    if (validateWebsite()) {
        clearError(website);
    } else {
        showError(website, "Please enter a valid URL.");
    }});














/* simpler function because already handled somewhere else */
        comments.addEventListener("input", updateCharacterCounter);


        /*  initialize the character counter when the page loads*/
updateCharacterCounter();



//Function which validate the different fields
form.addEventListener("submit", function(event) {
    event.preventDefault();


    // Remove previous success message
    successMessage.textContent = "";

    // Validate name
    if (validateFullName()) {
        clearError(fullName);
    } else {
        showError(fullName, "Please enter a valid name with at least 2 characters.");
    }

    // Validate email address
    if (validateEmail()) {
        clearError(email);
    } else {
        showError(email, "Please enter a valid email address.");
    }

    // Validate the topic
    if (validateTopic()) {
        clearError(topic);
    } else {
        showError(topic, "Please select a topic.");
    }

    // Validate the omments
    if (validateComments()) {
        characterCounter.style.color = "green";
    } else {
        characterCounter.style.color = "red";
        characterCounter.textContent = comments.value.length + " characters (minimum 15, maximum 40)";
    }

    // Validate that the website has a valid URL but no alert if empty since not required
    if (validateWebsite()) {
        clearError(website);
    } else {
        showError(website, "Please enter a valid URL.");
    }


     // Show success message if all is good
    if (
    validateFullName() &&
    validateEmail() &&
    validateTopic() &&
    validateComments() &&
    validateWebsite()
) {
    const name = fullName.value.trim();
    resetForm();
    successMessage.textContent = "Thanks for your feedback, " + name + "!";
    setTimeout(function() {
        successMessage.textContent = "";
    }, 4000);
}});









