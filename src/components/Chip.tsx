import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type ChipProps = {
  label: string;   // Tekst wyswietlany w pigulce
  color?: string;  // Kolor tekstu (domyslnie pomocniczy)
};

// Komponent malej pigulki z informacja
export function Chip({ label, color = colors.textSecondary }: ChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
});