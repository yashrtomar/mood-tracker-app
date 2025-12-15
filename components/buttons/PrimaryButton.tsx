import { Colors } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type PrimaryButtonProps = {
    isEditing: boolean;
    onPress: () => void;
};

const PrimaryButton = ({ isEditing, onPress }: PrimaryButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && { backgroundColor: Colors.primaryDark },
            ]}
            onPress={onPress}
        >
            <Text style={styles.text}>{isEditing ? "Update" : "Save"}</Text>
        </Pressable>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
    },
    text: { color: "#fff", fontSize: 17, fontWeight: "600" },
});
