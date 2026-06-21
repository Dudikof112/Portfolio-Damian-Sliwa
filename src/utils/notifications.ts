// notifications.ts
// Konfiguracja i planowanie lokalnych przypomnien o nawykach.

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Sposob prezentacji powiadomienia, gdy aplikacja jest otwarta
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Identyfikator kanalu powiadomien (wymagany na Androidzie)
const CHANNEL_ID = "habit-reminders";

// Przygotowanie kanalu oraz uzyskanie pozwolenia na powiadomienia
export async function setupNotifications(): Promise<boolean> {
  // Bez kanalu Android po cichu pomija powiadomienia
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Habit reminders",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const settings = await Notifications.getPermissionsAsync();
  let granted = settings.granted;
  if (!granted) {
    const request = await Notifications.requestPermissionsAsync();
    granted = request.granted;
  }
  return granted;
}

// Zamiana tekstu godziny (np. "08:00 PM") na godzine i minute
function parseTime(time: string): { hour: number; minute: number } {
  const match = time.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return { hour: 20, minute: 0 };
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase();
  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

// Zaplanowanie codziennego przypomnienia; zwraca identyfikator powiadomienia
export async function scheduleHabitReminder(
  name: string,
  time: string,
): Promise<string | null> {
  try {
    const { hour, minute } = parseTime(time);
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time for your habit",
        body: name,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        channelId: CHANNEL_ID,
      },
    });
    return id;
  } catch {
    // Brak wsparcia (np. emulator) — powiadomienie jest pomijane bez bledu
    return null;
  }
}

// Anulowanie zaplanowanego powiadomienia
export async function cancelHabitReminder(id: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // Brak powiadomienia do anulowania — pomijane
  }
}
