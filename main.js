const {app, BrowserWindow} = require('electron')
const fs = require('fs')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,

    webPreferences: {
    }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html');

  setTimeout(() => {
    mainWindow.webContents.capturePage().then(image =>
    {
      //writing  image to the disk
      fs.writeFile(`./test.png`, image.toPNG(), (err) => {
        if (err) throw err
        console.log('Image Saved')
      })
    })
  }, 2000);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

