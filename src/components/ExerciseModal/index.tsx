import { useEffect, useState } from "react";
import {
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	LinearProgress,
	Stack,
	Typography,
} from "@mui/material";

import type { Exercise } from "../../types/exercise";

interface ExerciseModalProps {
	exercise: Exercise;
	onComplete: () => void;
	onSkip: () => void;
}

interface ExerciseTimerState {
	phaseIndex: number;
	secondsLeft: number;
	completed: boolean;
}

export default function ExerciseModal({
	exercise,
	onComplete,
	onSkip,
}: ExerciseModalProps) {
	const [timer, setTimer] = useState<ExerciseTimerState>(() => ({
		phaseIndex: 0,
		secondsLeft: exercise.phases[0]?.durationInSeconds ?? 0,
		completed: exercise.phases.length === 0,
	}));

	const currentPhase = exercise.phases[timer.phaseIndex];

	useEffect(() => {
		if (timer.completed) {
			return;
		}

		const intervalId = window.setInterval(() => {
			setTimer((previousTimer) => {
				if (previousTimer.completed) {
					return previousTimer;
				}

				if (previousTimer.secondsLeft > 1) {
					return {
						...previousTimer,
						secondsLeft: previousTimer.secondsLeft - 1,
					};
				}

				const nextPhaseIndex = previousTimer.phaseIndex + 1;
				const nextPhase = exercise.phases[nextPhaseIndex];

				if (nextPhase) {
					return {
						phaseIndex: nextPhaseIndex,
						secondsLeft: nextPhase.durationInSeconds,
						completed: false,
					};
				}

				return {
					...previousTimer,
					secondsLeft: 0,
					completed: true,
				};
			});
		}, 1000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [exercise.phases, timer.completed]);

	const totalDuration = exercise.phases.reduce(
		(total, phase) => total + phase.durationInSeconds,
		0,
	);

	const completedPreviousPhases = exercise.phases
		.slice(0, timer.phaseIndex)
		.reduce((total, phase) => total + phase.durationInSeconds, 0);

	const currentPhaseElapsed = currentPhase
		? currentPhase.durationInSeconds - timer.secondsLeft
		: 0;

	const elapsedTime = timer.completed
		? totalDuration
		: completedPreviousPhases + currentPhaseElapsed;

	const progress = totalDuration > 0 ? (elapsedTime / totalDuration) * 100 : 0;

	return (
		<Dialog open onClose={onSkip} maxWidth="xs" fullWidth>
			<DialogContent>
				<Stack
					sx={{
						gap: 2,
						pt: 1,
					}}>
					<Typography
						variant="h5"
						sx={{
							fontWeight: 600,
							textAlign: "center",
							color: "#788A17",
						}}>
						{exercise.title}
					</Typography>

					{timer.completed ? (
						<>
							<Chip
								label="Alongamento concluído"
								color="success"
								sx={{
									alignSelf: "center",
								}}
							/>

							<Typography
								variant="h4"
								sx={{
									textAlign: "center",
								}}>
								Concluído
							</Typography>
						</>
					) : (
						<>
							<Chip
								label={currentPhase?.label}
								sx={{
									alignSelf: "center",
								}}
							/>

							<Typography
								variant="h2"
								sx={{
									fontWeight: 700,
									textAlign: "center",
									color: "#788A17",
								}}>
								{timer.secondsLeft}s
							</Typography>

							<Typography
								sx={{
									textAlign: "center",
								}}>
								{currentPhase?.instruction}
							</Typography>
						</>
					)}

					<LinearProgress
						variant="determinate"
						value={progress}
						sx={{
							height: 10,
							borderRadius: 5,
						}}
					/>

					<Stack
						sx={{
							gap: 1,
							mt: 1,
						}}>
						{exercise.instructions.map((instruction) => (
							<Typography key={instruction}>• {instruction}</Typography>
						))}
					</Stack>
				</Stack>
			</DialogContent>

			<DialogActions
				sx={{
					p: 3,
					pt: 1,
				}}>
				<Button variant="outlined" onClick={onSkip}>
					Pular
				</Button>

				<Button
					variant="contained"
					disabled={!timer.completed}
					onClick={onComplete}>
					Concluir
				</Button>
			</DialogActions>
		</Dialog>
	);
}
