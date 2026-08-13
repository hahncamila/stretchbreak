import { Box, Button, Stack } from "@mui/material";

interface ControlsProps {
	onStart: () => void;
	onPause: () => void;
	onReset: () => void;
}

export default function Controls({ onStart, onPause, onReset }: ControlsProps) {
	return (
		<Stack
			sx={{
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: 2,
			}}>
			<Box
				sx={{
					display: "flex",
					gap: 2,
				}}>
				<Button variant="contained" onClick={onStart}>
					Iniciar
				</Button>

				<Button variant="outlined" onClick={onPause}>
					Pausar
				</Button>
			</Box>

			<Button variant="outlined" sx={{ color: "#A97C1A" }} onClick={onReset}>
				Resetar
			</Button>
		</Stack>
	);
}
