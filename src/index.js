const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');

let window;
let screen;

app.on(
	'ready',
	() =>
		setTimeout(() => {
			const NODE_ENV = process.env.NODE_ENV;
			screen = electron.screen.getPrimaryDisplay();
			console.log(screen.size.width);
			window = new BrowserWindow({
				// width: screen.size.width,
				// height: screen.size.height,
				width: screen.size.width,
				height: screen.size.height,
				webPreferences: {
					devTools: true,
					nodeIntegration: true,
					contextIsolation: false
				},
				transparent: true,
				frame: false,
				alwaysOnTop: NODE_ENV === 'development' ? false : true,
				show: false
			});
			if (NODE_ENV !== 'development') {
				// window.setIgnoreMouseEvents(true);
				window.setFocusable(false);
			}

			window
				.loadFile(path.resolve(__dirname, 'index.html'))
				.then(() => window.show())
				.catch(console.error);
		}),
	0
);

ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
	BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args);
});

ipcMain.on('disable-confirm', () => {
	console.log('Disable received!');
	window.close();
});

// trigger termination in main process
setTimeout(() => {
	window.webContents.send('disable');
}, 30_000);
