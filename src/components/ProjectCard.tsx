import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { Chip } from "@/components/Chip";
import type { Project } from "@/store/useProjects";

type ProjectCardProps = {
  project: Project; // Dane projektu
  onPress?: () => void; // Akcja po nacisnieciu karty
};

// Karta pojedynczego projektu na liscie
export function ProjectCard({ project, onPress }: ProjectCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* Grafika projektu lub kafelek z inicjalem */}
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

      <View style={styles.body}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {project.description}
        </Text>

        {project.tags.length > 0 && (
          <View style={styles.tags}>
            {project.tags.map((tag) => (
              <Chip key={tag} label={tag} color={colors.primaryLight} />
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  image: {
    height: 140,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: fontWeight.bold,
    opacity: 0.9,
  },
  body: { padding: spacing.lg, gap: spacing.sm },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  description: { color: colors.textSecondary, fontSize: fontSize.sm, lineHeight: 20 },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
});
