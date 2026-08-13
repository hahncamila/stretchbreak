import { Card, CardContent, Typography } from "@mui/material";

interface StatsCardProps {
	completedBreaks: number;
	totalRestSeconds: number;
}

function formatTime(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	const paddedHours = String(hours).padStart(2, "0");
	const paddedMinutes = String(minutes).padStart(2, "0");
	const paddedSeconds = String(remainingSeconds).padStart(2, "0");

	return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export default function StatsCard({
	completedBreaks,
	totalRestSeconds,
}: StatsCardProps) {
	return (
		<Card>
			<CardContent>
				<Typography variant="h6">Hoje</Typography>

				<Typography>Pausas realizadas: {completedBreaks}</Typography>

				<Typography>
					Tempo descansado: {formatTime(totalRestSeconds)}
				</Typography>
			</CardContent>
		</Card>
	);
}
