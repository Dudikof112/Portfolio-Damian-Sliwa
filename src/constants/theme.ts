// theme.ts
// Definicja motywu aplikacji — kolory, odstepy, zaokraglenia i typografia.

// Paleta kolorow aplikacji (ciemny motyw)
export const colors = {
  background: "#0F0B1E",
  surface: "#1A1530",
  surfaceElevated: "#241D40",
  primary: "#7C5CFC",
  primaryLight: "#A78BFA",
  textPrimary: "#FFFFFF",
  textSecondary: "#9B98B3",
  streak: "#F59E0B",
};

// Kolory akcentow
export const accentColors = {
  purple: "#7C5CFC",
  lavender: "#A78BFA",
  green: "#34D399",
  amber: "#FBBF24",
  pink: "#F472B6",
  blue: "#60A5FA",
};

// Skala odstepow
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Promienie zaokraglen
export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  full: 999,
};

// Rozmiary czcionek
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 34,
};

// Grubosci czcionek (wartosci zgodne z React Native)
export const fontWeight = {
  regular: "400",
  medium: "600",
  bold: "700",
} as const;

// Eksport zbiorczy
export const theme = { colors, accentColors, spacing, radius, fontSize, fontWeight };