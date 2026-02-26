import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
    Trophy, Rocket, Volume2, Wind, Building2,
    Zap, Heart, LayoutGrid, Sun, Moon,
} from 'lucide-react-native';
import { PText, PCard, PButton } from '../../../components/porcelain';
import { pageClass, pagePadClass } from '../../../lib/styles';
import { usePorcelainTheme } from '../../../lib/theme';
import { useTeam } from '../../../lib/TeamContext';

import { COLORS } from '../../../lib/theme';

const SECTIONS = [
    {
        title: 'Engineering Challenges',
        description: 'Building the future of STEMM',
        categoryKey: 'engineering' as keyof typeof COLORS.light,
        items: [
            { id: 'parachute', title: 'Parachute Drop', icon: Rocket },
            { id: 'sound-hunter', title: 'Sound Hunter', icon: Volume2 },
            { id: 'hand-fan', title: 'Hand-Fan Engineering', icon: Wind },
            { id: 'earthquake', title: 'Earthquake Tower', icon: Building2 },
        ],
    },
    {
        title: 'Health & Medical Sciences',
        description: 'Optimising human performance',
        categoryKey: 'health' as keyof typeof COLORS.light,
        items: [
            { id: 'human-performance', title: 'Human Performance', icon: Heart },
            { id: 'reaction-board', title: 'Reaction Board', icon: Zap },
            { id: 'breathing-pace', title: 'Breathing Pace', icon: Wind },
        ],
    },
];

// ─── Dashboard ───────────────────────────────────────────────────────────────

export default function Dashboard() {
    const { scheme, themeMode, setThemeMode } = usePorcelainTheme();
    const { team } = useTeam();
    const router = useRouter();

    const toggleTheme = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <ScrollView className={pageClass}>
            <View className={`${pagePadClass} pt-20 pb-12`}>

                {/* ── Welcome Header ────────────────────────────────────────────── */}
                <View className="mb-10 flex-row justify-between items-start">
                    <View className="flex-1">
                        <PText variant="caption" className="mb-1">Logged in as Team</PText>
                        <PText variant="h1">
                            Welcome, {team?.teamName ?? 'Guest'}
                            <PText variant="h1" className="text-primary/50">
                                {' '}#{team?.discriminator ?? '0000'}
                            </PText>
                        </PText>
                        <PText variant="caption" className="mt-2">
                            {team?.gradeLevel ? `${team.gradeLevel}  ·  ` : ''} 2026 Lab Hub
                        </PText>
                    </View>

                    <TouchableOpacity
                        onPress={toggleTheme}
                        activeOpacity={0.7}
                        className="p-3 rounded-2xl bg-surface border border-border"
                    >
                        {themeMode === 'light' ? (
                            <Moon size={20} color={scheme === 'dark' ? '#F0F4F4' : '#2D3E40'} />
                        ) : (
                            <Sun size={20} color={scheme === 'dark' ? '#F0F4F4' : '#2D3E40'} />
                        )}
                    </TouchableOpacity>
                </View>

                {/* ── Score Summary ─────────────────────────────────────────────── */}
                <PCard elevated className="mb-10 flex-row items-center justify-between">
                    <View>
                        <PText variant="label" className="mb-1">Season Score</PText>
                        <PText variant="h1">1,240 pts</PText>
                        <PText variant="caption">+120 gained currently</PText>
                    </View>
                    <TouchableOpacity
                        className="w-14 h-14 rounded-full bg-primary/10 items-center justify-center"
                        onPress={() => router.push('/(main)/leaderboard' as any)}
                    >
                        <Trophy size={26} color={COLORS[scheme].engineering} />
                    </TouchableOpacity>
                </PCard>

                {/* ── Challenge Sections ────────────────────────────────────────── */}
                {SECTIONS.map((section) => (
                    <View key={section.title} className="mb-10">
                        <View className="flex-row items-center justify-between mb-5 px-1">
                            <View>
                                <PText variant="h3">{section.title}</PText>
                                <PText variant="caption">{section.description}</PText>
                            </View>
                            <LayoutGrid size={20} color={COLORS[scheme][section.categoryKey] + '60'} />
                        </View>

                        <View className="flex-row flex-wrap gap-3">
                            {section.items.map((item) => {
                                const activeColor = COLORS[scheme][section.categoryKey];
                                return (
                                    <PCard
                                        key={item.id}
                                        className="w-[48%] p-5 items-center justify-center"
                                        onPress={() => router.push(`/(main)/activities/${item.id}` as any)}
                                    >
                                        <View
                                            className="w-12 h-12 rounded-2xl items-center justify-center mb-4"
                                            style={{ backgroundColor: activeColor + '15' }}
                                        >
                                            <item.icon size={22} color={activeColor} />
                                        </View>
                                        <PText variant="label" className="text-center">{item.title}</PText>
                                    </PCard>
                                );
                            })}
                        </View>
                    </View>
                ))}

                {/* ── Global Leaderboard Footer ─────────────────────────────────── */}
                <View className="mt-4 pt-10 border-t border-border">
                    <PButton
                        variant="accent"
                        label=" View Global Leaderboard"
                        onPress={() => router.push('/(main)/leaderboard' as any)}
                    />
                </View>

            </View>
        </ScrollView>
    );
}
