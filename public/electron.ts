import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow;

const isDev = true

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        kiosk: !isDev,
        resizable: true,
        fullscreen: false,
        fullscreenable: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: isDev,
        },
    })

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    mainWindow.setResizable(true)
    mainWindow.setMenuBarVisibility(false)

    mainWindow.on('closed', () => (mainWindow = undefined!))
    mainWindow.focus()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
