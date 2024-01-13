const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let window;

const createWindow = () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    const appPath = path.join(__dirname, "app/app.html");
    window.removeMenu();
    window.loadFile(appPath);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

const getTemplates = (callback) => {
    const dirPath = path.join(__dirname, "app/templates/"); 
    fs.readdir(dirPath, (err, files) => callback(files))
}

ipcMain.on('request-templates', (event, ...args) => {
    getTemplates(files => window.webContents.send('send-templates', files));
})

let data = null;
ipcMain.on('generate-cv', (event, ...args) => {
    if (args.length <= 0) return;
    data = args[0];

    getTemplates(files => {
        const templateDir = files[data.templateIndex].substring(files[data.templateIndex].lastIndexOf('/') + 1);
        const htmlPath = path.join(__dirname, 'app/templates', templateDir, 'template.html');
        const window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js")
            }
        });

        window.removeMenu();
        window.loadFile(htmlPath);
        //window.webContents.openDevTools();
    })
})

ipcMain.on('print-pdf', (event, ...args) => {
    const window = BrowserWindow.getFocusedWindow();
    if (window === null) return;
    const filePath = path.join(__dirname, 'print.pdf');

    const options = {
        marginsType: 1,
        pageSize: 'A4',
        printBackground: true,
        printSelectionOnly: false,
        landscape: false
    };

    window.webContents.printToPDF(options).then(data => {
        fs.writeFile(filePath, data, error => {
            if (error) throw error;
         });
    }).catch(error => { });
})

ipcMain.on('request-data', (event, ...args) => {
    const window = BrowserWindow.getFocusedWindow();
    if (data === null) return;
    console.log(data);
    window.webContents.send('get-data', data);
})