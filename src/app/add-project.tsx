import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { goBack } from "@/utils/nav";
import { colors, spacing, radius, fontSize, fontWeight } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/Button";
import { useProjects } from "@/store/useProjects";

// Ekran formularza dodawania oraz edycji projektu
export default function AddProjectScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const projects = useProjects((state) => state.projects);
  const addProject = useProjects((state) => state.addProject);
  const updateProject = useProjects((state) => state.updateProject);

  // Gdy podano id — tryb edycji istniejacego projektu
  const editing = projects.find((p) => p.id === id);

  const [title, setTitle] = useState(editing?.title ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [tagsText, setTagsText] = useState(editing?.tags.join(", ") ?? "");
  const [link, setLink] = useState(editing?.link ?? "");
  const [image, setImage] = useState(editing?.image ?? "");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>(
    {},
  );

  // Walidacja: tytul i opis sa wymagane
  const validate = () => {
    const next: { title?: string; description?: string } = {};
    if (title.trim().length === 0) next.title = "Podaj tytul projektu.";
    if (description.trim().length === 0) next.description = "Podaj opis projektu.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Zapis: dodanie nowego lub aktualizacja istniejacego projektu
  const handleSave = () => {
    if (!validate()) return;

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const data = {
      title: title.trim(),
      description: description.trim(),
      tags,
      link: link.trim() || undefined,
      image: image.trim() || undefined,
    };

    if (editing) {
      updateProject(editing.id, data);
    } else {
      addProject(data);
    }
    goBack();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.flex}>
          <ScreenHeader
            label={editing ? "Edycja" : "Nowy wpis"}
            title={editing ? "Edytuj projekt" : "Dodaj projekt"}
          />
        </View>
        <Pressable style={styles.backButton} onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      {/* Tytul (wymagany) */}
      <Text style={styles.label}>Tytul *</Text>
      <TextInput
        style={[styles.input, errors.title ? styles.inputError : null]}
        value={title}
        onChangeText={setTitle}
        placeholder="np. eduFlow"
        placeholderTextColor={colors.textSecondary}
      />
      {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

      {/* Opis (wymagany) */}
      <Text style={styles.label}>Opis *</Text>
      <TextInput
        style={[styles.input, styles.textArea, errors.description ? styles.inputError : null]}
        value={description}
        onChangeText={setDescription}
        placeholder="Krotki opis projektu"
        placeholderTextColor={colors.textSecondary}
        multiline
      />
      {errors.description ? (
        <Text style={styles.errorText}>{errors.description}</Text>
      ) : null}

      {/* Technologie */}
      <Text style={styles.label}>Technologie</Text>
      <TextInput
        style={styles.input}
        value={tagsText}
        onChangeText={setTagsText}
        placeholder="React Native, Expo, TypeScript"
        placeholderTextColor={colors.textSecondary}
      />
      <Text style={styles.hint}>Oddziel przecinkami.</Text>

      {/* Link do repozytorium / strony (opcjonalny) */}
      <Text style={styles.label}>Link do GitHub (URL)</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="https://github.com/..."
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
      />
      <Text style={styles.hint}>
        Opcjonalne. Na ekranie projektu pojawi sie przycisk do otwarcia.
      </Text>

      {/* Grafika (opcjonalna) */}
      <Text style={styles.label}>Adres grafiki (URL)</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="https://..."
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
      />
      <Text style={styles.hint}>
        Opcjonalne. Bez adresu pokaze sie kafelek z inicjalem.
      </Text>

      <Button
        title={editing ? "Zapisz zmiany" : "Dodaj projekt"}
        onPress={handleSave}
        style={styles.save}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
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
  label: {
    color: colors.textPrimary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: fontSize.md,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  inputError: { borderColor: "#F87171" },
  textArea: { minHeight: 100, textAlignVertical: "top" },
  errorText: { color: "#F87171", fontSize: fontSize.sm, marginTop: spacing.xs },
  hint: { color: colors.textSecondary, fontSize: fontSize.xs, marginTop: spacing.xs },
  save: { marginTop: spacing.xl },
});
