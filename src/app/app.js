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
const educationBox = document.getElementById("edu-box");
const jobBox = document.getElementById("job-box");


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(languageBox.children);
    const languageInfos = [];
    for (const languageElem of languageBox.children) {
        languageInfos.push({
            language: languageElem.querySelector("input").value,
            skillLevel: 100 - languageElem.querySelector("select").value * (100.0 / 4.0)
        });
    }

    const educationInfos = [];
    for (const educationElem of educationBox.children) {
        educationInfos.push({
            education: educationElem.querySelectorAll('input[type="text"]')[0].value,
            institution: educationElem.querySelectorAll('input[type="text"]')[1].value,
            startDate: educationElem.querySelectorAll('input[type="date"]')[0].value,
            endDate: educationElem.querySelectorAll('input[type="date"]')[1].value,
        });
    }

    const jobInfos = [];
    for (const jobElem of jobBox.children) {
        jobInfos.push({
            job: jobElem.querySelectorAll('input[type="text"]')[0].value,
            firm: jobElem.querySelectorAll('input[type="text"]')[1].value,
            startDate: jobElem.querySelectorAll('input[type="date"]')[0].value,
            endDate: jobElem.querySelectorAll('input[type="date"]')[1].value,
        });
    }

    window.api.send('generate-cv', {
        templateIndex: templateSelect.options.selectedIndex,
        templateLanguage: languageSelect.value,
        name: document.getElementById("name-field").value,
        birthday: document.getElementById("birthday-field").value,
        email: document.getElementById("email-field").value,
        phonenumber: document.getElementById("phonenumber-field").value,
        address: document.getElementById("address-field").value,
        description: document.getElementById("description-field").value,
        languageInfos: languageInfos,
        educationInfos: educationInfos,
        jobInfos: jobInfos
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
    const template = createJobTemplate();
    jobBox.appendChild(template);
});
removeJobButton.addEventListener("click", () => {
    if (jobBox.lastElementChild === null) return;
    jobBox.removeChild(jobBox.lastElementChild);
});


const languageTemplate = document.getElementById("lang-template");
const createLanguageTemplate = () => {
    const template = languageTemplate.content.cloneNode(true);
    const select = template.querySelector("select");

    const skillLevels = ["Excellent", "Great", "Good", "Basics"];
    skillLevels.map((skillLevel, index) => {
        const option = document.createElement("option");
        option.value = index.toString();
        option.innerText = skillLevel;
        select.appendChild(option);
    });

    return template;
}


const educationTemplate = document.getElementById("edu-template");
const createEducationTemplate = () => {
    const template = educationTemplate.content.cloneNode(true);
    const dateFields = template.querySelectorAll('input[type="date"]');

    const today = new Date().toJSON().slice(0, 10);
    dateFields.forEach(dateField => {
        dateField.value = today; 
        dateField.max = today;
    });

    return template;
}


const jobTemplate = document.getElementById("job-template");
const createJobTemplate = () => {
    const template = jobTemplate.content.cloneNode(true);
    const dateFields = template.querySelectorAll('input[type="date"]');

    const today = new Date().toJSON().slice(0, 10);
    dateFields.forEach(dateField => {
        dateField.value = today; 
        dateField.max = today;
    });

    return template;
}