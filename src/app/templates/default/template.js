const printButton = document.querySelector('button');
printButton.addEventListener("click", () => {
    printButton.style.display = 'none';
    window.api.send('print-pdf', null);
});