import type { Exercise } from "../types/exercise";

export const exercises: Exercise[] = [
	{
		id: "neck-1",
		title: "Alongamento lateral do pescoço",
		category: "neck",
		instructions: [
			"Mantenha os ombros relaxados.",
			"Faça o movimento lentamente.",
			"Não force o pescoço.",
		],
		phases: [
			{
				id: "right",
				label: "Lado direito",
				instruction:
					"Incline suavemente a cabeça em direção ao ombro direito.",
				durationInSeconds: 20,
			},
			{
				id: "left",
				label: "Lado esquerdo",
				instruction:
					"Incline suavemente a cabeça em direção ao ombro esquerdo.",
				durationInSeconds: 20,
			},
		],
	},
	{
		id: "shoulders-1",
		title: "Alongamento dos ombros",
		category: "shoulders",
		instructions: [
			"Mantenha a coluna confortável.",
			"Evite movimentos bruscos.",
			"Não force o braço.",
		],
		phases: [
			{
				id: "right",
				label: "Braço direito",
				instruction:
					"Leve o braço direito à frente do peito e apoie-o suavemente com o outro braço.",
				durationInSeconds: 20,
			},
			{
				id: "left",
				label: "Braço esquerdo",
				instruction:
					"Leve o braço esquerdo à frente do peito e apoie-o suavemente com o outro braço.",
				durationInSeconds: 20,
			},
		],
	},
	{
		id: "wrists-1",
		title: "Alongamento dos punhos",
		category: "wrists",
		instructions: [
			"Mantenha o cotovelo estendido sem forçar.",
			"Faça uma pressão leve sobre os dedos.",
			"Interrompa o movimento se sentir dor.",
		],
		phases: [
			{
				id: "right",
				label: "Punho direito",
				instruction:
					"Estenda o braço direito e puxe suavemente os dedos para trás.",
				durationInSeconds: 20,
			},
			{
				id: "left",
				label: "Punho esquerdo",
				instruction:
					"Estenda o braço esquerdo e puxe suavemente os dedos para trás.",
				durationInSeconds: 20,
			},
		],
	},
];