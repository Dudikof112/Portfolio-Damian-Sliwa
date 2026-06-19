import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";

type ProgressCardProps = {
  title: string;        // Naglowek karty
  description: string;  // Tekst opisowy
  percent: number;      // Wartosc procentowa postepu
};

// Komponent wyroznionej karty postepu z gradientem
export function ProgressCard({ title, description, percent }: ProgressCardProps) {
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.circle}>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  texts: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
  description: { color: colors.textPrimary, opacity: 0.85, fontSize: fontSize.sm, marginTop: 4 },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(15, 11, 30, 0.5)",  // Polprzezroczyste ciemne kolo na gradiencie
    alignItems: "center",
    justifyContent: "center",
  },
  percent: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
});