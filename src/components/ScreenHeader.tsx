import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type ScreenHeaderProps = {
  label: string;  // Mniejszy tekst nad tytulem
  title: string;  // Glowny tytul ekranu
};

// Komponent naglowka ekranu z podpisem i tytulem
export function ScreenHeader({ label, title }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: spacing.lg },
  label: { color: colors.textSecondary, fontSize: fontSize.sm },
  title: { color: colors.textPrimary, fontSize: fontSize.xxl, fontWeight: fontWeight.bold, marginTop: 4 },
});