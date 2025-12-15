import MoodSlider from "@/components/MoodSlider";
import { randomUUID } from "expo-crypto";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import MoodNote from "@/components/MoodNote";
import NavigationLinks from "@/components/buttons/NavigationLinks";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { Colors } from "@/constants/theme";
import { getMoods, saveOrUpdateMood } from "@/storage/moodStorage";
import { MoodEntry } from "@/types/mood";
import { getTodaysDate } from "@/utils/date";
import { sanitizeMoodScore } from "@/utils/mood";
import {
    requestNotificationPermission,
    scheduleDailyMoodReminder,
} from "@/utils/notifications";

const Today = () => {
    const [moodValue, setMoodValue] = useState(50);
    const [moodNote, setMoodNote] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [existingId, setExistingId] = useState<string | null>(null);

    const minSliderValue = 0;
    const maxSliderValue = 100;

    useEffect(() => {
        const setupNotification = async () => {
            const granted = await requestNotificationPermission();
            if (granted) await scheduleDailyMoodReminder();
        };
        setupNotification();
    }, []);

    useEffect(() => {
        const loadTodaysMood = async () => {
            try {
                const moods = await getMoods();
                const today = getTodaysDate();
                const todaysMood = moods.find((m) => m.date === today);

                if (todaysMood) {
                    setMoodValue(todaysMood.score);
                    setMoodNote(todaysMood.note ?? "");
                    setExistingId(todaysMood.id);
                    setIsEditing(true);
                }
            } catch (e) {
                console.error("Failed to load today's mood", e);
            }
        };
        loadTodaysMood();
    }, []);

    const handleSaveMood = async () => {
        try {
            const today = getTodaysDate();
            const safeMoodValue = sanitizeMoodScore(moodValue);

            const entry: MoodEntry = {
                id: existingId ?? randomUUID(),
                date: today,
                score: safeMoodValue,
                note: moodNote.trim() || undefined,
            };

            await saveOrUpdateMood(entry);
            setExistingId(entry.id);
            setIsEditing(true);

            Alert.alert(
                isEditing ? "Updated" : "Saved",
                `Your mood has been ${
                    isEditing ? "updated" : "saved"
                } for today.`
            );
        } catch (error) {
            Alert.alert("Error", "Failed to save mood.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greetingText}>Hello there!</Text>
                <Text style={styles.greetingText}>
                    How are you feeling today ?
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.moodLabel}>Slide to match your mood</Text>
                <MoodSlider
                    minSliderValue={minSliderValue}
                    maxSliderValue={maxSliderValue}
                    sliderValue={moodValue}
                    onslidermove={setMoodValue}
                />

                <MoodNote value={moodNote} onChange={setMoodNote} />
                <PrimaryButton isEditing={isEditing} onPress={handleSaveMood} />
            </View>

            <NavigationLinks />
        </View>
    );
};

export default Today;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
        justifyContent: "space-evenly",
    },
    header: { marginTop: 40, marginBottom: 32 },
    greetingText: { fontSize: 32, color: Colors.textPrimary },
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
        gap: 16,
    },
    moodLabel: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: "center",
    },
});
