export type SessionType =
  | "focus"
  | "break";

export interface TimerState {
  sessionType: SessionType;
  timeLeft: number;
  isRunning: boolean;
}