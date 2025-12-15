import { Colors } from "@/constants/theme";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const NavigationLinks = () => {
    return (
        <View style={styles.container}>
            <Link href={"/History"} asChild>
                <Pressable style={styles.link}>
                    <Text style={styles.linkText}>History</Text>
                </Pressable>
            </Link>

            <Link href={"/Chart"} asChild>
                <Pressable style={styles.link}>
                    <Text style={styles.linkText}>Graphs</Text>
                </Pressable>
            </Link>
        </View>
    );
};

export default NavigationLinks;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 32,
    },
    link: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: Colors.card,
        alignItems: "center",
        marginHorizontal: 6,
    },
    linkText: {
        color: Colors.primary,
        fontSize: 15,
        fontWeight: "500",
    },
});
