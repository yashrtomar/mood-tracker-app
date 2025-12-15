import MoodHistoryItem from "@/components/MoodHistoryItem";
import { Colors } from "@/constants/theme";
import { deleteMood, getMoods } from "@/storage/moodStorage";
import { MoodEntry } from "@/types/mood";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

const History = () => {
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

    useEffect(() => {
        const loadMoodHistory = async () => {
            try {
                const moods = await getMoods();
                const sorted = moods.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setMoodHistory(sorted);
            } catch (e) {
                console.error("Failed to load mood history", e);
            }
        };
        loadMoodHistory();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const updatedMoodHistory = await deleteMood(id);
            setMoodHistory(updatedMoodHistory);
            Alert.alert("Mood History record deleted.");
        } catch (e) {
            Alert.alert("Error", "Failed to delete mood.");
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={moodHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MoodHistoryItem item={item} onDelete={handleDelete} />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No mood history yet.</Text>
                }
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListFooterComponent={<View style={{ height: 28 }} />}
                bounces
                style={{ padding: 20 }}
            />
        </View>
    );
};

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: Colors.background,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: Colors.textSecondary,
    },
});
