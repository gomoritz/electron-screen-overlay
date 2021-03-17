const { ipcRenderer } = require('electron');

// setTimeout(() => {}, 7_000);

const main = document.getElementById('main');
ipcRenderer.on('disable', () => {
	console.log('Disable received');
	disable();
});

const innerCircle = document.getElementById('inner-circle');

// trigger termination from window
innerCircle.addEventListener('click', () => disable());

// not the best solution, but works!
window.addEventListener('mousemove', e => {
	if (e.target === innerCircle) {
		console.log('Inner circle is the target!!');
		ipcRenderer.send('set-ignore-mouse-events', false, { forward: true });
	} else {
		ipcRenderer.send('set-ignore-mouse-events', true, { forward: true });
	}
});

function disable() {
	main.classList.add('fade-out');
	const listener = main.addEventListener('animationend', () => {
		console.log('Animation-end triggered.');
		ipcRenderer.send('disable-confirm');
	});
	main.removeEventListener('animationend', listener);
}
