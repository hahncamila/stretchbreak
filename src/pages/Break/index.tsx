import {
	Card,
	CardContent,
	Container,
	Typography,
	Button,
	Stack,
} from "@mui/material";

import { getRandomExercise } from "../../services/exerciseService";

export default function Break() {
	const exercise = getRandomExercise();

	return (
		<Container maxWidth="sm">
			<Card>
				<CardContent>
					<Typography variant="h5">Hora da Pausa 🎉</Typography>

					<Typography
						sx={{
							mt: 2,
							fontWeight: 600,
						}}>
						{exercise.title}
					</Typography>
					<Stack
						sx={{
							mt: 2,
							gap: 1,
						}}>
						{exercise.instructions.map((instruction) => (
							<Typography key={instruction}>• {instruction}</Typography>
						))}
					</Stack>

					<Button
						variant="contained"
						sx={{
							mt: 3,
						}}>
						Concluído
					</Button>
				</CardContent>
			</Card>
		</Container>
	);
}
