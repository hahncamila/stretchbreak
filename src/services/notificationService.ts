export async function requestNotificationPermission() {
	if (!("Notification" in window)) {
		return;
	}

	if (Notification.permission === "default") {
		await Notification.requestPermission();
	}
}

export function showBreakNotification() {
	if (Notification.permission !== "granted") {
		return;
	}

	new Notification("🎉 Hora da pausa!", {
		body: "Levante-se e faça um alongamento.",
	});
}

export function showFocusNotification() {
	if (Notification.permission !== "granted") {
		return;
	}

	new Notification("💻 Hora de voltar!", {
		body: "Vamos iniciar mais uma sessão de foco.",
	});
}