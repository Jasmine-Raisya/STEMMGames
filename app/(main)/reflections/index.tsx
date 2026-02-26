import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { PenLine } from 'lucide-react-native';
import { PText, PCard, PButton } from '../../../components/porcelain';
import { pageClass, pagePadClass } from '../../../lib/styles';
import { usePorcelainTheme, COLORS } from '../../../lib/theme';
import { useTeam } from '../../../lib/TeamContext';

const PROMPTS = [
    'What was your biggest challenge today?',
    'What teamwork skill did you use?',
    'What would you do differently next time?',
];

export default function Reflections() {
    const { scheme } = usePorcelainTheme();
    const { reflections, addReflection } = useTeam();
    const [text, setText] = useState('');

    const handleSave = () => {
        if (!text.trim()) return;
        addReflection(text.trim());
        setText('');
    };

    const placeholderColor = scheme === 'dark' ? 'rgba(240, 244, 244, 0.3)' : 'rgba(45, 62, 64, 0.3)';

    return (
        <ScrollView className={pageClass}>
            <View className={`${pagePadClass} pt-16 pb-12`}>
                {/* Header */}
                <View className="flex-row items-center gap-4 mb-8">
                    <PenLine size={32} color={COLORS[scheme].primary} />
                    <PText variant="h1">Reflections</PText>
                </View>

                {/* Prompt Chips */}
                <PText variant="label" className="mb-3">Try a prompt:</PText>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                    className="mb-8"
                >
                    {PROMPTS.map((p) => (
                        <TouchableOpacity
                            key={p}
                            onPress={() => setText(prev => (prev ? prev + '\n' + p : p))}
                            className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
                        >
                            <PText variant="caption" className="text-primary">{p}</PText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Reflection Card */}
                <PCard elevated className="mb-8">
                    <PText variant="h3" className="mb-4">{"Today's Reflection"}</PText>
                    <TextInput
                        multiline
                        placeholder="Write your thoughts here..."
                        placeholderTextColor={placeholderColor}
                        value={text}
                        onChangeText={setText}
                        style={{
                            minHeight: 160,
                            textAlignVertical: 'top',
                            fontSize: 16,
                            color: COLORS[scheme].text,
                            lineHeight: 24,
                            fontFamily: 'Inter',
                        }}
                    />
                    <View className="mt-4">
                        <PButton
                            variant="primary"
                            label="Save Reflection"
                            onPress={handleSave}
                            disabled={!text.trim()}
                        />
                    </View>
                </PCard>

                {/* Past Reflections */}
                <View className="mb-4 flex-row items-center justify-between">
                    <PText variant="h3">Previous Entries</PText>
                    <View className="px-2 py-1 rounded-md bg-border/30">
                        <PText variant="caption">{reflections.length} sessions</PText>
                    </View>
                </View>

                {reflections.length === 0 ? (
                    <PCard className="items-center py-10">
                        <PText variant="caption">No entries yet. Start writing above!</PText>
                    </PCard>
                ) : (
                    reflections.map((entry) => (
                        <PCard key={entry.id} className="mb-4">
                            <PText variant="label" className="mb-1 text-primary">{entry.date}</PText>
                            <PText variant="body" className="leading-6">{entry.text}</PText>
                        </PCard>
                    ))
                )}
            </View>
        </ScrollView>
    );
}
