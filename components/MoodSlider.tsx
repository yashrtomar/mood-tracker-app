import { Colors } from "@/constants/theme";
import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type MooderSliderParams = {
    minSliderValue: number;
    maxSliderValue: number;
    sliderValue: number;
    onslidermove: React.Dispatch<React.SetStateAction<number>>;
};

const getMoodEmoji = (value: number) => {
    if (value <= 20) return "😞";
    if (value <= 40) return "😕";
    if (value <= 60) return "😐";
    if (value <= 80) return "🙂";
    return "😄";
};

const MoodSlider = ({
    minSliderValue,
    maxSliderValue,
    onslidermove,
    sliderValue,
}: MooderSliderParams) => {
    return (
        <View style={styles.container}>
            {/* Emoji feedback */}
            <Text style={styles.emoji}>{getMoodEmoji(sliderValue)}</Text>

            {/* Slider */}
            <View style={styles.sliderWrapper}>
                <Slider
                    minimumValue={minSliderValue}
                    maximumValue={maxSliderValue}
                    step={25}
                    value={sliderValue}
                    onValueChange={onslidermove}
                    minimumTrackTintColor={Colors.primary}
                    maximumTrackTintColor="#D1D5DB"
                    thumbTintColor={Colors.primary}
                    renderStepNumber
                    style={styles.slider}
                />
            </View>
        </View>
    );
};

export default MoodSlider;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },

    emoji: {
        fontSize: 32,
        // marginBottom: 8,
    },

    sliderWrapper: {
        width: "100%",
        backgroundColor: Colors.card,
        borderRadius: 14,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },

    slider: {
        width: "100%",
        height: 64,
    },
});
