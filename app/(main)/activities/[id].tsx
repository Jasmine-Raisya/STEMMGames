import React, { useState, useRef, useCallback } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { CheckCircle2, Video } from 'lucide-react-native';
import { PText, PCard, PButton } from '../../../components/porcelain';
import { pageClass, pagePadClass } from '../../../lib/styles';
import { getActivity, type StatField } from '../../../lib/activities';
import { usePorcelainTheme, COLORS } from '../../../lib/theme';

// ─── Types ───────────────────────────────────────────────────────────────────

type CaptureState = 'idle' | 'capturing' | 'done';

interface AttemptData {
    values: string[];
}

// ─── Activity Screen ─────────────────────────────────────────────────────────

export default function ActivityScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { scheme } = usePorcelainTheme();
    const activity = getActivity(id ?? '');
    const router = useRouter();

    // ── State ──────────────────────────────────────────────────────────────────
    const [attempt, setAttempt] = useState(1);
    const [captureState, setCaptureState] = useState<CaptureState>('idle');
    const [countdown, setCountdown] = useState(10);
    const [attempts, setAttempts] = useState<AttemptData[]>([]);
    const [currentValues, setCurrentValues] = useState<string[]>(['--', '--', '--']);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // ── Capture Logic ──────────────────────────────────────────────────────────

    const startCapture = useCallback(() => {
        if (!activity) return;
        setCaptureState('capturing');
        setCountdown(10);
        progressAnim.setValue(0);

        // Animate progress bar over 10 seconds
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 10_000,
            useNativeDriver: false,
        }).start();

        // Update mock data every second
        let elapsed = 0;
        timerRef.current = setInterval(() => {
            elapsed += 1;
            const newValues = activity.stats.map((s) => s.generate());
            setCurrentValues(newValues);
            setCountdown(10 - elapsed);

            if (elapsed >= 10) {
                clearInterval(timerRef.current!);
                timerRef.current = null;
                const finalValues = activity.stats.map((s) => s.generate());
                setCurrentValues(finalValues);
                setAttempts((prev) => [...prev, { values: finalValues }]);
                setCaptureState('done');
            }
        }, 1_000);
    }, [activity, progressAnim]);

    // Design-Thinking Loop: iterate if attempts remain, otherwise stay on done
    const handleIterate = useCallback(() => {
        if (!activity) return;
        setAttempt((a) => a + 1);
        setCaptureState('idle');
        setCurrentValues(['--', '--', '--']);
        setCountdown(10);
        progressAnim.setValue(0);
    }, [activity, progressAnim]);

    // ── Fallback ───────────────────────────────────────────────────────────────

    if (!activity) {
        return (
            <View className={`${pageClass} items-center justify-center`}>
                <PText variant="h2">Activity not found</PText>
                <PText variant="caption" className="mt-2">ID: {id}</PText>
            </View>
        );
    }

    // ── Derived state ─────────────────────────────────────────────────────────

    const allAttemptsComplete = attempts.length >= activity.maxAttempts;

    const activeColor = COLORS[scheme][activity.categoryKey] || COLORS[scheme].primary;

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView className={pageClass}>
                <View className={`${pagePadClass} pt-16 pb-12`}>

                    {/* ── Header ──────────────────────────────────────────────────── */}
                    <View
                        className="px-3 py-1 rounded-full self-start mb-3"
                        style={{ backgroundColor: activeColor + '18' }}
                    >
                        <PText variant="label" style={{ color: activeColor }}>
                            {activity.category}
                        </PText>
                    </View>
                    <PText variant="h1" className="mb-8">{activity.title}</PText>

                    {/* ── Media Area ──────────────────────────────────────────────── */}
                    <PCard className="mb-6 overflow-hidden">
                        <View
                            className="items-center justify-center rounded-xl bg-surface border border-border"
                            style={{
                                aspectRatio: 16 / 9,
                                borderStyle: 'dashed',
                            }}
                        >
                            <Video size={36} color={activeColor} />
                            <PText variant="label" className="mt-3 text-center">
                                {'📹 Video / Sensor Capture Area'}
                            </PText>
                            {captureState === 'capturing' && (
                                <PText variant="caption" className="mt-1">
                                    Recording... {countdown}s remaining
                                </PText>
                            )}
                        </View>
                    </PCard>

                    {/* ── Stats Grid (3 columns) ──────────────────────────────────── */}
                    <PText variant="h3" className="mb-3">Live Data</PText>
                    <View className="flex-row gap-3 mb-6">
                        {activity.stats.map((stat: StatField, i: number) => (
                            <PCard key={stat.label} className="flex-1 items-center py-4">
                                <PText variant="caption" className="mb-2 text-center">{stat.label}</PText>
                                <PText
                                    variant="h2"
                                    style={{ color: activeColor }}
                                >
                                    {currentValues[i]}
                                </PText>
                                {stat.unit ? (
                                    <PText variant="caption" className="mt-1">{stat.unit}</PText>
                                ) : null}
                            </PCard>
                        ))}
                    </View>

                    {/* ── Iteration Tracker ───────────────────────────────────────── */}
                    <PCard className="mb-6">
                        <View className="flex-row items-center justify-between mb-3">
                            <PText variant="label">Design Loop</PText>
                            <PText variant="caption">
                                Attempt {attempt} of {activity.maxAttempts}
                            </PText>
                        </View>

                        {/* Attempt dots */}
                        <View className="flex-row gap-2 mb-4">
                            {Array.from({ length: activity.maxAttempts }).map((_, i) => (
                                <View
                                    key={i}
                                    className="h-2 flex-1 rounded-full"
                                    style={{
                                        backgroundColor:
                                            i < attempts.length
                                                ? activeColor          // completed
                                                : i === attempts.length && captureState === 'capturing'
                                                    ? activeColor + '60' // in-progress
                                                    : COLORS[scheme].border,                // pending
                                    }}
                                />
                            ))}
                        </View>

                        {/* Capture progress bar */}
                        {captureState === 'capturing' && (
                            <View className="h-2 rounded-full overflow-hidden bg-border">
                                <Animated.View
                                    className="h-2 rounded-full"
                                    style={{
                                        width: progressWidth,
                                        backgroundColor: activeColor,
                                    }}
                                />
                            </View>
                        )}
                    </PCard>

                    {/* ── Completed Attempts ───────────────────────────────────────── */}
                    {attempts.length > 0 && (
                        <>
                            <PText variant="h3" className="mb-3">Completed Attempts</PText>
                            {attempts.map((a, idx) => (
                                <PCard key={idx} className="mb-3 flex-row items-center gap-3">
                                    <View
                                        className="w-8 h-8 rounded-full items-center justify-center"
                                        style={{ backgroundColor: activeColor + '18' }}
                                    >
                                        <CheckCircle2 size={16} color={activeColor} />
                                    </View>
                                    <View className="flex-1">
                                        <PText variant="label">Attempt {idx + 1}</PText>
                                        <PText variant="caption">
                                            {activity.stats.map((s, si) => `${s.label}: ${a.values[si]}${s.unit ? ' ' + s.unit : ''}`).join('  ·  ')}
                                        </PText>
                                    </View>
                                </PCard>
                            ))}
                        </>
                    )}

                    {/* ── Design-Thinking Action Buttons ──────────────────────────── */}
                    <View className="mt-4 gap-3">
                        {/* Start Capture — only if not all attempts done */}
                        {captureState === 'idle' && !allAttemptsComplete && (
                            <PButton
                                variant="primary"
                                label="▶  Start Capture"
                                onPress={startCapture}
                            />
                        )}

                        {/* Capturing — disabled countdown */}
                        {captureState === 'capturing' && (
                            <PButton
                                variant="outline"
                                label={`Capturing... ${countdown}s`}
                                disabled
                            />
                        )}

                        {/* Done — Try Again (Iterate) if more attempts remain */}
                        {captureState === 'done' && !allAttemptsComplete && (
                            <PButton
                                variant="primary"
                                label="↻  Try Again (Iterate)"
                                onPress={handleIterate}
                            />
                        )}

                        {/* Done — Submit & Write Reflection when all 3 done */}
                        {allAttemptsComplete && captureState !== 'capturing' && (
                            <PButton
                                variant="primary"
                                label="✓  Submit & Write Reflection"
                                onPress={() => router.push('/(main)/reflections' as any)}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
