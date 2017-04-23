'use strict';
const { app, BrowserWindow, webContents, Menu } = require('electron')

let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 1920,
		minWidth: 500,
		height: 1080,
		minHeight: 700,
		title: "Tootee",
		backgroundColor: '#2e2c29',
		webPreferences: {
			nodeIntegration: false
		}
	});

	win.loadURL('https://mstdn.awa.sfc.keio.ac.jp');
	win.on('closed', onClosed);

	return win;
}

function reload() {
	createMainWindow();
}

function openLinks(url) {
	const openNewWindow = new BrowserWindow({ show: false });
	openNewWindow.once('ready-to-show', () => openNewWindow.show());
	openNewWindow.loadURL(url);
}

function CreateMenu() {
	let template;

	template = [
		{
			label: 'Tootee',
			submenu: [
				{ label: "About Application", selector: "orderFrontStandardAboutPanel:" },
				{ type: "separator" },
				{
					label: 'ProfileSettings',
					accelerator: 'Command+,',
					click: function () { openLinks("https://mstdn.awa.sfc.keio.ac.jp/settings/preferences"); }
				},
				{ type: "separator" },
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function () { app.quit(); }
				},
			]
		}, {
			label: "Edit",
			submenu: [
				{
					label: "Undo",
					accelerator: "CmdOrCtrl+Z",
					selector: "undo:"
				},
				{
					label: "Redo",
					accelerator: "Shift+CmdOrCtrl+Z",
					selector: "redo:"
				},
				{ type: "separator" },
				{
					label: "Cut",
					accelerator: "CmdOrCtrl+X",
					selector: "cut:"
				},
				{
					label: "Copy",
					accelerator: "CmdOrCtrl+C",
					selector: "copy:"
				},
				{
					label: "Paste",
					accelerator: "CmdOrCtrl+V",
					selector: "paste:"
				},
				{
					label: "Select All",
					accelerator: "CmdOrCtrl+A",
					selector: "selectAll:"
				}
			]
		}, {
			label: "Window",
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: function () { reload(); }
				},
				{
					type: 'separator',
				},
				{
					role: 'resetzoom',
				},
				{
					role: 'zoomin',
				},
				{
					role: 'zoomout',
				},
				{
					type: 'separator',
				},
				{
					role: 'togglefullscreen',
				}
			]
		}, {
			label: "Help",
			submenu: [
				{
					label: 'Update Software',
					click: function () { openLinks("https://github.com/syaro/tootee/releases"); }
				},
				{ type: "separator" },
				{
					label: 'Send Feedback',
					click: function () { openLinks("https://mstdn.awa.sfc.keio.ac.jp/@syaro"); }
				}
			]
		}
	];

	const menu = new Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu);
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	CreateMenu();
});
