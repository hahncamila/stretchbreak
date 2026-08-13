export type ExerciseCategory =
	| "neck"
	| "shoulders"
	| "back"
	| "wrists"
	| "legs";

export interface ExercisePhase {
	id: string;
	label: string;
	instruction: string;
	durationInSeconds: number;
}

export interface Exercise {
	id: string;
	title: string;
	category: ExerciseCategory;
	instructions: string[];
	phases: ExercisePhase[];
}