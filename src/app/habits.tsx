import { ScrollView, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { HabitCard } from "@/components/HabitCard";
import { useHabits, useEnrichedHabits } from "@/store/useHabits";

// Ekran pelnej listy nawykow (otwierany z odnosnika "See all")
export default function AllHabitsScreen() {
  const router = useRouter();
  const habits = useEnrichedHabits();
  const toggleToday = useHabits((s) => s.toggleToday);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.flex}>
          <ScreenHeader label="All your habits" title="Habits" />
        </View>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      {habits.map((habit) => (
        // Dotkniecie karty otwiera szczegoly nawyku
        <Pressable key={habit.id} onPress={() => router.push(`/habit/${habit.id}`)}>
          <HabitCard
            emoji={habit.emoji}
            color={habit.color}
            name={habit.name}
            meta={habit.meta}
            streak={habit.streak}
            done={habit.done}
            onToggle={() => toggleToday(habit.id)}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  flex: { flex: 1 },
  topRow: { flexDirection: "row", alignItems: "flex-start" },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
});