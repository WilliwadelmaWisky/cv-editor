const printButton = document.querySelector('button');
printButton.addEventListener("click", () => {
    printButton.style.display = 'none';
    window.api.send('print-pdf', null);
});

const nameField = document.getElementById("name-field");
const languageBox = document.getElementById("lang-box");

window.api.receive('get-data', data => {
    nameField.innerText = data.name;
    data.languageInfos.forEach(languageInfo => {
        const template = createLanguageTemplate(languageInfo);
        languageBox.appendChild(template);
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