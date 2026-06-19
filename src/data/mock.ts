// mock.ts
// Przykladowe dane nawykow uzywane na ekranach przed podlaczeniem trwalego zapisu.

// Typ pojedynczego nawyku
export type Habit = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  meta: string;
  streak: number;
  done: boolean;
  completionRate: number;
  completedDays: number;
  week: boolean[];
};

// Lista przykladowych nawykow
export const habits: Habit[] = [
  {
    id: "1",
    name: "Drink water",
    emoji: "💧",
    color: "#7C5CFC",
    meta: "8 glasses",
    streak: 12,
    done: true,
    completionRate: 82,
    completedDays: 24,
    week: [true, true, true, false, true, false, false],
  },
  {
    id: "2",
    name: "Read 20 minutes",
    emoji: "📚",
    color: "#34D399",
    meta: "Evening",
    streak: 7,
    done: true,
    completionRate: 69,
    completedDays: 18,
    week: [true, false, true, true, false, true, false],
  },
  {
    id: "3",
    name: "Meditation",
    emoji: "🧘",
    color: "#FBBF24",
    meta: "10 min",
    streak: 15,
    done: true,
    completionRate: 76,
    completedDays: 21,
    week: [true, true, false, true, true, true, false],
  },
  {
    id: "4",
    name: "Morning run",
    emoji: "🏃",
    color: "#F472B6",
    meta: "30 min",
    streak: 4,
    done: false,
    completionRate: 54,
    completedDays: 12,
    week: [true, false, true, false, false, false, false],
  },
];

// Dane zbiorcze prezentowane na ekranie statystyk i profilu
export const summary = {
  activeHabits: 4,
  habitsDone: 18,
  bestStreak: 12,
  weeklyPercent: 78,
  weeklyActivity: [0.4, 0.8, 0.9, 0.5, 1.0, 0.85, 0.6],
};