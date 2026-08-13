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
			setTimeLeft((currentTimeLeft) =>
				currentTimeLeft - 1,
			);
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning]);

	useEffect(() => {
		if (timeLeft > 0) {
			return;
		}

		if (sessionType === "focus") {
			setSessionType("break");
			setTimeLeft(BREAK_TIME_SECONDS);
			return;
		}

		setSessionType("focus");
		setTimeLeft(FOCUS_TIME_SECONDS);
	}, [timeLeft, sessionType]);

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