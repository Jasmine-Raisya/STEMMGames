import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, Sparkles } from 'lucide-react-native';
import { PText, PButton, PCard } from '../components/porcelain';
import { pageClass, pagePadClass } from '../lib/styles';
import { useTeam } from '../lib/TeamContext';
import { usePorcelainTheme, COLORS } from '../lib/theme';

export default function RegistrationScreen() {
    const router = useRouter();
    const { setTeam } = useTeam();
    const { scheme } = usePorcelainTheme();

    const [form, setForm] = useState({
        teamName: '',
        members: '',
        gradeLevel: '',
    });

    const handleStartLab = () => {
        if (!form.teamName) return;

        const discriminator = Math.floor(1000 + Math.random() * 9000).toString();
        setTeam({
            ...form,
            discriminator,
        });

        router.replace('/(main)/dashboard');
    };

    const inputClass = "h-14 rounded-xl border border-border bg-surface px-4 font-inter text-text mb-4";

    const placeholderColor = scheme === 'dark' ? 'rgba(240, 244, 244, 0.3)' : 'rgba(45, 62, 64, 0.3)';

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={pageClass}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className={pagePadClass}>
                <View className="mt-20 mb-10 items-center">
                    <View
                        className="w-20 h-20 rounded-3xl items-center justify-center mb-6 rotate-3 bg-primary"
                    >
                        <Shield size={40} color="#FFFFFF" />
                    </View>
                    <PText variant="h1" className="text-center mb-2">STEMM Games</PText>
                    <PText variant="caption" className="text-center">2026 Season Registration</PText>
                </View>

                <PCard className="mb-8">
                    <View className="flex-row items-center gap-2 mb-6">
                        <Sparkles size={18} color={COLORS[scheme].primary} />
                        <PText variant="h3">Team Registration</PText>
                    </View>

                    <PText variant="label" className="mb-2 ml-1">Team Name</PText>
                    <TextInput
                        className={inputClass}
                        placeholder="Enter team name..."
                        placeholderTextColor={placeholderColor}
                        value={form.teamName}
                        onChangeText={(v) => setForm(f => ({ ...f, teamName: v }))}
                    />

                    <PText variant="label" className="mb-2 ml-1">Member Names</PText>
                    <TextInput
                        className={inputClass}
                        placeholder="Alice, Bob, Charlie..."
                        placeholderTextColor={placeholderColor}
                        value={form.members}
                        onChangeText={(v) => setForm(f => ({ ...f, members: v }))}
                    />

                    <PText variant="label" className="mb-2 ml-1">Grade Level</PText>
                    <TextInput
                        className={inputClass}
                        placeholder="e.g. Grade 10"
                        placeholderTextColor={placeholderColor}
                        value={form.gradeLevel}
                        onChangeText={(v) => setForm(f => ({ ...f, gradeLevel: v }))}
                    />
                </PCard>

                <PButton
                    variant="primary"
                    label="🚀  Start Lab"
                    onPress={handleStartLab}
                    disabled={!form.teamName}
                />

                <View className="mt-8 items-center">
                    <PText variant="caption">Official Competition Environment</PText>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
