import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import {
  colors,
  fontSize,
  fontWeight,
  radius,
  spacing,
} from "@/constants/theme";
import { goBack } from "@/utils/nav";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Dane profilu
const PHOTO = require("../../assets/images/profile.png");

const NAME = "Damian Śliwa";
const ROLE = "Mobile / Frontend Developer";
const BIO =
  "Pochodzę z Bielska-Białej, lubię chodzić po górach i czytać książki. Pasjonat programowania, projektowania i tworzenia nowych rzeczy. Cechuje mnie ambicja i chęć poznawania nowych rzeczy bardzo szczegółowo.";

// Umiejetnosci prezentowane jako tagi
const SKILLS = [
  "JavaScript / TypeScript",
  "React Native / Expo",
  "Git / GitHub",
  "HTML / CSS",
];

// Ekran profilu studenta
export default function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => goBack()}>
        <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
      </Pressable>

      {/* Naglowek ze zdjeciem */}
      <View style={styles.header}>
        <Image source={PHOTO} style={styles.photo} />
        <Text style={styles.name}>{NAME}</Text>
        <Text style={styles.role}>{ROLE}</Text>
      </View>

      {/* Opis */}
      <Card>
        <Text style={styles.sectionTitle}>O mnie</Text>
        <Text style={styles.bio}>{BIO}</Text>
      </Card>

      {/* Umiejetnosci */}
      <Card>
        <Text style={styles.sectionTitle}>Umiejętności</Text>
        <View style={styles.skills}>
          {SKILLS.map((skill) => (
            <Chip key={skill} label={skill} color={colors.primaryLight} />
          ))}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  header: { alignItems: "center", gap: spacing.sm },
  photo: {
    width: 120,
    height: 120,
    borderRadius: radius.full,
  },
  name: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  role: { color: colors.textSecondary, fontSize: fontSize.md },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  bio: { color: colors.textSecondary, fontSize: fontSize.md, lineHeight: 24 },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});
