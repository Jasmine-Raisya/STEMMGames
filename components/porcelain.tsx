import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, View, ViewProps, StyleProp, TextStyle } from 'react-native';

// ─── PButton ─────────────────────────────────────────────────────────────────

interface PButtonProps extends TouchableOpacityProps {
    variant?: 'primary' | 'accent' | 'outline';
    label: string;
}

export function PButton({ variant = 'primary', label, className, ...rest }: PButtonProps) {
    const base = 'rounded-full py-4 px-8 items-center justify-center active:opacity-80';
    const variants = {
        primary: `${base} bg-primary`,
        accent: `${base} bg-accent`,
        outline: `${base} border border-primary`,
    };
    const textVariants = {
        primary: 'font-inter text-base font-semibold text-white',
        accent: 'font-inter text-base font-semibold text-white',
        outline: 'font-inter text-base font-semibold text-primary',
    };

    return (
        <TouchableOpacity className={`${variants[variant]} ${className ?? ''}`} {...rest}>
            <Text className={textVariants[variant]}>{label}</Text>
        </TouchableOpacity>
    );
}

// ─── PCard ───────────────────────────────────────────────────────────────────

interface PCardProps extends ViewProps {
    elevated?: boolean;
    children: React.ReactNode;
    onPress?: () => void;
}

export function PCard({ elevated = false, children, className, onPress, ...rest }: PCardProps) {
    const base =
        'bg-surface border border-border rounded-2xl p-6';
    const shadow = elevated ? ' shadow-md' : '';

    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            activeOpacity={0.7}
            className={`${base}${shadow} ${className ?? ''}`}
            onPress={onPress}
            {...(rest as any)}
        >
            {children}
        </Container>
    );
}

// ─── PText ───────────────────────────────────────────────────────────────────

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption';

interface PTextProps {
    variant?: TextVariant;
    children: React.ReactNode;
    className?: string;
    style?: StyleProp<TextStyle>;
}

const textVariantMap: Record<TextVariant, string> = {
    h1: 'font-inter text-3xl font-bold text-text tracking-tight',
    h2: 'font-inter text-2xl font-bold text-text tracking-tight',
    h3: 'font-inter text-xl font-semibold text-text',
    body: 'font-inter text-base text-text leading-6',
    label: 'font-inter text-sm font-medium text-text',
    caption: 'font-inter text-sm text-text/60',
};

export function PText({ variant = 'body', children, className, style }: PTextProps) {
    return (
        <Text className={`${textVariantMap[variant]} ${className ?? ''}`} style={style}>
            {children}
        </Text>
    );
}
