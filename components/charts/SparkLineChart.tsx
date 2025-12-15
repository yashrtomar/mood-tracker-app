import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

type Props = {
    labels: string[];
    data: number[];
    chartWidth: number;
};

const SparklineChart = ({ labels, data, chartWidth }: Props) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>7-Day Mood Sparkline</Text>
            <LineChart
                data={{ labels, datasets: [{ data }] }}
                width={chartWidth} // pass from parent if needed
                height={220}
                yAxisInterval={10}
                chartConfig={{
                    backgroundColor: Colors.card,
                    backgroundGradientFrom: Colors.card,
                    backgroundGradientTo: Colors.card,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                    propsForDots: { r: "3", strokeWidth: "1", stroke: "#000" },
                }}
                style={styles.chartStyle}
            />
        </View>
    );
};

export default SparklineChart;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
        color: Colors.textPrimary,
    },
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
        marginLeft: -32,
    },
    chartWidth: {
        width: 0, // placeholder, set from parent
    },
});
