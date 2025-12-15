import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type MoodNoteProps = {
    value: string;
    onChange: (value: string) => void;
};

const MoodNote = ({ value, onChange }: MoodNoteProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Add a note (Optional)"
                value={value}
                onChangeText={onChange}
                style={styles.input}
                multiline
            />
        </View>
    );
};

export default MoodNote;

const styles = StyleSheet.create({
    container: { width: "100%" },
    input: {
        backgroundColor: Colors.inputBackground,
        borderRadius: 12,
        padding: 14,
        color: Colors.textPrimary,
        minHeight: 60,
    },
});
