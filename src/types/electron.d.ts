export {};

declare global {
	interface Window {
		electronAPI?: {
			isElectron: boolean;

			showBreakNotification: () => void;

			closeBreakOverlay: () => void;

			onStartBreakExercise: (
				callback: () => void,
			) => () => void;

			onCloseBreakExercise: (
				callback: () => void,
			) => () => void;
		};
	}
}