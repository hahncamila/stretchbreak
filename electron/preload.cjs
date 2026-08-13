const {
	contextBridge,
	ipcRenderer,
} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	isElectron: true,

	// Solicita ao processo principal que mostre
	// a notificação nativa da pausa.
	showBreakNotification: () => {
	ipcRenderer.send(
		"break-notification:show",
	);
},

	// Fecha o exercício, remove o alwaysOnTop
	// e minimiza a janela.
	closeBreakOverlay: () => {
		ipcRenderer.send(
			"break-overlay:close",
		);
	},

	// Chamado quando o utilizador clica
	// na notificação ou no botão do alongamento.
	onStartBreakExercise: (callback) => {
		const listener = () => {
			callback();
		};

		ipcRenderer.on(
			"break-exercise:start",
			listener,
		);

		// Retorna uma função para remover o listener.
		return () => {
			ipcRenderer.removeListener(
				"break-exercise:start",
				listener,
			);
		};
	},

	// Chamado quando o processo principal
	// solicita o fechamento do modal.
	onCloseBreakExercise: (callback) => {
		const listener = () => {
			callback();
		};

		ipcRenderer.on(
			"break-exercise:close",
			listener,
		);

		return () => {
			ipcRenderer.removeListener(
				"break-exercise:close",
				listener,
			);
		};
	},
});