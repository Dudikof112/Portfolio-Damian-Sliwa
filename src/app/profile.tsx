import { ScrollView, View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { goBack } from "@/utils/nav";
import { colors, spacing, radius } from "@/constants/theme";
import { ScreenHeader } from "@/components/ScreenHeader";

// Zaslepka ekranu — pelna wersja w kolejnej czesci
export default function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.flex}>
          <ScreenHeader label="Poznaj mnie" title="O mnie" />
        </View>
        <Pressable style={styles.backButton} onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>
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
});
