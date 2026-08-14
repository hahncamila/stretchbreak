import { Box, Button, Stack } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

interface ControlsProps {
	onStart: () => void;
	onPause: () => void;
	onReset: () => void;
}

const ICON_BUTTON_SIZE = 56;

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
				<Button
					variant="contained"
					startIcon={<PlayArrowRoundedIcon sx={{ fontSize: 28 }} />}
					onClick={onStart}
					sx={{
						height: ICON_BUTTON_SIZE,
						minWidth: 160,
						fontSize: "1rem",
					}}>
					Iniciar
				</Button>

				<Button
					variant="outlined"
					onClick={onPause}
					sx={{
						height: ICON_BUTTON_SIZE,
						width: ICON_BUTTON_SIZE,
						minWidth: ICON_BUTTON_SIZE,
						padding: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<PauseRoundedIcon sx={{ fontSize: 28 }} />
				</Button>

				<Button
					variant="outlined"
					onClick={onReset}
					sx={{
						height: ICON_BUTTON_SIZE,
						width: ICON_BUTTON_SIZE,
						minWidth: ICON_BUTTON_SIZE,
						padding: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#A97C1A",
						borderColor: "#A97C1A",
					}}>
					<RestartAltRoundedIcon sx={{ fontSize: 28 }} />
				</Button>
			</Box>
		</Stack>
	);
}
