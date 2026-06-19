import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type StatTileProps = {
  value: string;  // Wartosc glowna (np. "82%", "24")
  label: string;  // Opis pod wartoscia
};

// Komponent kafelka statystyki z duza liczba i podpisem
export function StatTile({ value, label }: StatTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
  value: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  label: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: 4, textAlign: "center" },
});