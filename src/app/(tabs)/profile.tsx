import { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Card } from "@/components/Card";
import { StatTile } from "@/components/StatTile";
import { ToggleRow } from "@/components/ToggleRow";
import { SettingsRow } from "@/components/SettingsRow";
import { Button } from "@/components/Button";

// Ekran profilu z podsumowaniem, preferencjami i ustawieniami
export default function ProfileScreen() {
  // Stany przelacznikow preferencji
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader label="Manage your account" title="Profile" />

      {/* Karta profilu */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileCard}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>D</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.name}>Damian</Text>
          <Text style={styles.bio}>
            Stay consistent, build strong routines, and track progress every day.
          </Text>
          <View style={styles.chipRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>4 active habits</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>12 day streak</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Szybkie podsumowanie */}
      <Card>
        <Text style={styles.sectionTitle}>Quick summary</Text>
        <View style={styles.statRow}>
          <StatTile value="24" label="Completed days" />
          <StatTile value="82%" label="Consistency" />
          <StatTile value="4" label="Active habits" />
        </View>
      </Card>

      {/* Preferencje */}
      <Card>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <ToggleRow
          title="Dark mode"
          subtitle="Use the dark appearance of the app"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <ToggleRow
          title="Notifications"
          subtitle="Daily reminders for your selected habits"
          value={notifications}
          onValueChange={setNotifications}
        />
        <ToggleRow
          title="Weekly report"
          subtitle="Receive a short progress summary every week"
          value={weeklyReport}
          onValueChange={setWeeklyReport}
        />
      </Card>

      {/* Ustawienia */}
      <Card>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsList}>
          <SettingsRow
            icon="person-outline"
            title="Edit profile"
            subtitle="Change your name and account details"
          />
          <SettingsRow
            icon="notifications-outline"
            title="Reminder settings"
            subtitle="Manage notification times and habits"
          />
          <SettingsRow
            icon="color-palette-outline"
            title="Appearance"
            subtitle="Customize theme and visual preferences"
          />
          <SettingsRow
            icon="download-outline"
            title="Export data"
            subtitle="Download your habit tracking history"
          />
        </View>
      </Card>

      <Button title="Log out" variant="secondary" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  flex: { flex: 1 },

  profileCard: { flexDirection: "row", gap: spacing.md, borderRadius: radius.lg, padding: spacing.lg },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: "rgba(15, 11, 30, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  name: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
  bio: { color: colors.textPrimary, opacity: 0.85, fontSize: fontSize.sm, marginTop: 4 },
  chipRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  chip: {
    backgroundColor: "rgba(15, 11, 30, 0.3)",
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  chipText: { color: colors.textPrimary, fontSize: fontSize.xs, fontWeight: fontWeight.medium },

  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  statRow: { flexDirection: "row", gap: spacing.sm },
  settingsList: { gap: spacing.sm },
});