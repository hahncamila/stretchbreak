import { Box, Chip, Typography } from "@mui/material";

interface TimerCardProps {
	time: string;
	sessionType: string;
	progress?: number;
}

const RING_SIZE = 200;
const RING_STROKE = 10;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function TimerCard({
	time,
	sessionType,
	progress = 0,
}: TimerCardProps) {
	const accentColor = sessionType === "focus" ? "#6B7F1D" : "#A97C1A";
	const clampedProgress = Math.min(100, Math.max(0, progress));
	const dashOffset =
		RING_CIRCUMFERENCE - (clampedProgress / 100) * RING_CIRCUMFERENCE;

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
					py: 4,
				}}>
				<Box
					sx={{
						position: "relative",
						width: RING_SIZE,
						height: RING_SIZE,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<svg
						width={RING_SIZE}
						height={RING_SIZE}
						viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							transform: "rotate(-90deg)",
						}}>
						<circle
							cx={RING_SIZE / 2}
							cy={RING_SIZE / 2}
							r={RING_RADIUS}
							fill="none"
							stroke="#E7DFC9"
							strokeWidth={RING_STROKE}
						/>
						<circle
							cx={RING_SIZE / 2}
							cy={RING_SIZE / 2}
							r={RING_RADIUS}
							fill="none"
							stroke={accentColor}
							strokeWidth={RING_STROKE}
							strokeLinecap="round"
							strokeDasharray={RING_CIRCUMFERENCE}
							strokeDashoffset={dashOffset}
							style={{ transition: "stroke-dashoffset 0.3s linear" }}
						/>
					</svg>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 1.5,
						}}>
						<Chip
							label={sessionType === "focus" ? "FOCO" : "PAUSA"}
							sx={{
								fontSize: "0.85rem",
								letterSpacing: "0.15rem",
								padding: "4px 6px",
								height: "auto",
								bgcolor: accentColor,
								color: "#FFFFFF",
								fontWeight: 600,
								"& .MuiChip-label": {
									padding: "4px 10px",
								},
							}}
						/>

						<Typography
							sx={{
								fontSize: "2.2rem",
								fontWeight: 600,
								textAlign: "center",
								color: accentColor,
								fontVariantNumeric: "tabular-nums",
							}}>
							{time}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
