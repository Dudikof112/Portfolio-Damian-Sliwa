import { Stack } from "expo-router";
import { colors } from "@/constants/theme";

// Ekran (tabs) jako kotwica nawigacji — zapewnia cel powrotu przy wejsciu w glab
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Glowny uklad aplikacji — stos z zakladkami oraz ekranami szczegolowymi
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add" />
      <Stack.Screen name="habit/[id]" />
      <Stack.Screen name="habits" />
    </Stack>
  );
}