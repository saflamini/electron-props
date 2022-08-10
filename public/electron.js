const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    //Create a browswer window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://$${path.join(__dirname, '../build/index.html')}`
    );

    //open dev tools
    if (isDev) {
        win.webContents.openDevTools({
            mode: 'detach'
        })
    }
}

//This method will be called when electron has finished
//initialization and is ready to create browswer windows
//Some APIs can only be used after this event occurs
app.whenReady().then(createWindow);

//when windows are closed, we need to quit
//except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})