import React, { useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { ThemeContext, type ColorSchemeName, type ThemeMode } from './theme';

/**
 * PorcelainThemeProvider
 * Wrap your app with this component to make usePorcelainTheme() available.
 */
export function PorcelainThemeProvider({ children }: { children: React.ReactNode }) {
    const { colorScheme, setColorScheme } = useNativeWindColorScheme();
    const [themeMode, setThemeMode] = useState<ThemeMode>('system');

    // Synchronize NativeWind's internal state with our themeMode
    useEffect(() => {
        setColorScheme(themeMode);
    }, [themeMode, setColorScheme]);

    const scheme: ColorSchemeName = (colorScheme as ColorSchemeName) || 'light';
    const value = useMemo(() => ({ scheme, themeMode, setThemeMode }), [scheme, themeMode]);

    return (
        <ThemeContext.Provider value={value}>
            <View className="flex-1 bg-background">
                {children}
            </View>
        </ThemeContext.Provider>
    );
}
