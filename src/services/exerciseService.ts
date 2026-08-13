import { exercises } from "../data/exercises";
import type { Exercise } from "../types/exercise";

export function getRandomExercise(
	excludedExerciseId?: string,
): Exercise {
	const availableExercises = excludedExerciseId
		? exercises.filter(
				(exercise) => exercise.id !== excludedExerciseId,
			)
		: exercises;

	if (availableExercises.length === 0) {
		return exercises[0];
	}

	const randomIndex = Math.floor(
		Math.random() * availableExercises.length,
	);

	return availableExercises[randomIndex];
}