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


const createLanguageTemplate = (languageInfo) => {
    const template = document.createElement("div");
    template.className = "d-flex flex-direction-row align-items-center gap-half";

    const label = document.createElement("p");
    label.className = "w-5em";
    label.innerText = languageInfo.language;
    template.appendChild(label);

    const progressbar = document.createElement("div");
    progressbar.className = "progressbar flex-grow";
    template.appendChild(progressbar);

    const progressbarFill = document.createElement("div");
    progressbarFill.className = `progressbar-fill w-${languageInfo.skillLevel}`;
    progressbar.appendChild(progressbarFill);

    return template;
}

/*
<div class="d-flex flex-direction-row align-items-center gap-half">
    <p class="w-5em">Language 1</p>
    <div class="progressbar flex-grow">
        <div class="progressbar-fill w-50"></div>
    </div>
</div>
*/