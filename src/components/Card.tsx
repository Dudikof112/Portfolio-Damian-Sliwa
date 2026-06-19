import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type CardProps = {
  children: ReactNode;   // Zawartosc umieszczana wewnatrz karty
  style?: ViewStyle;     // Dodatkowe style nadpisujace domyslne
};

// Komponent kontenera z ciemnym tlem i zaokraglonymi naroznikami
export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
});