import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { goBack } from "@/utils/nav";
import { colors, spacing, radius, fontSize } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/store/useProjects";

// Ekran listy projektow
export default function ProjectsScreen() {
  const router = useRouter();
  const projects = useProjects((state) => state.projects);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.flex}>
          <ScreenHeader label="Moje realizacje" title="Projekty" />
        </View>
        <Pressable style={styles.backButton} onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      {/* Przycisk dodawania */}
      <Pressable style={styles.addButton} onPress={() => router.push("/add-project")}>
        <Ionicons name="add" size={20} color={colors.textPrimary} />
        <Text style={styles.addText}>Dodaj projekt</Text>
      </Pressable>

      {/* Lista projektow lub stan pusty */}
      {projects.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name="folder-open-outline"
            size={48}
            color={colors.textSecondary}
          />
          <Text style={styles.emptyText}>Brak projektow. Dodaj pierwszy.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPress={() => router.push(`/project/${project.id}`)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
  flex: { flex: 1 },
  topRow: { flexDirection: "row", alignItems: "flex-start" },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  addText: { color: colors.textPrimary, fontSize: fontSize.md },
  list: { gap: spacing.lg },
  empty: { alignItems: "center", gap: spacing.md, paddingVertical: spacing.xl },
  emptyText: { color: colors.textSecondary, fontSize: fontSize.md },
});
