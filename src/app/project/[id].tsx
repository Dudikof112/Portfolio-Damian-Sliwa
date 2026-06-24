import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Linking,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { goBack } from "@/utils/nav";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import { Button } from "@/components/Button";
import { useProjects } from "@/store/useProjects";

// Ekran szczegolow wybranego projektu
export default function ProjectDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = useProjects((state) =>
    state.projects.find((p) => p.id === id),
  );
  const deleteProject = useProjects((state) => state.deleteProject);

  // Projekt nie istnieje (np. zostal usuniety)
  if (!project) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Nie znaleziono projektu.</Text>
        <Button title="Wroc" onPress={() => goBack()} />
      </View>
    );
  }

  // Otwarcie zewnetrznego adresu (np. repozytorium GitHub)
  const open = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  // Usuniecie projektu i powrot do listy
  const handleDelete = () => {
    deleteProject(project.id);
    goBack();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={() => goBack()}>
        <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
      </Pressable>

      {/* Grafika projektu */}
      {project.image ? (
        <Image
          source={{ uri: project.image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.image}
        >
          <Text style={styles.placeholderText}>
            {project.title.charAt(0).toUpperCase()}
          </Text>
        </LinearGradient>
      )}

      <Text style={styles.title}>{project.title}</Text>

      {project.tags.length > 0 && (
        <View style={styles.tags}>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} color={colors.primaryLight} />
          ))}
        </View>
      )}

      <Text style={styles.description}>{project.description}</Text>

      {/* Przycisk linku (np. GitHub) — tylko gdy podano adres */}
      {project.link ? (
        <Pressable onPress={() => open(project.link!)}>
          <LinearGradient
            colors={[colors.primary, colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.linkButton}
          >
            <Ionicons name="logo-github" size={20} color={colors.textPrimary} />
            <Text style={styles.linkButtonText}>Zobacz na GitHub</Text>
          </LinearGradient>
        </Pressable>
      ) : null}

      {/* Akcje: edycja i usuniecie */}
      <View style={styles.actions}>
        <Button
          title="Edytuj"
          variant="secondary"
          onPress={() =>
            router.push({
              pathname: "/add-project",
              params: { id: project.id },
            })
          }
        />
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={18} color="#F87171" />
          <Text style={styles.deleteText}>Usun projekt</Text>
        </Pressable>
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
  image: {
    height: 200,
    width: "100%",
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  placeholderText: {
    color: colors.textPrimary,
    fontSize: 64,
    fontWeight: fontWeight.bold,
    opacity: 0.9,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  description: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
  },
  linkButtonText: {
    color: colors.textPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  actions: { gap: spacing.md, marginTop: spacing.md },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  deleteText: { color: "#F87171", fontSize: fontSize.md, fontWeight: fontWeight.medium },
  notFound: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    padding: spacing.lg,
  },
  notFoundText: { color: colors.textSecondary, fontSize: fontSize.md },
});
