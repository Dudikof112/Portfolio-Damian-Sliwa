import { View, Text, StyleSheet, Switch } from "react-native";
import { colors, spacing, fontSize, fontWeight } from "@/constants/theme";

type ToggleRowProps = {
  title: string;                        // Nazwa ustawienia
  subtitle?: string;                    // Opis pomocniczy
  value: boolean;                       // Stan przelacznika
  onValueChange: (v: boolean) => void;  // Funkcja zmieniajaca stan
};

// Komponent wiersza ustawienia z przelacznikiem
export function ToggleRow({ title, subtitle, value, onValueChange }: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surfaceElevated, true: colors.primary }}
        thumbColor={colors.textPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  texts: { flex: 1, paddingRight: spacing.md },
  title: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.medium },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 2 },
});