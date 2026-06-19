import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { HabitIcon } from "./HabitIcon";
import { StreakBadge } from "./StreakBadge";

type HabitCardProps = {
  emoji: string;          // Ikona kategorii
  color: string;          // Kolor akcentu nawyku
  name: string;           // Nazwa nawyku
  meta: string;           // Dodatkowy opis (np. "8 glasses")
  streak: number;         // Liczba dni ciaglosci
  done: boolean;          // Stan wykonania na dany dzien
  onToggle?: () => void;  // Funkcja oznaczajaca wykonanie
};

// Komponent karty nawyku na liscie ekranu glownego
export function HabitCard({ emoji, color, name, meta, streak, done, onToggle }: HabitCardProps) {
  return (
    <View style={styles.card}>
      <HabitIcon emoji={emoji} color={color} />
      <View style={styles.center}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{meta}</Text>
          <StreakBadge days={streak} />
        </View>
      </View>
      <Pressable onPress={onToggle} style={[styles.check, done && styles.checkDone]}>
        {done ? <Ionicons name="checkmark" size={18} color={colors.textPrimary} /> : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  center: { flex: 1, gap: 4 },
  name: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.bold },
  metaRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  meta: { color: colors.textSecondary, fontSize: fontSize.sm },
  check: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  checkDone: { backgroundColor: colors.primary, borderColor: colors.primary },
});