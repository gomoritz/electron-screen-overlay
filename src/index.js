const electron = require("electron")
const { app, BrowserWindow } = electron

let window;
let screen;

app.on("ready", () => setTimeout(() => {
    screen = electron.screen.getPrimaryDisplay()
    window = new BrowserWindow({
        width: screen.size.width,
        height: screen.size.height,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        show: false
    })
    window.setIgnoreMouseEvents(true)
    window.setFocusable(false)

    window.loadFile("src/index.html")
        .then(() => window.show())
        .catch(console.error)
}, 0))

setTimeout(() => {
    window.close()
}, 10_000)