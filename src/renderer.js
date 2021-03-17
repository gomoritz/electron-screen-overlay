const { ipcRenderer } = require('electron')

const main = document.querySelector('.main')
ipcRenderer.on('disable', () => {
    console.log('Disable received')
    disable()
})

const circle = document.querySelector('.circle')
const innerCircle = document.querySelector('.inner-circle')

// trigger termination from window
circle.addEventListener('click', () => disable())

// not the best solution, but works!
window.addEventListener('mousemove', (e) => {
    if (e.target === innerCircle) {
        console.log('Inner circle is the target!!')
        ipcRenderer.send('set-ignore-mouse-events', false, { forward: true })
    } else {
        ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
    }
})

function disable() {
    main.classList.add('dismiss')
    circle.classList.add('dismiss-circle')
    innerCircle.classList.add('dismiss-inner-circle')

    setTimeout(() => ipcRenderer.send('disable-confirm'), 2000)
}
