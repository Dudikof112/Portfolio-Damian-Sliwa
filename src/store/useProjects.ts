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
};

// Dane poczatkowe — wlasne projekty (do podmiany na swoje)
const seedProjects: Project[] = [
  {
    id: "1",
    title: "StreakUp",
    description:
      "Mobilna aplikacja do sledzenia nawykow z systemem streakow, statystykami i trwalym zapisem. Zbudowana w React Native (Expo), z nawigacja Expo Router i magazynem Zustand.",
    tags: ["React Native", "Expo", "TypeScript", "Zustand"],
  },
  {
    id: "2",
    title: "Portfolio App",
    description:
      "Ta aplikacja — mobilne portfolio prezentujace profil, projekty i kontakt. Dodawanie projektow z walidacja formularza i zapisem lokalnym.",
    tags: ["React Native", "Expo Router", "AsyncStorage"],
  },
  {
    id: "3",
    title: "Przykladowy projekt",
    description: "Krotki opis projektu — podmien na swoj wlasny.",
    tags: ["JavaScript"],
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
      name: "portfolio-projects",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
