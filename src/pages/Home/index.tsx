import { Container, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import TimerCard from "../../components/TimerCard";
import Controls from "../../components/Controls";
import StatsCard from "../../components/StatsCard";
import ExerciseModal from "../../components/ExerciseModal";
import { usePomodoro } from "../../hooks/usePomodoro";
import { formatTime } from "../../utils/formatTime";
import {
	requestNotificationPermission,
	showFocusNotification,
} from "../../services/notificationService";
import { getRandomExercise } from "../../services/exerciseService";
import type { Exercise } from "../../types/exercise";
import { useDailyStats } from "../../hooks/useDailyStats";

export default function Home() {
	const { timeLeft, start, pause, reset, sessionType } = usePomodoro();

	const previousSessionRef = useRef(sessionType);
	const sessionTypeRef = useRef(sessionType);
	const lastExerciseIdRef = useRef<string | undefined>(undefined);

	const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
	const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

	const skipNextFocusNotificationRef = useRef(false);

const { dailyStats, addCompletedBreak } = useDailyStats();

	const handleExerciseComplete = useCallback(() => {
		if (!currentExercise) {
			return;
		}

		const restSeconds = currentExercise.phases.reduce(
			(total, phase) => total + phase.durationInSeconds,
			0,
		);

		addCompletedBreak(restSeconds);

		setExerciseModalOpen(false);
		setCurrentExercise(null);

		window.electronAPI?.closeBreakOverlay();
	}, [currentExercise, addCompletedBreak]);
	/*
	 * Mantém disponível o valor atual da sessão
	 * para o callback vindo do Electron.
	 */
	useEffect(() => {
		sessionTypeRef.current = sessionType;
	}, [sessionType]);

	/*
	 * Executada somente quando a pessoa clicar
	 * na notificação de alongamento.
	 */
	const startBreakExercise = useCallback(() => {
		/*
		 * Impede a abertura caso a pessoa clique
		 * numa notificação antiga depois que
		 * a pausa já terminou.
		 */
		if (sessionTypeRef.current !== "break") {
			return;
		}

		const nextExercise = getRandomExercise(lastExerciseIdRef.current);

		lastExerciseIdRef.current = nextExercise.id;

		setCurrentExercise(nextExercise);
		setExerciseModalOpen(true);
	}, []);

	const closeBreakModal = useCallback(() => {
		setExerciseModalOpen(false);
		setCurrentExercise(null);

		window.electronAPI?.closeBreakOverlay();
	}, []);

	const handleStart = async () => {
		await requestNotificationPermission();
		start();
	};

	const handleReset = useCallback(() => {
		skipNextFocusNotificationRef.current = true;

		reset();

		setExerciseModalOpen(false);
		setCurrentExercise(null);

		window.electronAPI?.closeBreakOverlay();
	}, [reset]);

	/*
	 * Escuta os eventos enviados pelo processo
	 * principal do Electron.
	 */
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

	/*
	 * Detecta as mudanças entre foco e pausa.
	 */
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
			<Container maxWidth="sm">
				<Stack
					sx={{
						gap: 3,
						mt: 5,
					}}>
					<Typography
						variant="h3"
						sx={{
							textAlign: "center",
							color: "#6B7F1D",
							fontWeight: 600,
							fontSize: "2rem",
						}}>
						Pausa do alongamento
					</Typography>

					<TimerCard time={formatTime(timeLeft)} sessionType={sessionType} />

					<Controls
						onStart={handleStart}
						onPause={pause}
						onReset={handleReset}
					/>

					<StatsCard
						completedBreaks={dailyStats.completedBreaks}
						totalRestSeconds={dailyStats.totalRestSeconds}
					/>
				</Stack>
			</Container>

			{sessionType === "break" && exerciseModalOpen && currentExercise && (
				<ExerciseModal
					exercise={currentExercise}
					onComplete={handleExerciseComplete}
					onSkip={closeBreakModal}
				/>
			)}
		</>
	);
}
