import { Colors } from "@/constants/theme";
import { MoodEntry } from "@/types/mood";
import { getMoodColor } from "@/utils/mood";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    item: MoodEntry;
    onDelete: (id: string) => void;
};

const MoodHistoryItem = ({ item, onDelete }: Props) => {
    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <View
                    style={[
                        styles.moodDot,
                        { backgroundColor: getMoodColor(item.score) },
                    ]}
                />
                <View style={styles.textBlock}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.scoreText}>{item.score}</Text>
                    {item.note ? (
                        <Text style={styles.noteText} numberOfLines={2}>
                            {item.note}
                        </Text>
                    ) : null}
                </View>
            </View>
            <Pressable onPress={() => onDelete(item.id)} hitSlop={10}>
                <Image
                    source={require("../assets/icons/trash-icon.png")}
                    style={{ width: 24, height: 24 }}
                />
            </Pressable>
        </View>
    );
};

export default MoodHistoryItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        flex: 1,
    },
    moodDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    textBlock: {
        flex: 1,
    },
    dateText: {
        fontSize: 16,
        color: Colors.textPrimary,
    },
    scoreText: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.textPrimary,
        marginTop: 2,
    },
    noteText: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 4,
    },
});
