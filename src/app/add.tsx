import { useState } from "react";
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, fontSize, fontWeight, accentColors } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Card } from "@/components/Card";
import { DayPills } from "@/components/DayPills";
import { ToggleRow } from "@/components/ToggleRow";
import { Button } from "@/components/Button";
import { useHabits } from "@/store/useHabits";

// Dostepne ikony kategorii nawyku
const ICONS = ["💧", "📚", "🏃", "🧘", "🍎", "😴"];

// Ekran tworzenia oraz edycji nawyku
export default function AddHabitScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Akcje magazynu
  const addHabit = useHabits((s) => s.addHabit);
  const updateHabit = useHabits((s) => s.updateHabit);
  // Edytowany nawyk, jesli przekazano identyfikator
  const existing = useHabits((s) => (id ? s.habits.find((h) => h.id === id) : undefined));
  const editing = Boolean(existing);

  // Stany pol formularza (przy edycji wypelnione danymi nawyku)
  const [name, setName] = useState(existing?.name ?? "");
  const [icon, setIcon] = useState(existing?.emoji ?? ICONS[0]);
  const [color, setColor] = useState(existing?.color ?? accentColors.purple);
  const [days, setDays] = useState<string[]>(existing?.days ?? ["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [goal, setGoal] = useState(existing?.goal ?? "1 time");
  const [time, setTime] = useState(existing?.time ?? "08:00 PM");
  const [reminder, setReminder] = useState(true);

  // Przelaczenie wyboru dnia tygodnia
  function toggleDay(day: string) {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  // Zapis nowego lub zaktualizowanego nawyku
  function save() {
    const payload = {
      name: name.trim() || "New habit",
      emoji: icon,
      color,
      meta: goal,
      days,
      goal,
      time,
    };
    if (existing) {
      updateHabit(existing.id, payload);
    } else {
      addHabit(payload);
    }
    router.back();
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Naglowek z przyciskiem powrotu */}
      <View style={styles.headerRow}>
        <View style={styles.flex}>
          <ScreenHeader
            label={editing ? "Update your habit" : "Create a new habit"}
            title={editing ? "Edit Habit" : "Add Habit"}
          />
        </View>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      {/* Dane podstawowe */}
      <Card style={styles.section}>
        <Text style={styles.fieldLabel}>Habit name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Drink water"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.fieldLabel}>Category icon</Text>
        <View style={styles.iconRow}>
          {ICONS.map((item) => (
            <Pressable
              key={item}
              onPress={() => setIcon(item)}
              style={[styles.iconBox, icon === item && styles.iconBoxActive]}
            >
              <Text style={styles.iconText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.fieldLabel}>Accent color</Text>
        <View style={styles.colorRow}>
          {Object.values(accentColors).map((item) => (
            <Pressable
              key={item}
              onPress={() => setColor(item)}
              style={[
                styles.colorDot,
                { backgroundColor: item },
                color === item && styles.colorDotActive,
              ]}
            />
          ))}
        </View>
      </Card>

      {/* Harmonogram */}
      <Card style={styles.section}>
        <Text style={styles.cardTitle}>Schedule</Text>

        <Text style={styles.fieldLabel}>Frequency</Text>
        <View style={styles.selectBox}>
          <Text style={styles.selectText}>Daily</Text>
        </View>

        <Text style={styles.fieldLabel}>Days</Text>
        <DayPills selected={days} onToggle={toggleDay} />

        <View style={styles.twoColumns}>
          <View style={styles.flex}>
            <Text style={styles.fieldLabel}>Goal</Text>
            <TextInput
              style={styles.input}
              value={goal}
              onChangeText={setGoal}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <View style={styles.flex}>
            <Text style={styles.fieldLabel}>Time</Text>
            <TextInput
              style={styles.input}
              value={time}
              onChangeText={setTime}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
      </Card>

      {/* Przypomnienie */}
      <Card style={styles.section}>
        <Text style={styles.cardTitle}>Reminder</Text>
        <ToggleRow
          title="Enable notifications"
          subtitle="Get reminded at the selected time"
          value={reminder}
          onValueChange={setReminder}
        />
      </Card>

      <Button title={editing ? "Save changes" : "Save Habit"} onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  flex: { flex: 1 },

  headerRow: { flexDirection: "row", alignItems: "flex-start" },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },

  section: { gap: spacing.sm },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  fieldLabel: { color: colors.textSecondary, fontSize: fontSize.sm, marginTop: spacing.sm },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    fontSize: fontSize.md,
  },

  iconRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  iconBoxActive: { borderColor: colors.primary },
  iconText: { fontSize: 24 },

  colorRow: { flexDirection: "row", gap: spacing.md },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: "transparent",
  },
  colorDotActive: { borderColor: colors.textPrimary },

  selectBox: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  selectText: { color: colors.textPrimary, fontSize: fontSize.md },

  twoColumns: { flexDirection: "row", gap: spacing.md },
});