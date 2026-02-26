import { View, FlatList } from 'react-native';
import { Trophy, Medal, Star } from 'lucide-react-native';
import { PText, PCard } from '../../../components/porcelain';
import { pageClass, pagePadClass } from '../../../lib/styles';
import { usePorcelainTheme } from '../../../lib/theme';

// ─── Jade success colour for top ranks ───────────────────────────────────────

const JADE = '#3F7863';

// ─── Mock Leaderboard Data ───────────────────────────────────────────────────

const LEADERBOARD_DATA = [
    { id: '1', rank: 1, name: 'Alchemists', school: 'Lincoln High', score: 2850, delta: '+210' },
    { id: '2', rank: 2, name: 'Bohr Biters', school: 'Edison Academy', score: 2720, delta: '+185' },
    { id: '3', rank: 3, name: 'Curie Cats', school: 'Newton Prep', score: 2580, delta: '+90' },
    { id: '4', rank: 4, name: 'Darwin Stars', school: 'Faraday School', score: 2340, delta: '+65' },
    { id: '5', rank: 5, name: 'Edison Squad', school: 'Kepler College', score: 2120, delta: '+45' },
    { id: '6', rank: 6, name: 'Fibonacci Force', school: 'Tesla Academy', score: 1980, delta: '+30' },
    { id: '7', rank: 7, name: 'Galileo Gang', school: 'Pascal High', score: 1810, delta: '+20' },
    { id: '8', rank: 8, name: 'Hawking Heroes', school: 'Planck Institute', score: 1640, delta: '+10' },
    { id: '9', rank: 9, name: 'Icarus Flyers', school: 'Wright Middle', score: 1520, delta: '+5' },
    { id: '10', rank: 10, name: 'Joule Giants', school: 'Kelvin School', score: 1410, delta: '+2' },
];

// ─── Rank badge colours ──────────────────────────────────────────────────────

const RANK_BADGE: Record<number, { bg: string; fg: string }> = {
    1: { bg: '#F59E0B22', fg: '#F59E0B' }, // Gold
    2: { bg: '#94A3B822', fg: '#94A3B8' }, // Silver
    3: { bg: '#B4530922', fg: '#B45309' }, // Bronze
};

// ─── Leaderboard Screen ──────────────────────────────────────────────────────

export default function Leaderboard() {
    const { scheme } = usePorcelainTheme();

    return (
        <View className={`${pageClass} ${pagePadClass} pt-16`}>
            {/* Header */}
            <View className="flex-row items-center gap-4 mb-2">
                <Trophy size={32} color="#F59E0B" />
                <PText variant="h1">Leaderboard</PText>
            </View>
            <PText variant="caption" className="mb-8">Top performing teams across all challenges</PText>

            <FlatList
                data={LEADERBOARD_DATA}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isTop3 = item.rank <= 3;
                    const badge = RANK_BADGE[item.rank];

                    return (
                        <PCard
                            className="mb-3 flex-row items-center gap-4"
                            elevated={item.rank === 1}
                        >
                            {/* Rank badge */}
                            <View
                                className="w-10 h-10 rounded-full items-center justify-center"
                                style={{
                                    backgroundColor: badge ? badge.bg : (scheme === 'dark' ? '#3E424830' : '#E2E6E830'),
                                }}
                            >
                                {isTop3 ? (
                                    <Medal size={18} color={badge!.fg} />
                                ) : (
                                    <PText variant="label" className="text-text/40">
                                        {item.rank}
                                    </PText>
                                )}
                            </View>

                            {/* Team info */}
                            <View className="flex-1">
                                <PText variant="label">{item.name}</PText>
                                <PText variant="caption">{item.school}</PText>
                            </View>

                            {/* Score — Jade green for top 3 */}
                            <View className="items-end">
                                <PText
                                    variant="h3"
                                    className={isTop3 ? "" : "text-primary"}
                                    style={isTop3 ? { color: JADE } : undefined}
                                >
                                    {item.score.toLocaleString()}
                                </PText>
                                <View className="flex-row items-center gap-1">
                                    {isTop3 && <Star size={10} color={JADE} />}
                                    <PText
                                        variant="caption"
                                        style={isTop3 ? { color: JADE } : undefined}
                                    >
                                        {item.delta} today
                                    </PText>
                                </View>
                            </View>
                        </PCard>
                    );
                }}
            />
        </View>
    );
}
