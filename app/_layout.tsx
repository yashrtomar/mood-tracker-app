import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ statusBarStyle: "dark" }}>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
                name="History"
                options={{
                    title: "Mood History",
                    headerBackButtonDisplayMode: "minimal",
                }}
            />
            <Stack.Screen
                name="Chart"
                options={{
                    title: "Mood Charts",
                    headerBackButtonDisplayMode: "minimal",
                }}
            />
        </Stack>
    );
}
