import { View, FlatList } from 'react-native';
import { Trophy, Medal, Star } from 'lucide-react-native';
import { PText, PCard } from '../../../components/porcelain';
import { pageClass, pagePadClass } from '../../../lib/styles';
import { usePorcelainTheme, COLORS } from '../../../lib/theme';

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

// ─── Leaderboard Screen ──────────────────────────────────────────────────────

export default function Leaderboard() {
    const { scheme } = usePorcelainTheme();

    const getRankColors = (rank: number) => {
        if (rank === 1) return { bg: COLORS[scheme].gold + '22', fg: COLORS[scheme].gold };
        if (rank === 2) return { bg: COLORS[scheme].silver + '22', fg: COLORS[scheme].silver };
        if (rank === 3) return { bg: COLORS[scheme].bronze + '22', fg: COLORS[scheme].bronze };
        return { bg: COLORS[scheme].border + '30', fg: COLORS[scheme].textMuted };
    };

    return (
        <View className={`${pageClass} ${pagePadClass} pt-16`}>
            {/* Header */}
            <View className="flex-row items-center gap-4 mb-2">
                <Trophy size={32} color={COLORS[scheme].gold} />
                <PText variant="h1">Leaderboard</PText>
            </View>
            <PText variant="caption" className="mb-8">Top performing teams across all challenges</PText>

            <FlatList
                data={LEADERBOARD_DATA}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isTop3 = item.rank <= 3;
                    const badge = getRankColors(item.rank);
                    const jadeColor = COLORS[scheme].jade;

                    return (
                        <PCard
                            className="mb-3 flex-row items-center gap-4"
                            elevated={item.rank === 1}
                        >
                            {/* Rank badge */}
                            <View
                                className="w-10 h-10 rounded-full items-center justify-center"
                                style={{ backgroundColor: badge.bg }}
                            >
                                {isTop3 ? (
                                    <Medal size={18} color={badge.fg} />
                                ) : (
                                    <PText variant="label" className="text-text-muted">
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
                                    style={{ color: isTop3 ? jadeColor : COLORS[scheme].primary }}
                                >
                                    {item.score.toLocaleString()}
                                </PText>
                                <View className="flex-row items-center gap-1">
                                    {isTop3 && <Star size={10} color={jadeColor} />}
                                    <PText
                                        variant="caption"
                                        style={isTop3 ? { color: jadeColor } : undefined}
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
