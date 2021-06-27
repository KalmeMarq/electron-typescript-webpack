import { app, BrowserWindow } from 'electron'
import path from 'path'

class Main {
  public static winURL = 'http://localhost:9080'
  public static winPath = './dist/index.html'
  public static mainWindow: BrowserWindow

  public static main(): void {
    app.on('ready', (): void => {
      Main.createWindow()
    })

    app.on('activate', function () {
      if(BrowserWindow.getAllWindows().length === 0) {
        Main.createWindow()
      }
    })
    
    app.on('window-all-closed', function () {
      if(process.platform !== 'darwin') {
        app.quit()
      }
    })
  }

  public static createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      title: 'AppName',
      icon: './dist/assets/icon.png',
      center: true,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false
      }
    })

    if(process.env.NODE_ENV === 'development') this.mainWindow.loadURL(Main.winURL)
    else this.mainWindow.loadFile(Main.winPath)

    // this.mainWindow.removeMenu()
  }
}

Main.main()