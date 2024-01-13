const templateSelect = document.getElementById("template-select");
window.api.receive('send-templates', files => {
    templateSelect.replaceChildren();
    files.forEach(file => {
        const option = document.createElement("option");
        option.innerText = file;
        option.value = file;
        templateSelect.appendChild(option);
    });
});
window.api.send('request-templates', null);


const languageSelect = document.getElementById("language-select");
const languages = ["english", "finnish"]
languages.forEach(language => {
    const option = document.createElement("option");
    option.innerText = language;
    option.value = language;
    languageSelect.appendChild(option);
});


const languageBox = document.getElementById("lang-box");


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const languageInfos = [];
    for (const languageElem of languageBox.childNodes) {
        languageInfos.push({
            language: languageElem.querySelector("input").value,
            skillLevel: 100 - languageElem.querySelector("select").value * (100.0 / 4.0)
        });
    }

    window.api.send('generate-cv', {
        templateIndex: templateSelect.options.selectedIndex,
        templateLanguage: languageSelect.value,
        name: document.getElementById("name-field").value,
        languageInfos: languageInfos
    });
})


const addLanguageButton = document.getElementById("add-lang-btn");
const removeLanguageButton = document.getElementById("rem-lang-btn");
addLanguageButton.addEventListener("click", () => {
    const template = createLanguageTemplate();
    languageBox.appendChild(template);
});
removeLanguageButton.addEventListener("click", () => {
    if (languageBox.lastElementChild === null) return;
    languageBox.removeChild(languageBox.lastElementChild);
});


const addEducationButton = document.getElementById("add-edu-btn");
const removeEducationButton = document.getElementById("rem-edu-btn");
const educationBox = document.getElementById("edu-box");
addEducationButton.addEventListener("click", () => {
    const template = createEducationTemplate();
    educationBox.appendChild(template);
});
removeEducationButton.addEventListener("click", () => {
    if (educationBox.lastElementChild === null) return;
    educationBox.removeChild(educationBox.lastElementChild);
});


const addJobButton = document.getElementById("add-job-btn");
const removeJobButton = document.getElementById("rem-job-btn");
addJobButton.addEventListener("click", () => {
    addJobButton.style.display = "none";
});
removeJobButton.addEventListener("click", () => {
    removeJobButton.style.display = "none";
});



const createLanguageTemplate = () => {
    const template = document.createElement("div");
    template.className = "d-flex flex-direction-col gap-half";

    const label = document.createElement("label");
    label.htmlFor = "language-input";
    label.innerText = "Language";
    template.appendChild(label);

    const container = document.createElement("div");
    container.className = "d-flex flex-direction-row align-items-center gap-half";
    template.appendChild(container);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Language...";
    nameInput.name = "language-input";
    nameInput.id = "language-input";
    nameInput.className = "flex-grow";
    container.appendChild(nameInput);

    const skillLevelSelect = document.createElement("select");
    skillLevelSelect.id = "skill-level-select";
    skillLevelSelect.className = "flex-grow";
    container.appendChild(skillLevelSelect);

    const skillLevels = ["Excellent", "Great", "Good", "Basics"];
    skillLevels.map((skillLevel, index) => {
        const option = document.createElement("option");
        option.value = index.toString();
        option.innerText = skillLevel;
        skillLevelSelect.appendChild(option);
    });

    return template;
}


const createEducationTemplate = () => {
    const template = document.createElement("div");
    template.className = "d-flex flex-direction-col gap-half";

    const label = document.createElement("label");
    label.htmlFor = "education-input";
    label.innerText = "Education";
    template.appendChild(label);

    const educationInput = document.createElement("input");
    educationInput.type = "text";
    educationInput.placeholder = "Education...";
    educationInput.name = "education-input";
    educationInput.id = "education-input";
    template.appendChild(educationInput);

    const instituteInput = document.createElement("input");
    instituteInput.type = "text";
    instituteInput.placeholder = "Institute...";
    instituteInput.name = "institute-input";
    instituteInput.id = "institute-input";
    template.appendChild(instituteInput);

    const today = new Date().toJSON().slice(0, 10);
    const container = document.createElement("div");
    container.className = "d-flex flex-direction-row gap-half align-items-center";
    template.appendChild(container);

    const startDateInput = document.createElement("input");
    startDateInput.type = "date";
    startDateInput.min = "1900-01-01";
    startDateInput.max = today;
    startDateInput.value = startDateInput.max;
    startDateInput.id = "start-date-input";
    startDateInput.className = "flex-grow";
    container.appendChild(startDateInput);

    const endDateInput = document.createElement("input");
    endDateInput.type = "date";
    endDateInput.min = "1900-01-01";
    endDateInput.max = today;
    endDateInput.value = endDateInput.max;
    endDateInput.id = "start-date-input";
    endDateInput.className = "flex-grow";
    container.appendChild(endDateInput);

    return template;
}


const createJobTemplate = () => {

}