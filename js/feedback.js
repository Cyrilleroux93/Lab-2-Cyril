
const form = document.querySelector(".contact-form");


const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const topic = document.getElementById("topic");
const comments = document.getElementById("comments");
const website = document.getElementById("website");

const characterCounter = document.getElementById("character-counter");

const successMessage = document.getElementById("success-message");


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
    if (commentText.length < 15) {
        return false;
    }
    return true;}


function updateCharacterCounter() {
    const count = comments.value.length;
    characterCounter.textContent = count + " / 15 characters (minimum)";
    if (count < 15) {
        characterCounter.style.color = "red";
    } else {
        characterCounter.style.color = "green";}}


function validateWebsite() {
    return website.checkValidity();}



function showError(field, message) {
    const errorMessage = document.getElementById(field.id + "-error");

    errorMessage.textContent = message;}

function clearError(field) {
    const errorMessage = document.getElementById(field.id + "-error");
    errorMessage.textContent = "";}


function resetForm() {
    form.reset();
    clearError(fullName);
    clearError(email);
    clearError(topic);
    clearError(website);
    updateCharacterCounter();
    successMessage.textContent = "";}






fullName.addEventListener("input", function() {
    if (validateFullName()) {
        clearError(fullName);
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















        comments.addEventListener("input", updateCharacterCounter);

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
        characterCounter.textContent = comments.value.length + " / 15 characters (minimum required)";
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
        successMessage.textContent = "Thanks for your feedback, " + fullName.value.trim() + "!";

        setTimeout(function() {successMessage.textContent = ""; }, 4000); }});


    const clearButton = form.querySelector('button[type="reset"]');
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    resetForm();});









