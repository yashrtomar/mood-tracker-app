export function sanitizeMoodScore(value: unknown): number {
    const num = Number(value);

    if (Number.isNaN(num)) return 0;

    return Math.min(100, Math.max(0, Math.round(num)));
}

export function getMoodColor(score: number): string {
    if (score <= 50) {
        // interpolate red → yellow
        const green = Math.floor((score / 50) * 255);
        return `rgb(255, ${green}, 0)`; // red → yellow
    } else {
        // interpolate yellow → green
        const red = Math.floor(255 - ((score - 50) / 50) * 255);
        return `rgb(${red}, 255, 0)`; // yellow → green
    }
}

export function getMoodLabel(score: number): string {
    if (score < 25) return "Very Low";
    if (score < 50) return "Low";
    if (score < 75) return "Good";
    return "Great";
}
