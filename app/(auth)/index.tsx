import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { PText, PButton } from '../../components/porcelain';
import { pageClass, pagePadClass, cardClass } from '../../lib/styles';
import { Shield, Users, Zap } from 'lucide-react-native';
import { usePorcelainTheme } from '../../lib/theme';

export default function TeamRegistration() {
    const { colors } = usePorcelainTheme();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={`${pageClass}`}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className={pagePadClass}>
                {/* Header */}
                <View className="mt-16 mb-10 items-center">
                    <View className="w-16 h-16 rounded-full bg-primary dark:bg-dark-primary items-center justify-center mb-6">
                        <Shield size={32} color="#FFFFFF" />
                    </View>
                    <PText variant="h1" className="text-center mb-2">STEMM Games</PText>
                    <PText variant="caption" className="text-center">Register your team to begin the challenge</PText>
                </View>

                {/* Feature Pills */}
                <View className="flex-row gap-3 mb-10 justify-center flex-wrap">
                    {[
                        { icon: <Users size={14} color={colors.primary} />, label: 'Team Play' },
                        { icon: <Zap size={14} color={colors.primary} />, label: 'Live Scoring' },
                    ].map((item) => (
                        <View
                            key={item.label}
                            className="flex-row items-center gap-2 px-4 py-2 rounded-full border border-border dark:border-dark-border bg-surface dark:bg-dark-surface"
                        >
                            {item.icon}
                            <PText variant="label">{item.label}</PText>
                        </View>
                    ))}
                </View>

                {/* Registration Card */}
                <View className={`${cardClass} p-6 mb-6`}>
                    <PText variant="h3" className="mb-1">Team Details</PText>
                    <PText variant="caption" className="mb-4">Fill in your team info to get started.</PText>
                    <View className="h-12 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background px-4 justify-center mb-4">
                        <PText variant="caption">Team Name</PText>
                    </View>
                    <View className="h-12 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background px-4 justify-center">
                        <PText variant="caption">School / Institution</PText>
                    </View>
                </View>

                {/* CTA */}
                <PButton variant="primary" label="Register Team" className="mb-4" />
                <PButton variant="outline" label="Already have a team? Sign In" />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
