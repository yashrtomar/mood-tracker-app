import { MoodEntry } from "@/types/mood";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "MOODS";

/** Load all moods */
export async function getMoods(): Promise<MoodEntry[]> {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    } catch (e) {
        console.error("Failed to load moods", e);
        return [];
    }
}

/** Save or replace mood for a specific date */
export async function saveOrUpdateMood(entry: MoodEntry): Promise<void> {
    try {
        const moods = await getMoods();
        const index = moods.findIndex((m) => m.date === entry.date);

        if (index >= 0) {
            moods[index] = {
                ...moods[index], // ✅ preserves id + date
                score: entry.score,
                note: entry.note,
            };
        } else {
            moods.push(entry);
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(moods));
    } catch (e) {
        throw new Error("Failed to save mood");
    }
}

/** Delete mood by id (bonus feature) */
export async function deleteMood(id: string): Promise<MoodEntry[]> {
    try {
        const moods = await getMoods();
        const updated = moods.filter((m) => m.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    } catch (e) {
        throw new Error("Failed to delete mood");
    }
}
