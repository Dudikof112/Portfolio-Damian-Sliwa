import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type SettingsRowProps = {
  icon: keyof typeof Ionicons.glyphMap;  // Nazwa ikony z zestawu Ionicons
  title: string;                         // Tytul pozycji
  subtitle: string;                      // Opis pozycji
  onPress?: () => void;                  // Funkcja wywolywana po nacisnieciu
};

// Komponent wiersza ustawien z ikona, opisem i strzalka
export function SettingsRow({ icon, title, subtitle, onPress }: SettingsRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={20} color={colors.primaryLight} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  texts: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.medium },
  subtitle: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 2 },
});