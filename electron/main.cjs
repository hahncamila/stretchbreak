if (require("electron-squirrel-startup")) {
	process.exit(0);
}

const {
	app,
	BrowserWindow,
	ipcMain,
	Notification,
	Tray,
	Menu,
	nativeImage,
} = require("electron");

const path = require("node:path");

let mainWindow = null;
let breakNotification = null;
let tray = null;
let isQuitting = false;

const isDevelopment =
	process.argv.includes("--dev");

const PRODUCTION_APP_ID =
	"com.squirrel.StretchBreak.StretchBreak";

const iconPath = path.join(
	__dirname,
	"assets",
	"icon.ico",
);

/*
 * No desenvolvimento, o executável real é
 * electron.exe. Na aplicação instalada,
 * utiliza o ID próprio do StretchBreak.
 */
const windowsAppId = isDevelopment
	? process.execPath
	: PRODUCTION_APP_ID;

function loadAppIcon() {
	const appIcon =
		nativeImage.createFromPath(iconPath);

	if (appIcon.isEmpty()) {
		console.error(
			"Não foi possível carregar o ícone:",
			iconPath,
		);

		return null;
	}

	console.log(
		"Ícone carregado corretamente:",
		iconPath,
	);

	return appIcon;
}

function createMainWindow() {
	const appIcon = loadAppIcon();

	mainWindow = new BrowserWindow({
		width: 960,
		height: 720,
		minWidth: 700,
		minHeight: 600,
		show: false,
		center: true,
		autoHideMenuBar: true,
		icon: appIcon ?? iconPath,

		webPreferences: {
			preload: path.join(
				__dirname,
				"preload.cjs",
			),
			contextIsolation: true,
			nodeIntegration: false,

			/*
			 * Mantém o timer ativo quando
			 * a janela está escondida.
			 */
			backgroundThrottling: false,
		},
	});

	if (appIcon) {
		mainWindow.setIcon(appIcon);
	}

	/*
	 * Configura a identidade visual e o nome
	 * da janela na versão instalada do Windows.
	 */
	if (process.platform === "win32") {
		mainWindow.setAppDetails({
			appId: windowsAppId,
			appIconPath: iconPath,
			appIconIndex: 0,
			relaunchDisplayName:
				"StretchBreak",
		});
	}

	if (isDevelopment) {
		mainWindow.loadURL(
			"http://localhost:5173",
		);
	} else {
		mainWindow.loadFile(
			path.join(
				__dirname,
				"../dist/index.html",
			),
		);
	}

	mainWindow.once("ready-to-show", () => {
		if (
			!mainWindow ||
			mainWindow.isDestroyed()
		) {
			return;
		}

		mainWindow.setSkipTaskbar(false);
		mainWindow.show();
	});

	/*
	 * O botão X esconde a aplicação,
	 * mas mantém o timer funcionando.
	 */
	mainWindow.on("close", (event) => {
		if (isQuitting) {
			return;
		}

		event.preventDefault();
		hideMainWindow();
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

function showMainWindow() {
	if (
		!mainWindow ||
		mainWindow.isDestroyed()
	) {
		createMainWindow();
		return;
	}

	mainWindow.setAlwaysOnTop(false);
	mainWindow.setSkipTaskbar(false);

	if (mainWindow.isMinimized()) {
		mainWindow.restore();
	}

	mainWindow.show();
	mainWindow.focus();
}

function hideMainWindow() {
	if (
		!mainWindow ||
		mainWindow.isDestroyed()
	) {
		return;
	}

	mainWindow.setAlwaysOnTop(false);
	mainWindow.flashFrame(false);
	mainWindow.setSkipTaskbar(true);
	mainWindow.hide();
}

function createTray() {
	if (tray) {
		return;
	}

	const trayIcon = loadAppIcon();

	if (!trayIcon) {
		return;
	}

	tray = new Tray(trayIcon);

	const contextMenu =
		Menu.buildFromTemplate([
			{
				label: "Abrir StretchBreak",
				click: () => {
					showMainWindow();
				},
			},
			{
				type: "separator",
			},
			{
				label: "Sair",
				click: () => {
					isQuitting = true;
					app.quit();
				},
			},
		]);

	tray.setToolTip("StretchBreak");
	tray.setContextMenu(contextMenu);

	tray.on("click", () => {
		showMainWindow();
	});
}

function showBreakOverlay() {
	if (
		!mainWindow ||
		mainWindow.isDestroyed()
	) {
		return;
	}

	mainWindow.setSkipTaskbar(false);

	if (mainWindow.isMinimized()) {
		mainWindow.restore();
	}

	mainWindow.setAlwaysOnTop(
		true,
		"screen-saver",
	);

	mainWindow.showInactive();
	mainWindow.moveTop();

	setTimeout(() => {
		if (
			!mainWindow ||
			mainWindow.isDestroyed()
		) {
			return;
		}

		mainWindow.setAlwaysOnTop(
			true,
			"screen-saver",
		);

		mainWindow.moveTop();
	}, 150);
}

function closeCurrentBreakNotification() {
	if (!breakNotification) {
		return;
	}

	breakNotification.close();
	breakNotification = null;
}

function startBreakExercise() {
	closeCurrentBreakNotification();
	showBreakOverlay();

	if (
		!mainWindow ||
		mainWindow.isDestroyed()
	) {
		return;
	}

	mainWindow.webContents.send(
		"break-exercise:start",
	);
}

function showBreakNotification() {
	console.log(
		"Solicitação recebida para exibir a notificação.",
	);

	if (!Notification.isSupported()) {
		console.warn(
			"Notificações não são suportadas.",
		);

		return;
	}

	closeCurrentBreakNotification();

	let notificationHandled = false;

	const notification = new Notification({
		title: "Hora da pausa",
		body:
			"Levante-se por alguns minutos e faça um alongamento.",
		icon: iconPath,

		actions: [
			{
				type: "button",
				text: "Iniciar alongamento",
			},
		],

		timeoutType: "never",
	});

	breakNotification = notification;

	const handleStartExercise = () => {
		if (notificationHandled) {
			return;
		}

		notificationHandled = true;
		startBreakExercise();
	};

	/*
	 * Apenas o botão da notificação inicia
	 * o alongamento.
	 */
	notification.on("action", (event) => {
		if (event.actionIndex === 0) {
			handleStartExercise();
		}
	});

	notification.on("show", () => {
		console.log(
			"Notificação exibida com sucesso.",
		);
	});

	notification.on("close", (event) => {
		console.log(
			"Notificação fechada:",
			event.reason,
		);

		if (
			breakNotification ===
			notification
		) {
			breakNotification = null;
		}
	});

	notification.on(
		"failed",
		(_event, error) => {
			console.error(
				"Erro ao mostrar notificação:",
				error,
			);
		},
	);

	notification.show();
}

function closeBreakOverlay() {
	closeCurrentBreakNotification();

	if (
		!mainWindow ||
		mainWindow.isDestroyed()
	) {
		return;
	}

	mainWindow.webContents.send(
		"break-exercise:close",
	);

	hideMainWindow();
}

app.whenReady().then(() => {
	/*
	 * A identidade precisa ser configurada
	 * antes das notificações e da janela.
	 */
	if (process.platform === "win32") {
		app.setAppUserModelId(windowsAppId);
	}

	ipcMain.on(
		"break-notification:show",
		showBreakNotification,
	);

	ipcMain.on(
		"break-overlay:close",
		closeBreakOverlay,
	);

	createMainWindow();
	createTray();

	app.on("activate", () => {
		showMainWindow();
	});
});

app.on("before-quit", () => {
	isQuitting = true;
	closeCurrentBreakNotification();
});

app.on("window-all-closed", () => {
	/*
	 * O app continua ativo no Tray.
	 * Só encerra pela opção "Sair".
	 */
});