import { Colors } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

type Props = {
    labels: string[];
    data: number[];
    monthNames: string[];
    selectedMonth: number;
    onMonthChange: (month: number) => void;
    chartWidth: number;
};

const MonthMoodChart = ({
    labels,
    data,
    monthNames,
    selectedMonth,
    onMonthChange,
    chartWidth,
}: Props) => {
    const hasData = labels.length > 0;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Mood Over Time</Text>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={onMonthChange}
                    style={{ color: Colors.textPrimary }}
                >
                    {monthNames.map((name, idx) => (
                        <Picker.Item key={idx} label={name} value={idx} />
                    ))}
                </Picker>
            </View>

            {hasData ? (
                <LineChart
                    data={{ labels, datasets: [{ data }] }}
                    width={chartWidth} // will be set in parent
                    height={220}
                    yAxisInterval={10}
                    chartConfig={{
                        backgroundColor: Colors.card,
                        backgroundGradientFrom: Colors.card,
                        backgroundGradientTo: Colors.card,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                        propsForDots: {
                            r: "3",
                            strokeWidth: "1",
                            stroke: "#000",
                        },
                    }}
                    style={styles.chartStyle}
                />
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        No data for {monthNames[selectedMonth]}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default MonthMoodChart;

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
    pickerContainer: {
        backgroundColor: Colors.inputBackground,
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: "90%",
    },
    noDataContainer: {
        backgroundColor: Colors.inputBackground,
        borderRadius: 12,
        height: 220,
        alignItems: "center",
        justifyContent: "center",
    },
    noDataText: {
        color: Colors.textSecondary,
        textAlign: "center",
    },
    chartWidth: {
        width: 0, // placeholder, pass width from parent if needed
    },
});
