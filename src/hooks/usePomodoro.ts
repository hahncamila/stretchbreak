import { useEffect, useState } from "react";
import {
	BREAK_TIME_SECONDS,
	FOCUS_TIME_SECONDS,
} from "../constants/timer";
import type { SessionType } from "../types/timer";

export function usePomodoro() {
	const [timeLeft, setTimeLeft] = useState(
		FOCUS_TIME_SECONDS,
	);

	const [isRunning, setIsRunning] = useState(false);

	const [sessionType, setSessionType] =
		useState<SessionType>("focus");

	useEffect(() => {
		if (!isRunning) {
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((currentTimeLeft) => {
				if (currentTimeLeft > 1) {
					return currentTimeLeft - 1;
				}

				// Quando o FOCO termina
				if (sessionType === "focus") {
					setSessionType("break");

					return BREAK_TIME_SECONDS;
				}

				// Quando a PAUSA termina
				setSessionType("focus");

				return FOCUS_TIME_SECONDS;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning, sessionType]);

	const start = () => {
		setIsRunning(true);
	};

	const pause = () => {
		setIsRunning(false);
	};

	const reset = () => {
		setIsRunning(false);
		setSessionType("focus");
		setTimeLeft(FOCUS_TIME_SECONDS);
	};

	return {
		sessionType,
		timeLeft,
		isRunning,
		start,
		pause,
		reset,
	};
}