import { MoodEntry } from "@/types/mood";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const STORAGE_KEY = "MOODS";

export async function seedMoods(): Promise<void> {
    const seedData: MoodEntry[] = [
        {
            id: randomUUID(),
            date: "2025-12-01",
            score: 65,
            note: "Normal workday",
        },
        {
            id: randomUUID(),
            date: "2025-12-02",
            score: 72,
            note: "Went to the gym",
        },
        {
            id: randomUUID(),
            date: "2025-12-03",
            score: 40,
            note: "Low energy",
        },
        {
            id: randomUUID(),
            date: "2025-12-04",
            score: 55,
            note: "Busy but manageable",
        },
        {
            id: randomUUID(),
            date: "2025-12-05",
            score: 80,
            note: "Very productive day",
        },
        {
            id: randomUUID(),
            date: "2025-12-06",
            score: 30,
            note: "Bad sleep",
        },
        {
            id: randomUUID(),
            date: "2025-12-07",
            score: 60,
        },
        {
            id: randomUUID(),
            date: "2025-12-08",
            score: 90,
            note: "Great mood overall",
        },
        {
            id: randomUUID(),
            date: "2025-12-09",
            score: 50,
            note: "Average day",
        },
        {
            id: randomUUID(),
            date: "2025-12-10",
            score: 70,
            note: "Feeling balanced",
        },
    ];

    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
        console.log("✅ Seed data inserted");
    } catch (e) {
        console.error("❌ Failed to seed data", e);
    }
}
