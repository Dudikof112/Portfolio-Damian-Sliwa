import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { SettingsRow } from "@/components/SettingsRow";

// Ekran startowy — menu portfolio z sekcja powitalna i odnosnikami
export default function MenuScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Sekcja powitalna */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DS</Text>
        </View>
        <Text style={styles.name}>Damian Sliwa</Text>
        <Text style={styles.role}>Mobile / Frontend Developer</Text>
      </LinearGradient>

      {/* Menu nawigacyjne */}
      <View style={styles.menu}>
        <SettingsRow
          icon="folder-outline"
          title="Projekty"
          subtitle="Zobacz moje realizacje"
          onPress={() => router.push("/projects")}
        />
        <SettingsRow
          icon="person-outline"
          title="O mnie"
          subtitle="Profil, opis i umiejetnosci"
          onPress={() => router.push("/profile")}
        />
        <SettingsRow
          icon="mail-outline"
          title="Kontakt"
          subtitle="Jak sie ze mna skontaktowac"
          onPress={() => router.push("/contact")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: radius.full,
    backgroundColor: "rgba(15, 11, 30, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  role: { color: colors.textPrimary, opacity: 0.85, fontSize: fontSize.md },
  menu: { gap: spacing.sm },
});
