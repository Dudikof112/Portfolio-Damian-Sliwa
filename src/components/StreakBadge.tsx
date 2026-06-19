import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type StreakBadgeProps = {
  days: number;   // Liczba dni ciaglosci
};

// Komponent znacznika streaka z ikona plomienia
export function StreakBadge({ days }: StreakBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.flame}>🔥</Text>
      <Text style={styles.text}>{days} days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  flame: { fontSize: fontSize.sm },
  text: { color: colors.streak, fontSize: fontSize.sm, fontWeight: fontWeight.medium },
});