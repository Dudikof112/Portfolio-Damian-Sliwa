// useProjects.ts
// Globalny, trwale zapisywany magazyn projektow (Zustand + AsyncStorage).

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Pojedynczy projekt w portfolio
export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[]; // technologie
  image?: string; // adres URL grafiki (opcjonalnie)
  link?: string; // adres repozytorium / strony (opcjonalnie)
};

// Projekty poczatkowe
const seedProjects: Project[] = [
  {
    id: "1",
    title: "eduFlow",
    description:
      "Webowa platforma edukacyjna (e-learning) w architekturze full-stack. Interfejs zbudowany w React, a serwer i API w Node.js.",
    tags: ["React", "Node.js"],
    link: "https://github.com/Dudikof112/eduFlow",
  },
  {
    id: "2",
    title: "Zaliczenie Java",
    description:
      "Projekt zaliczeniowy z Javy — aplikacja webowa oparta na frameworku Spring. Logika serwerowa i obsluga zadan po stronie backendu w Javie.",
    tags: ["Java", "Spring"],
    link: "https://github.com/Dudikof112/Zaliczenie-Java",
  },
  {
    id: "3",
    title: "Price Chart",
    description:
      "Aplikacja prezentujaca wykresy cen. Projekt grupowy napisany w JavaScript — pobieranie danych i ich wizualizacja na interaktywnym wykresie.",
    tags: ["JavaScript"],
    link: "https://github.com/Dudikof112/Price-Chart",
  },
  {
    id: "4",
    title: "Black Jack",
    description:
      "Konsolowa gra w Blackjacka (oczko) w Pythonie. Rozdawanie kart, decyzje gracza (dobierz lub pas), logika krupiera i ustalanie wyniku.",
    tags: ["Python"],
    link: "https://github.com/Dudikof112/Black-Jack",
  },
  {
    id: "5",
    title: "Coffee Machine",
    description:
      "Symulator ekspresu do kawy w Pythonie. Wybor napoju, zarzadzanie skladnikami (woda, mleko, kawa), przyjmowanie monet i wydawanie reszty.",
    tags: ["Python"],
    link: "https://github.com/Dudikof112/CoffeeMachine",
  },
  {
    id: "6",
    title: "Higher Lower",
    description:
      "Gra Higher Lower w Pythonie — porownywanie dwoch wartosci i zgadywanie, ktora jest wieksza, z naliczaniem punktow.",
    tags: ["Python"],
    link: "https://github.com/Dudikof112/Higher-Lower",
  },
];

type ProjectsState = {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  deleteProject: (id: string) => void;
};

// Magazyn projektow z automatycznym zapisem na urzadzeniu
export const useProjects = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: seedProjects,
      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            { ...project, id: Date.now().toString() },
          ],
        })),
      updateProject: (id, patch) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...patch } : p,
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "portfolio-projects-v2",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
