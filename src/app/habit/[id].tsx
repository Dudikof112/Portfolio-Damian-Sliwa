import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { Card } from "@/components/Card";
import { HabitIcon } from "@/components/HabitIcon";
import { Chip } from "@/components/Chip";
import { Button } from "@/components/Button";
import { habits } from "@/data/mock";

// Skrocone nazwy dni tygodnia
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Ekran szczegolow wybranego nawyku
export default function HabitDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Odnalezienie nawyku po identyfikatorze (z wartoscia zastepcza)
  const habit = habits.find((h) => h.id === id) ?? habits[0];

  // Liczba wykonan w biezacym tygodniu
  const doneThisWeek = habit.week.filter(Boolean).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Naglowek z przyciskami edycji i powrotu */}
      <View style={styles.topRow}>
        <Pressable style={styles.iconButton} onPress={() => router.push("/add")}>
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
          <Chip label="08:00 PM" />
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

      <Button title="Mark as done" />
      <Button title="Edit habit" variant="secondary" onPress={() => router.push("/add")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },

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
});