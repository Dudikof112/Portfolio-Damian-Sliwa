import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Card } from "@/components/Card";
import { HabitIcon } from "@/components/HabitIcon";
import { StreakBadge } from "@/components/StreakBadge";
import { useEnrichedHabits } from "@/store/useHabits";

// Skrocone nazwy dni tygodnia na wykresie
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Ekran statystyk z przegladem tygodnia i najlepszymi nawykami
export default function StatsScreen() {
  const habits = useEnrichedHabits();

  // Podsumowania liczone na biezaco z magazynu
  const activeHabits = habits.length;
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const doneSlots = habits.reduce((sum, h) => sum + h.week.filter(Boolean).length, 0);
  const totalSlots = habits.length * 7;
  const weeklyPercent = totalSlots ? Math.round((doneSlots / totalSlots) * 100) : 0;

  // Aktywnosc tygodniowa — udzial wykonanych nawykow w kazdym dniu (0-1)
  const weeklyActivity = DAYS.map((_, i) =>
    habits.length ? habits.filter((h) => h.week[i]).length / habits.length : 0
  );

  // Trzy najskuteczniejsze nawyki
  const topHabits = [...habits]
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 3);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader label="Track your consistency" title="Your statistics" />

      {/* Przeglad tygodnia */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overview}
      >
        <View style={styles.overviewTop}>
          <View style={styles.flex}>
            <Text style={styles.overviewTitle}>Weekly overview</Text>
            <Text style={styles.overviewText}>
              You completed most of your habits this week. Your consistency is getting stronger.
            </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{weeklyPercent}%</Text>
          </View>
        </View>
        <View style={styles.miniRow}>
          <MiniStat value={activeHabits} label="Active habits" />
          <MiniStat value={doneSlots} label="Habits done" />
          <MiniStat value={bestStreak} label="Best streak" />
        </View>
      </LinearGradient>

      {/* Aktywnosc tygodniowa */}
      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Weekly activity</Text>
          <Text style={styles.link}>Last 7 days</Text>
        </View>
        <View style={styles.chart}>
          {weeklyActivity.map((value, i) => (
            <View key={i} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${value * 100}%` }]} />
              </View>
              <Text style={styles.barLabel}>{DAYS[i]}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Najlepszy streak */}
      <Card>
        <View style={styles.streakRow}>
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>Best streak</Text>
            <Text style={styles.cardText}>
              Your longest current streak is {bestStreak} days. Keep going to beat your record.
            </Text>
          </View>
          <View style={styles.flameBox}>
            <Text style={styles.flame}>🔥</Text>
          </View>
        </View>
      </Card>

      {/* Najlepsze nawyki */}
      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Top habits</Text>
          <Text style={styles.link}>This month</Text>
        </View>
        <View style={styles.topList}>
          {topHabits.map((habit) => (
            <View key={habit.id} style={styles.topItem}>
              <HabitIcon emoji={habit.emoji} color={habit.color} size={40} />
              <View style={styles.flex}>
                <Text style={styles.topName}>{habit.name}</Text>
                <Text style={styles.topMeta}>{habit.meta}</Text>
              </View>
              <View style={styles.topRight}>
                <Text style={styles.topPercent}>{habit.completionRate}%</Text>
                <StreakBadge days={habit.streak} />
              </View>
            </View>
          ))}
        </View>
      </Card>
    </ScrollView>
  );
}

// Mala statystyka wewnatrz karty przegladu tygodnia
function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.mini}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  flex: { flex: 1 },

  overview: { borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md },
  overviewTop: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md },
  overviewTitle: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
  overviewText: { color: colors.textPrimary, opacity: 0.85, fontSize: fontSize.sm, marginTop: 4 },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(15, 11, 30, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.bold },
  miniRow: { flexDirection: "row", gap: spacing.sm },
  mini: {
    flex: 1,
    backgroundColor: "rgba(15, 11, 30, 0.3)",
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  miniValue: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
  miniLabel: {
    color: colors.textPrimary,
    opacity: 0.85,
    fontSize: fontSize.xs,
    marginTop: 2,
    textAlign: "center",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardTitle: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
  cardText: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 4 },
  link: { color: colors.primaryLight, fontSize: fontSize.sm, fontWeight: fontWeight.medium },

  chart: { flexDirection: "row", alignItems: "flex-end", gap: spacing.sm },
  barColumn: { flex: 1, alignItems: "center", gap: spacing.sm },
  barTrack: { width: "100%", height: 130, justifyContent: "flex-end" },
  barFill: {
    width: "55%",
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    minHeight: 8,
  },
  barLabel: { color: colors.textSecondary, fontSize: fontSize.xs },

  streakRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  flameBox: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  flame: { fontSize: 28 },

  topList: { gap: spacing.md },
  topItem: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  topName: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.medium },
  topMeta: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 2 },
  topRight: { alignItems: "flex-end", gap: 4 },
  topPercent: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: fontWeight.bold },
});