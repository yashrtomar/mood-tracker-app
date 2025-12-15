import MonthMoodChart from "@/components/charts/MonthMoodChart";
import SparklineChart from "@/components/charts/SparkLineChart";
import { Colors } from "@/constants/theme";
import { getMoods } from "@/storage/moodStorage";
import { MoodEntry } from "@/types/mood";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Chart = () => {
    const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<number>(
        new Date().getMonth()
    );

    useEffect(() => {
        const loadMoods = async () => {
            const moods = await getMoods();
            const sorted = moods.sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            setMoodHistory(sorted);
        };
        loadMoods();
    }, []);

    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    if (moodHistory.length === 0) {
        return <Text style={styles.emptyText}>No data yet</Text>;
    }

    const filteredMoods = moodHistory.filter(
        (m) => new Date(m.date).getMonth() === selectedMonth
    );

    const safeMonthLabels = filteredMoods.map((m) =>
        new Date(m.date).getDate().toString()
    );
    const safeMonthScores = filteredMoods.map((m) => Number(m.score) || 0);

    const fullLabels = moodHistory.map((m) =>
        new Date(m.date).getDate().toString()
    );
    const fullScores = moodHistory.map((m) => Number(m.score) || 0);
    const sparklineLabels = fullLabels.slice(-7);
    const sparklineData = fullScores.slice(-7);

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                padding: 20,
                gap: 24,
                backgroundColor: Colors.background,
            }}
        >
            <MonthMoodChart
                labels={safeMonthLabels}
                data={safeMonthScores}
                monthNames={monthNames}
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
                chartWidth={screenWidth - 72}
            />

            <SparklineChart
                labels={sparklineLabels}
                data={sparklineData}
                chartWidth={screenWidth - 72}
            />

            {/* Bar Chart */}
            {/* <View style={styles.card}>
          <Text style={styles.title}>Daily Mood Bar Chart</Text>{" "}
          <BarChart
            data={{
              labels: safeMonthLabels,
              datasets: [{ data: safeMonthScores }],
            }}
            width={screenWidth - 72}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={styles.chartStyle}
          />
      </View> */}
        </ScrollView>
    );
};

export default Chart;

const styles = StyleSheet.create({
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: Colors.textSecondary,
    },
});
