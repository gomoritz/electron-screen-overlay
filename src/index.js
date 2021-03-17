const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const path = require('path')

let window
let screen

app.on(
    'ready',
    () =>
        setTimeout(() => {
            screen = electron.screen.getPrimaryDisplay()
            console.log(screen.size.width)
            console.log(screen.size.height)
            window = new BrowserWindow({
                x: 0,
                y: screen.size.height - 250,
                width: screen.size.width,
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

            window.setIgnoreMouseEvents(false)
            window.setFocusable(false)
            // window.webContents.toggleDevTools()

            window
                .loadFile(path.resolve(__dirname, 'index.html'))
                .then(() => window.show())
                .catch(console.error)
        }),
    0
)

ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
    BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args)
})

ipcMain.on('disable-confirm', () => {
    console.log('Disable received!')
    window.close()
})

// trigger termination in main process
setTimeout(() => {
    console.log('Timing out...')
    window.webContents.send('disable')
}, 5_000)
