import { Card, CardContent, Chip, Typography } from "@mui/material";

interface TimerCardProps {
	time: string;
	sessionType: string;
}

export default function TimerCard({ time, sessionType }: TimerCardProps) {
	return (
		<Card>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
				}}>
				<Chip
					label={sessionType === "focus" ? "FOCO" : "PAUSA"}
					color={sessionType === "focus" ? "primary" : undefined}
					sx={{
						mt: 2,
						textAlign: "center",
						fontSize: "2rem",
						letterSpacing: "0.4rem",
						padding: "10px",
						bgcolor: sessionType === "focus" ? undefined : "#A97C1A",
						color: sessionType === "focus" ? undefined : "#FFFFFF",
						fontWeight: 600,
					}}
				/>
				{/* <Typography variant="h6" sx={{ textAlign: "center", color: "#6B7F1D" }}>
					{sessionType === "focus" ? "Sessão de Foco" : "Hora da Pausa"}
				</Typography> */}

				<Typography
					sx={{
						mt: 2,
						fontSize: "2rem",
						fontWeight: 600,
						textAlign: "center",
						color: sessionType === "focus" ? "#6B7F1D" : "#A97C1A",
					}}>
					{time}
				</Typography>
			</CardContent>
		</Card>
	);
}
