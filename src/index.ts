import electron, { app, BrowserWindow, ipcMain, Display } from 'electron'
const path = require('path')

let mainWindow: BrowserWindow
let primaryScreen: Display

app.on('ready', () =>
    setTimeout(() => {
        primaryScreen = electron.screen.getPrimaryDisplay()
        mainWindow = new BrowserWindow({
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                contextIsolation: false,
            },
            fullscreen: true,
            alwaysOnTop: true,
            transparent: true,
            frame: false,
            show: false
        })

        mainWindow.setIgnoreMouseEvents(true)
        mainWindow.setFocusable(false)

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
