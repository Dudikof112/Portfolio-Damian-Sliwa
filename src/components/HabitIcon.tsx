import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type HabitIconProps = {
  emoji: string;   // Ikona kategorii nawyku (emoji)
  color: string;   // Kolor akcentu uzywany jako tlo
  size?: number;   // Rozmiar kwadratu (domyslnie 48)
};

// Komponent kolorowej ikony nawyku na zaokraglonym kwadracie
export function HabitIcon({ emoji, color, size = 48 }: HabitIconProps) {
  return (
    <View
      style={[
        styles.box,
        // Tlo z obnizona przezroczystoscia (dopisany kanal alfa do koloru hex)
        { width: size, height: size, backgroundColor: color + "22" },
      ]}
    >
      <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
});