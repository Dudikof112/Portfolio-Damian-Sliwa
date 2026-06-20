// useHabits.ts
// Globalny, trwale zapisywany magazyn nawykow oparty na Zustand i AsyncStorage.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  isDoneToday,
  currentStreak,
  completionRate,
  weekStatus,
  toggleDate,
  todayKey,
  toKey,
} from "@/utils/habitStats";

// Surowy nawyk przechowywany w magazynie
export type Habit = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  meta: string;
  days: string[];
  goal: string;
  time: string;
  completions: string[]; // daty wykonania w formacie "RRRR-MM-DD"
};

// Nawyk wzbogacony o wyliczone statystyki (uzywany na ekranach)
export type EnrichedHabit = Habit & {
  done: boolean;
  streak: number;
  completionRate: number;
  completedDays: number;
  week: boolean[];
};

// Wygenerowanie listy ostatnich dni jako wykonan (dane poczatkowe)
function seedDays(count: number, includeToday: boolean): string[] {
  const out: string[] = [];
  const cursor = new Date();
  if (!includeToday) cursor.setDate(cursor.getDate() - 1);
  for (let i = 0; i < count; i += 1) {
    out.push(toKey(cursor));
    cursor.setDate(cursor.getDate() - 1);
  }
  return out;
}

// Dane poczatkowe — widoczne przy pierwszym uruchomieniu
const seedHabits: Habit[] = [
  {
    id: "1",
    name: "Drink water",
    emoji: "💧",
    color: "#7C5CFC",
    meta: "8 glasses",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    goal: "8 glasses",
    time: "08:00 PM",
    completions: seedDays(24, true),
  },
  {
    id: "2",
    name: "Read 20 minutes",
    emoji: "📚",
    color: "#34D399",
    meta: "Evening",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    goal: "20 min",
    time: "09:00 PM",
    completions: seedDays(18, true),
  },
  {
    id: "3",
    name: "Meditation",
    emoji: "🧘",
    color: "#FBBF24",
    meta: "10 min",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    goal: "10 min",
    time: "07:00 AM",
    completions: seedDays(21, true),
  },
  {
    id: "4",
    name: "Morning run",
    emoji: "🏃",
    color: "#F472B6",
    meta: "30 min",
    days: ["Mon", "Wed", "Fri"],
    goal: "30 min",
    time: "06:30 AM",
    completions: seedDays(13, false),
  },
];

type HabitsState = {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, "id" | "completions">) => void;
  updateHabit: (id: string, patch: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleToday: (id: string) => void;
};

// Magazyn nawykow z automatycznym zapisem na urzadzeniu
export const useHabits = create<HabitsState>()(
  persist(
    (set) => ({
      habits: seedHabits,
      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            { ...habit, id: Date.now().toString(), completions: [] },
          ],
        })),
      updateHabit: (id, patch) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, ...patch } : h)),
        })),
      deleteHabit: (id) =>
        set((state) => ({ habits: state.habits.filter((h) => h.id !== id) })),
      toggleToday: (id) =>
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, completions: toggleDate(h.completions, todayKey()) } : h
          ),
        })),
    }),
    {
      name: "streakup-habits",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Wzbogacenie surowego nawyku o wyliczone statystyki
export function enrich(habit: Habit): EnrichedHabit {
  return {
    ...habit,
    done: isDoneToday(habit),
    streak: currentStreak(habit),
    completionRate: completionRate(habit),
    completedDays: habit.completions.length,
    week: weekStatus(habit),
  };
}

// Hook zwracajacy nawyki wraz z wyliczonymi statystykami
export function useEnrichedHabits(): EnrichedHabit[] {
  return useHabits((state) => state.habits).map(enrich);
}