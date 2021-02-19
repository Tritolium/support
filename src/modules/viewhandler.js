const { BrowserWindow } = require('electron')
const Window = require('./window')
/**
 * @type {BrowserWindow} reportDialog
 */
var reportDialog

module.exports.ViewHandler = {

    openReportDialog : function(){
        reportDialog = new Window({
            height: 310,
            width: 300,
            file: require('path').join(__dirname, 'dialogs/report.html'),
            frame: false
        })
    },

    closeReportDialog : function(){
        console.log('close')
        reportDialog.close()
        reportDialog = null
    }
}

module.exports.ReportDialog = reportDialog