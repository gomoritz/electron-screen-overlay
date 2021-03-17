import electron, { app, BrowserWindow, ipcMain, Display } from 'electron'
const path = require('path')

let mainWindow
let primaryScreen: Display

app.on('ready', () =>
    setTimeout(() => {
        primaryScreen = electron.screen.getPrimaryDisplay()
        mainWindow = new BrowserWindow({
            x: 0,
            y: primaryScreen.size.height - 250,
            width: primaryScreen.size.width,
            height: 250,
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                contextIsolation: false,
            },
            transparent: true,
            frame: false,
            alwaysOnTop: true,
            show: false,
        })

        mainWindow.setIgnoreMouseEvents(false)
        mainWindow.setFocusable(false)
        // mainWindow.webContents.toggleDevTools()

        mainWindow
            .loadFile(path.resolve(__dirname, 'index.html'))
            .then(() => mainWindow.show())
            .catch(console.error)
    }, 0)
)

ipcMain.on('set-ignore-mouse-events', (event, args) => {
    BrowserWindow.fromWebContents(event.sender)!!.setIgnoreMouseEvents(args, {
        forward: true,
    })
})

ipcMain.on('disable-confirm', () => {
    console.log('Disable received!')
    mainWindow.close()
})

// trigger termination in main process
setTimeout(() => {
    console.log('Timing out...')
    mainWindow.webContents.send('disable')
}, 5_000)
