import { ScrollView, View, Text, Pressable, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { Card } from "@/components/Card";
import { HabitIcon } from "@/components/HabitIcon";
import { Chip } from "@/components/Chip";
import { Button } from "@/components/Button";
import { useHabits, enrich } from "@/store/useHabits";

// Skrocone nazwy dni tygodnia
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Ekran szczegolow wybranego nawyku
export default function HabitDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const raw = useHabits((s) => s.habits.find((h) => h.id === id));
  const toggleToday = useHabits((s) => s.toggleToday);
  const deleteHabit = useHabits((s) => s.deleteHabit);

  // Zabezpieczenie na wypadek braku nawyku
  if (!raw) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Habit not found.</Text>
        <Button title="Go back" variant="secondary" onPress={() => router.back()} />
      </View>
    );
  }

  // Nawyk wraz z wyliczonymi statystykami
  const habit = enrich(raw);
  const doneThisWeek = habit.week.filter(Boolean).length;

  // Otwarcie ekranu edycji z przekazaniem identyfikatora
  function openEdit() {
    router.push({ pathname: "/add", params: { id: habit.id } });
  }

  // Potwierdzenie i usuniecie nawyku
  function confirmDelete() {
    Alert.alert("Delete habit", `Remove "${habit.name}"? This cannot be undone.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteHabit(habit.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Naglowek z przyciskami edycji i powrotu */}
      <View style={styles.topRow}>
        <Pressable style={styles.iconButton} onPress={openEdit}>
          <Ionicons name="pencil" size={18} color={colors.textPrimary} />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={18} color={colors.textPrimary} />
        </Pressable>
      </View>

      {/* Karta naglowka nawyku */}
      <Card style={styles.headerCard}>
        <HabitIcon emoji={habit.emoji} color={habit.color} size={56} />
        <Text style={styles.detailsLabel}>Habit details</Text>
        <Text style={styles.detailsName}>{habit.name}</Text>
        <View style={styles.chipRow}>
          <Chip label={`${habit.meta} daily`} />
          <Chip label={`🔥 ${habit.streak} day streak`} color={colors.streak} />
          <Chip label={habit.time} />
        </View>
      </Card>

      {/* Statystyki */}
      <Card style={styles.statCard}>
        <Text style={styles.statValue}>{habit.completionRate}%</Text>
        <Text style={styles.statLabel}>Completion rate</Text>
      </Card>
      <Card style={styles.statCard}>
        <Text style={styles.statValue}>{habit.completedDays}</Text>
        <Text style={styles.statLabel}>Completed days</Text>
      </Card>
      <Card style={styles.statCard}>
        <Text style={styles.statValue}>{habit.streak}</Text>
        <Text style={styles.statLabel}>Current streak</Text>
      </Card>

      {/* Biezacy tydzien */}
      <Card>
        <View style={styles.weekHeader}>
          <Text style={styles.cardTitle}>This week</Text>
          <Text style={styles.link}>{doneThisWeek} / 7 done</Text>
        </View>
        <View style={styles.weekRow}>
          {DAYS.map((day, i) => (
            <View key={day} style={styles.weekColumn}>
              <Text style={styles.weekDay}>{day}</Text>
              <View style={[styles.weekDot, habit.week[i] && styles.weekDotDone]}>
                {habit.week[i] ? (
                  <Ionicons name="checkmark" size={14} color={colors.textPrimary} />
                ) : (
                  <Text style={styles.weekDash}>—</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </Card>

      <Button
        title={habit.done ? "Completed today" : "Mark as done"}
        onPress={() => toggleToday(habit.id)}
      />
      <Button title="Edit habit" variant="secondary" onPress={openEdit} />
      <Pressable onPress={confirmDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete habit</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },

  empty: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  emptyText: { color: colors.textPrimary, fontSize: fontSize.lg },

  topRow: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.sm },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCard: { alignItems: "flex-start", gap: spacing.sm },
  detailsLabel: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: spacing.sm },
  detailsName: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.sm },

  statCard: { alignItems: "center" },
  statValue: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  statLabel: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 2 },

  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardTitle: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
  link: { color: colors.primaryLight, fontSize: fontSize.sm, fontWeight: fontWeight.medium },
  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  weekColumn: { alignItems: "center", gap: spacing.sm },
  weekDay: { color: colors.textSecondary, fontSize: fontSize.xs },
  weekDot: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  weekDotDone: { backgroundColor: colors.primary },
  weekDash: { color: colors.textSecondary, fontSize: fontSize.sm },

  deleteButton: { alignItems: "center", paddingVertical: spacing.sm },
  deleteText: { color: "#F87171", fontSize: fontSize.md, fontWeight: fontWeight.medium },
});