import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type ButtonProps = {
  title: string;                      // Etykieta przycisku
  onPress?: () => void;               // Funkcja wywolywana po nacisnieciu
  variant?: "primary" | "secondary";  // Wariant wygladu
  style?: ViewStyle;
};

// Komponent przycisku w dwoch wariantach: gradientowym i obrysowym
export function Button({ title, onPress, variant = "primary", style }: ButtonProps) {
  // Wariant obrysowy (np. "Edit habit")
  if (variant === "secondary") {
    return (
      <Pressable onPress={onPress} style={[styles.secondary, style]}>
        <Text style={styles.secondaryText}>{title}</Text>
      </Pressable>
    );
  }

  // Wariant podstawowy z gradientem (np. "Save Habit")
  return (
    <Pressable onPress={onPress} style={style}>
      <LinearGradient
        colors={[colors.primaryLight, colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primary}
      >
        <Text style={styles.primaryText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    borderRadius: radius.lg,
    paddingVertical: spacing.md + 2,
    alignItems: "center",
  },
  primaryText: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.bold },
  secondary: {
    borderRadius: radius.lg,
    paddingVertical: spacing.md + 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.surfaceElevated,
  },
  secondaryText: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.medium },
});