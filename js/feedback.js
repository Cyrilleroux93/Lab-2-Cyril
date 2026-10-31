
const form = document.querySelector(".contact-form");


const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const topic = document.getElementById("topic");
const comments = document.getElementById("comments");
const website = document.getElementById("website");

const characterCounter = document.getElementById("character-counter");


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








        comments.addEventListener("input", updateCharacterCounter);

updateCharacterCounter();