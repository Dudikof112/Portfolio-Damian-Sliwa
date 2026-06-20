import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { ProgressCard } from "@/components/ProgressCard";
import { HabitCard } from "@/components/HabitCard";
import { Card } from "@/components/Card";
import { useHabits, useEnrichedHabits } from "@/store/useHabits";

// Ekran glowny z dziennym postepem i lista nawykow
export default function HomeScreen() {
  const router = useRouter();
  const habits = useEnrichedHabits();              // nawyki z wyliczonymi statystykami
  const toggleToday = useHabits((s) => s.toggleToday); // akcja oznaczania wykonania

  // Liczba wykonanych nawykow oraz procent ukonczenia dnia
  const doneCount = habits.filter((h) => h.done).length;
  const percent = habits.length ? Math.round((doneCount / habits.length) * 100) : 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.headerTexts}>
          <Text style={styles.label}>Hi, Damian</Text>
          <Text style={styles.title}>Your habits today</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.iconButton} onPress={() => router.push("/add")}>
            <Ionicons name="add" size={22} color={colors.textPrimary} />
          </Pressable>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </View>
        </View>
      </View>

      <ProgressCard
        title="Daily progress"
        description={`You completed ${doneCount} of ${habits.length} habits today. Keep your streak alive.`}
        percent={percent}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's habits</Text>
        <Pressable onPress={() => router.push("/habits")}>
          <Text style={styles.link}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            emoji={habit.emoji}
            color={habit.color}
            name={habit.name}
            meta={habit.meta}
            streak={habit.streak}
            done={habit.done}
            onToggle={() => toggleToday(habit.id)}
          />
        ))}
      </View>

      <Card style={styles.reminder}>
        <Text style={styles.reminderText}>
          <Text style={styles.reminderBold}>Reminder: </Text>
          small actions repeated every day create real long-term change.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerTexts: { flex: 1 },
  label: { color: colors.textSecondary, fontSize: fontSize.sm },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginTop: 4,
  },
  actions: { flexDirection: "row", gap: spacing.sm, alignItems: "center" },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.textPrimary, fontWeight: fontWeight.bold },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  link: {
    color: colors.primaryLight,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  list: { gap: spacing.md },
  reminder: { marginTop: spacing.sm },
  reminderText: { color: colors.textSecondary, fontSize: fontSize.sm, lineHeight: 20 },
  reminderBold: { color: colors.textPrimary, fontWeight: fontWeight.bold },
});