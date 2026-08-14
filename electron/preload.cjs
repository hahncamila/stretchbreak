const {
	contextBridge,
	ipcRenderer,
} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	isElectron: true,

	showBreakNotification: () => {
	ipcRenderer.send(
		"break-notification:show",
	);
},

	closeBreakOverlay: () => {
		ipcRenderer.send(
			"break-overlay:close",
		);
	},

	onStartBreakExercise: (callback) => {
		const listener = () => {
			callback();
		};

		ipcRenderer.on(
			"break-exercise:start",
			listener,
		);

		return () => {
			ipcRenderer.removeListener(
				"break-exercise:start",
				listener,
			);
		};
	},

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