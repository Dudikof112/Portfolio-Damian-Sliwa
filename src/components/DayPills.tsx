import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

// Skrocone nazwy dni tygodnia
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DayPillsProps = {
  selected: string[];               // Lista wybranych dni
  onToggle: (day: string) => void;  // Funkcja przelaczajaca dzien
};

// Komponent wyboru dni tygodnia w postaci pigulek
export function DayPills({ selected, onToggle }: DayPillsProps) {
  return (
    <View style={styles.wrap}>
      {DAYS.map((day) => {
        const active = selected.includes(day);  // Sprawdzenie, czy dzien jest wybrany
        return (
          <Pressable
            key={day}
            onPress={() => onToggle(day)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{day}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
  },
  pillActive: { backgroundColor: colors.primary },
  text: { color: colors.textSecondary, fontSize: fontSize.sm, fontWeight: fontWeight.medium },
  textActive: { color: colors.textPrimary },
});