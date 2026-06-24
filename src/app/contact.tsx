import { ScreenHeader } from "@/components/ScreenHeader";
import { SettingsRow } from "@/components/SettingsRow";
import { colors, radius, spacing } from "@/constants/theme";
import { goBack } from "@/utils/nav";
import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";

// Dane kontaktowe
const EMAIL = "praca.sliwa@gmail.com";
const GITHUB = "https://github.com/Dudikof112";
const LINKEDIN = "https://www.linkedin.com/in/damian-%C5%9Bliwa-1b5877166/";

// Ekran kontaktowy z klikalnymi pozycjami
export default function ContactScreen() {
  // Otwarcie zewnetrznego adresu (poczta lub przegladarka)
  const open = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => goBack()}>
        <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
      </Pressable>

      <ScreenHeader label="Skontaktuj się" title="Kontakt" />

      <View style={styles.list}>
        <SettingsRow
          icon="mail-outline"
          title="E-mail"
          subtitle={EMAIL}
          onPress={() => open(`mailto:${EMAIL}`)}
        />
        <SettingsRow
          icon="logo-github"
          title="GitHub"
          subtitle="Dudikof112"
          onPress={() => open(GITHUB)}
        />
        <SettingsRow
          icon="logo-linkedin"
          title="LinkedIn"
          subtitle="Damian Śliwa"
          onPress={() => open(LINKEDIN)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { gap: spacing.sm },
});
