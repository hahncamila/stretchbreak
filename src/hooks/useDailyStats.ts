import { useCallback, useEffect, useState } from "react";

interface DailyStats {
	date: string;
	completedBreaks: number;
	totalRestSeconds: number;
}

const STORAGE_KEY = "stretchbreak:daily-stats";

function getTodayKey() {
	return new Date().toISOString().split("T")[0];
}

function createEmptyStats(): DailyStats {
	return {
		date: getTodayKey(),
		completedBreaks: 0,
		totalRestSeconds: 0,
	};
}

function loadDailyStats(): DailyStats {
	const storedStats = localStorage.getItem(STORAGE_KEY);

	if (!storedStats) {
		return createEmptyStats();
	}

	try {
		const parsedStats = JSON.parse(storedStats) as DailyStats;

		if (parsedStats.date !== getTodayKey()) {
			return createEmptyStats();
		}

		return parsedStats;
	} catch {
		return createEmptyStats();
	}
}

export function useDailyStats() {
	const [dailyStats, setDailyStats] =
		useState<DailyStats>(() => loadDailyStats());

	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(dailyStats),
		);
	}, [dailyStats]);

	const addCompletedBreak = useCallback(
		(restSeconds: number) => {
			setDailyStats((currentStats) => ({
				...currentStats,
				completedBreaks:
					currentStats.completedBreaks + 1,
				totalRestSeconds:
					currentStats.totalRestSeconds +
					restSeconds,
			}));
		},
		[],
	);

	const resetDailyStats = useCallback(() => {
		setDailyStats(createEmptyStats());
	}, []);

	return {
		dailyStats,
		addCompletedBreak,
		resetDailyStats,
	};
}