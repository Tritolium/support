const { BrowserWindow, Menu } = require('electron')
const Window = require('./window')
/**
 * @type {BrowserWindow} reportDialog
 */
var mainWindow, reportDialog

module.exports.ViewHandler = {

    openMainWindow : function(){
        Menu.setApplicationMenu(null)
        mainwindow = new Window({
            height: 310,
            width: 300,
            file: require('path').join(__dirname, 'dialogs/index.html')
        })
    },

    openReportDialog : function(){
        reportDialog = new Window({
            height: 310,
            width: 300,
            file: require('path').join(__dirname, 'dialogs/report.html'),
            frame: false
        })
    },

    closeReportDialog : function(){
        reportDialog.close()
        reportDialog = null
    }
}

module.exports.ReportDialog = reportDialog