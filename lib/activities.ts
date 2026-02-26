// ─── Activity Data Configuration ─────────────────────────────────────────────
// Central registry for every activity in the STEMM Games app.

import { COLORS } from './theme';

export interface StatField {
    label: string;
    unit: string;
    /** Returns a random mock value each call */
    generate: () => string;
}

export interface ActivityConfig {
    id: string;
    title: string;
    category: string;
    /** Category color key for the master palette */
    categoryKey: keyof typeof COLORS.light;
    stats: [StatField, StatField, StatField];
    maxAttempts: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const rand = (min: number, max: number, decimals = 1) =>
    (Math.random() * (max - min) + min).toFixed(decimals);

// ─── Engineering Challenges ─────────────────────────────────────────────────

export const ACTIVITIES: Record<string, ActivityConfig> = {
    parachute: {
        id: 'parachute',
        title: 'Parachute Drop',
        category: 'Engineering Challenge',
        categoryKey: 'engineering',
        maxAttempts: 3,
        stats: [
            { label: 'Fall Time', unit: 's', generate: () => rand(1.5, 4.5) },
            { label: 'G-Force', unit: 'G', generate: () => rand(0.8, 2.4) },
            { label: 'Drag', unit: 'N', generate: () => rand(0.2, 1.8) },
        ],
    },
    'sound-hunter': {
        id: 'sound-hunter',
        title: 'Sound Hunter',
        category: 'Engineering Challenge',
        categoryKey: 'engineering',
        maxAttempts: 3,
        stats: [
            { label: 'Avg dB', unit: 'dB', generate: () => rand(40, 85, 0) },
            { label: 'Peak dB', unit: 'dB', generate: () => rand(60, 110, 0) },
            { label: 'GPS Location', unit: '', generate: () => `${rand(-90, 90, 4)}, ${rand(-180, 180, 4)}` },
        ],
    },
    'hand-fan': {
        id: 'hand-fan',
        title: 'Hand-Fan Engineering',
        category: 'Engineering Challenge',
        categoryKey: 'engineering',
        maxAttempts: 3,
        stats: [
            { label: 'Distance', unit: 'cm', generate: () => rand(5, 60, 0) },
            { label: 'Bend Angle', unit: 'deg', generate: () => rand(10, 90, 0) },
            { label: 'Stiffness', unit: 'k', generate: () => rand(0.1, 5.0) },
        ],
    },
    earthquake: {
        id: 'earthquake',
        title: 'Earthquake Tower',
        category: 'Engineering Challenge',
        categoryKey: 'engineering',
        maxAttempts: 3,
        stats: [
            { label: 'Vibration', unit: 'deg', generate: () => rand(1, 25, 1) },
            { label: 'Stability', unit: '%', generate: () => rand(40, 99, 0) },
            { label: 'Height', unit: 'cm', generate: () => rand(15, 80, 0) },
        ],
    },

    // ─── Arts & Performance ──────────────────────────────────────────────────

    performance: {
        id: 'performance',
        title: 'Performance Showcase',
        category: 'Arts Challenge',
        categoryKey: 'arts',
        maxAttempts: 3,
        stats: [
            { label: 'Duration', unit: 's', generate: () => rand(30, 180, 0) },
            { label: 'Audience', unit: '👥', generate: () => rand(5, 50, 0) },
            { label: 'Score', unit: '/10', generate: () => rand(5.0, 10.0) },
        ],
    },

    // ─── Science / Reaction ──────────────────────────────────────────────────

    reaction: {
        id: 'reaction',
        title: 'Reaction Timer',
        category: 'Science Challenge',
        categoryKey: 'science',
        maxAttempts: 3,
        stats: [
            { label: 'Reaction', unit: 'ms', generate: () => rand(150, 450, 0) },
            { label: 'Accuracy', unit: '%', generate: () => rand(60, 99, 0) },
            { label: 'Attempts', unit: '', generate: () => rand(1, 10, 0) },
        ],
    },

    // ─── Health / Breathing ──────────────────────────────────────────────────

    breathing: {
        id: 'breathing',
        title: 'Breathing Exercise',
        category: 'Health Challenge',
        categoryKey: 'health',
        maxAttempts: 3,
        stats: [
            { label: 'BPM', unit: 'bpm', generate: () => rand(55, 100, 0) },
            { label: 'SpO2', unit: '%', generate: () => rand(94, 100, 0) },
            { label: 'Duration', unit: 's', generate: () => rand(30, 120, 0) },
        ],
    },

    // ─── Health & Medical Sciences (Frosted Mint) ────────────────────────────

    'human-performance': {
        id: 'human-performance',
        title: 'Human Performance',
        category: 'Health & Medical Sciences',
        categoryKey: 'medicine',
        maxAttempts: 3,
        stats: [
            { label: 'Coordination', unit: '%', generate: () => rand(40, 99, 0) },
            { label: 'Smoothness', unit: '', generate: () => rand(1.0, 5.0) },
            { label: 'Shake Level', unit: 'hz', generate: () => rand(0.5, 8.0) },
        ],
    },

    'reaction-board': {
        id: 'reaction-board',
        title: 'Reaction Board',
        category: 'Health & Medical Sciences',
        categoryKey: 'medicine',
        maxAttempts: 3,
        stats: [
            { label: 'Left Hand', unit: 'ms', generate: () => rand(150, 500, 0) },
            { label: 'Right Hand', unit: 'ms', generate: () => rand(150, 500, 0) },
            { label: 'Accuracy', unit: '%', generate: () => rand(60, 99, 0) },
        ],
    },

    'breathing-pace': {
        id: 'breathing-pace',
        title: 'Breathing Pace',
        category: 'Health & Medical Sciences',
        categoryKey: 'medicine',
        maxAttempts: 3,
        stats: [
            { label: 'BPM Rest', unit: 'bpm', generate: () => rand(55, 80, 0) },
            { label: 'BPM Post-Exer.', unit: 'bpm', generate: () => rand(100, 180, 0) },
            { label: 'Recovery Rate', unit: '/min', generate: () => rand(5, 25, 0) },
        ],
    },
};

/** Ordered list of activity IDs for iteration/rendering */
export const ACTIVITY_IDS = Object.keys(ACTIVITIES);

/** Retrieves config or returns undefined for unknown IDs */
export function getActivity(id: string): ActivityConfig | undefined {
    return ACTIVITIES[id];
}
