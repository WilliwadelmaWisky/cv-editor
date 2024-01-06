/*
const fs = require('fs');

const select = document.querySelector("select");
fs.readdir("./templates/", (err, files) => {
    files.forEach(file => {
        const option = document.createElement("option");
        option.innerText = file;
        select.appendChild(option);
    });
});
*/

const addLanguageButton = document.getElementById("add-lang-btn");
const removeLanguageButton = document.getElementById("rem-lang-btn");

addLanguageButton.addEventListener("click", () => {
    addLanguageButton.style.display = "none";
});
removeLanguageButton.addEventListener("click", () => {
    removeLanguageButton.style.display = "none";
});

const addEducationButton = document.getElementById("add-edu-btn");
const removeEducationButton = document.getElementById("rem-edu-btn");

addEducationButton.addEventListener("click", () => {
    addEducationButton.style.display = "none";
});
removeEducationButton.addEventListener("click", () => {
    removeEducationButton.style.display = "none";
});

const addJobButton = document.getElementById("add-job-btn");
const removeJobButton = document.getElementById("rem-job-btn");

addJobButton.addEventListener("click", () => {
    addJobButton.style.display = "none";
});
removeJobButton.addEventListener("click", () => {
    removeJobButton.style.display = "none";
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
})