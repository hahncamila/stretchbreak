import { Container, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TimerCard from "../../components/TimerCard";
import Controls from "../../components/Controls";
import ExerciseModal from "../../components/ExerciseModal";
import { usePomodoro } from "../../hooks/usePomodoro";
import { formatTime } from "../../utils/formatTime";
import { BREAK_TIME_SECONDS, FOCUS_TIME_SECONDS } from "../../constants/timer";
import {
	requestNotificationPermission,
	showFocusNotification,
} from "../../services/notificationService";
import { getRandomExercise } from "../../services/exerciseService";
import type { Exercise } from "../../types/exercise";

export default function Home() {
	const { timeLeft, start, pause, reset, sessionType } = usePomodoro();

	const previousSessionRef = useRef(sessionType);
	const sessionTypeRef = useRef(sessionType);
	const lastExerciseIdRef = useRef<string | undefined>(undefined);

	const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
	const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

	const skipNextFocusNotificationRef = useRef(false);

	const totalSeconds =
		sessionType === "focus" ? FOCUS_TIME_SECONDS : BREAK_TIME_SECONDS;

	const progress = useMemo(
		() => ((totalSeconds - timeLeft) / totalSeconds) * 100,
		[totalSeconds, timeLeft],
	);

	const handleExerciseComplete = useCallback(() => {
		if (!currentExercise) {
			return;
		}

		setExerciseModalOpen(false);
		setCurrentExercise(null);

		window.electronAPI?.closeBreakOverlay();
	}, [currentExercise]);

	useEffect(() => {
		sessionTypeRef.current = sessionType;
	}, [sessionType]);

	useEffect(() => {
		if (previousSessionRef.current === sessionType) {
			return;
		}

		if (sessionType === "break") {
			window.electronAPI?.showBreakNotification();
		}

		if (sessionType === "focus") {
			if (skipNextFocusNotificationRef.current) {
				skipNextFocusNotificationRef.current = false;
			} else {
				showFocusNotification();
				window.electronAPI?.closeBreakOverlay();
			}
		}

		previousSessionRef.current = sessionType;
	}, [sessionType]);

	const startBreakExercise = useCallback(() => {
		if (sessionTypeRef.current !== "break") {
			return;
		}

		const nextExercise = getRandomExercise(lastExerciseIdRef.current);

		lastExerciseIdRef.current = nextExercise.id;

		setCurrentExercise(nextExercise);
		setExerciseModalOpen(true);
	}, []);

	const closeExerciseModal = useCallback(() => {
		setExerciseModalOpen(false);
	}, []);

	const handleStart = async () => {
		await requestNotificationPermission();
		start();
	};

	const handleReset = useCallback(() => {
		skipNextFocusNotificationRef.current = true;
		reset();
		setCurrentExercise(null);
	}, [reset]);

	useEffect(() => {
		const removeStartListener =
			window.electronAPI?.onStartBreakExercise(startBreakExercise);

		const removeCloseListener = window.electronAPI?.onCloseBreakExercise(() => {
			setExerciseModalOpen(false);
			setCurrentExercise(null);
		});

		return () => {
			removeStartListener?.();
			removeCloseListener?.();
		};
	}, [startBreakExercise]);

	useEffect(() => {
		if (previousSessionRef.current === sessionType) {
			return;
		}

		if (sessionType === "break") {
			window.electronAPI?.showBreakNotification();
		}

		if (sessionType === "focus") {
			if (skipNextFocusNotificationRef.current) {
				skipNextFocusNotificationRef.current = false;
			} else {
				showFocusNotification();
			}

			window.electronAPI?.closeBreakOverlay();
		}

		previousSessionRef.current = sessionType;
	}, [sessionType]);

	return (
		<>
			<Container
				maxWidth="sm"
				sx={{
					height: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Stack
					sx={{
						gap: 3,
						alignItems: "center",
						width: "100%",
					}}>
					<Typography
						variant="h2"
						sx={{
							textAlign: "center",
							color: "#6B7F1D",
							fontWeight: 600,
							fontSize: "1.6rem",
						}}>
						Pausa do alongamento
					</Typography>

					<TimerCard
						time={formatTime(timeLeft)}
						sessionType={sessionType}
						progress={progress}
					/>

					<Controls
						onStart={handleStart}
						onPause={pause}
						onReset={handleReset}
					/>
				</Stack>
			</Container>

			{sessionType === "break" && exerciseModalOpen && currentExercise && (
				<ExerciseModal
					exercise={currentExercise}
					onComplete={handleExerciseComplete}
					onSkip={closeExerciseModal}
				/>
			)}
		</>
	);
}
