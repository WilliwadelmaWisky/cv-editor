const printButton = document.querySelector('button');
printButton.addEventListener("click", () => {
    printButton.style.display = 'none';
    window.api.send('print-pdf', null);
});

const nameField = document.getElementById("name-field");
const addressField = document.getElementById("address-field");
const emailField = document.getElementById("email-field");
const phoneField = document.getElementById("phone-field");
const birthdayField = document.getElementById("birthday-field");
const descriptionField = document.getElementById("desc-field");

const languageBox = document.getElementById("lang-box");
const educationBox = document.getElementById("edu-box");
const jobBox = document.getElementById("job-box");

window.api.receive('get-data', data => {
    nameField.innerText = data.name;
    birthdayField.innerText = data.birthday;
    emailField.innerText = data.email;
    phoneField.innerText = data.phonenumber;
    addressField.innerText = data.address;
    descriptionField.innerText = data.description;

    data.languageInfos.forEach(languageInfo => {
        const template = createLanguageTemplate(languageInfo);
        languageBox.appendChild(template);
    });

    data.educationInfos.forEach(educationInfo => {
        const template = createEducationTemplate(educationInfo);
        educationBox.appendChild(template);
    });

    data.jobInfos.forEach(jobInfo => {
        const template = createJobTemplate(jobInfo);
        jobBox.appendChild(template);
    });
});
window.api.send('request-data', null);


const langTemplate = document.getElementById("lang-template");
const createLanguageTemplate = (languageInfo) => {
    const template = langTemplate.content.cloneNode(true);
    template.querySelector('p').innerText = languageInfo.language;
    template.querySelector('progress').value = languageInfo.skillLevel;
    return template;
}


const educationTemplate = document.getElementById("edu-template");
const createEducationTemplate = (educationInfo) => {
    const template = educationTemplate.content.cloneNode(true);
    const p = template.querySelectorAll("p");
    p[0].innerText = `${educationInfo.education} - ${educationInfo.endDate}`;
    p[1].innerText = educationInfo.institute;
    return template;
}


const jobTemplate = document.getElementById("job-template");
const createJobTemplate = (jobInfo) => {
    const template = jobTemplate.content.cloneNode(true);
    const p = template.querySelectorAll("p");
    p[0].innerText = `${jobInfo.firm} / ${jobInfo.job}`;
    p[1].innerText = `${jobInfo.startDate} - ${jobInfo.endDate}`;
    p[2].innerText = "Description not set";
    return template;
}