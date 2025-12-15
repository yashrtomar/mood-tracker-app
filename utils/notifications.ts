import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const isExpoGo = Constants.appOwnership === "expo";

/**
 * Ask notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
    if (isExpoGo) {
        console.log("Notification permission skipped (Expo Go limitation)");
        return false;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
}

/**
 * Schedule daily mood reminder at 9 PM
 */
export async function scheduleDailyMoodReminder(): Promise<void> {
    if (isExpoGo) {
        return;
    }

    // Android requires a notification channel
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("daily-mood", {
            name: "Daily Mood Reminder",
            importance: Notifications.AndroidImportance.DEFAULT,
        });
    }

    // Prevent duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Mood Check 🌱",
            body: "How are you feeling today? Log your mood.",
        },
        trigger: {
            hour: 21, // 9 PM
            minute: 0,
            repeats: true,
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        },
    });
}
