import { ScrollView, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { colors, spacing, fontSize, fontWeight } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Card } from "@/components/Card";

// Zbudowanie oznaczen przykladowych dni z wykonanym nawykiem w biezacym miesiacu
function buildMarkedDates() {
  const marked: Record<string, { marked: boolean; dotColor: string }> = {};
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const days = [2, 3, 5, 8, 9, 12, 14, 15, 18, 19];
  days.forEach((d) => {
    const day = String(d).padStart(2, "0");
    marked[`${year}-${month}-${day}`] = { marked: true, dotColor: colors.primaryLight };
  });
  return marked;
}

// Ekran kalendarza z oznaczonymi dniami wykonania
export default function CalendarScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader label="Plan your week" title="Calendar" />

      <Card style={styles.calendarCard}>
        <Calendar
          markedDates={buildMarkedDates()}
          theme={{
            calendarBackground: "transparent",
            monthTextColor: colors.textPrimary,
            dayTextColor: colors.textPrimary,
            textSectionTitleColor: colors.textSecondary,
            todayTextColor: colors.primaryLight,
            selectedDayBackgroundColor: colors.primary,
            arrowColor: colors.primaryLight,
            textDisabledColor: colors.surfaceElevated,
          }}
        />
      </Card>

      <Card>
        {/* Wartosc przykladowa — w kroku 4 zostanie wyliczona z historii */}
        <Text style={styles.summaryValue}>24 days</Text>
        <Text style={styles.summaryLabel}>completed this month</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  calendarCard: { padding: spacing.sm },
  summaryValue: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  summaryLabel: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: 2 },
});