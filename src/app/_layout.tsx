import { Stack } from "expo-router";
import { colors } from "@/constants/theme";

// Ekran startowy (menu) jako kotwica nawigacji
export const unstable_settings = {
  initialRouteName: "index",
};

// Glowny uklad — stos ekranow z menu jako ekranem startowym
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="projects" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="add-project" />
      <Stack.Screen name="project/[id]" />
    </Stack>
  );
}
