// habitStats.ts
// Funkcje pomocnicze liczace statystyki nawyku na podstawie historii wykonan.

import type { Habit } from "@/store/useHabits";

// Zamiana daty na klucz tekstowy w formacie "RRRR-MM-DD"
export function toKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Klucz dnia dzisiejszego
export function todayKey(): string {
  return toKey(new Date());
}

// Sprawdzenie, czy nawyk zostal wykonany dzisiaj
export function isDoneToday(habit: Habit): boolean {
  return habit.completions.includes(todayKey());
}

// Dodanie lub usuniecie daty z listy wykonan
export function toggleDate(dates: string[], key: string): string[] {
  return dates.includes(key) ? dates.filter((d) => d !== key) : [...dates, key];
}

// Liczba kolejnych dni wykonania konczacych sie dzisiaj (lub wczoraj)
export function currentStreak(habit: Habit): number {
  const set = new Set(habit.completions);
  const cursor = new Date();
  // Jesli dzisiaj jeszcze nie wykonano, liczenie zaczyna sie od wczoraj
  if (!set.has(toKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (set.has(toKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

// Skutecznosc jako procent wykonan w ostatnich 30 dniach
export function completionRate(habit: Habit): number {
  const set = new Set(habit.completions);
  const cursor = new Date();
  let count = 0;
  for (let i = 0; i < 30; i += 1) {
    if (set.has(toKey(cursor))) count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return Math.round((count / 30) * 100);
}

// Poczatek biezacego tygodnia (poniedzialek)
function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = niedziela
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return d;
}

// Wykonania w biezacym tygodniu od poniedzialku do niedzieli
export function weekStatus(habit: Habit): boolean[] {
  const set = new Set(habit.completions);
  const monday = startOfWeek(new Date());
  const result: boolean[] = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    result.push(set.has(toKey(d)));
  }
  return result;
}