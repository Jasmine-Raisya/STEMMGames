import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import '../global.css';
import { PorcelainThemeProvider } from '../lib/ThemeProvider';
import { TeamProvider } from '../lib/TeamContext';

// Registration settings

export const unstable_settings = {
  // The initial route when navigating via deep-link with no prior state
  initialRouteName: 'index',
};

function RootLayoutContent() {
  const { scheme } = usePorcelainTheme();

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <TeamProvider>
      <PorcelainThemeProvider>
        <RootLayoutContent />
      </PorcelainThemeProvider>
    </TeamProvider>
  );
}

import { usePorcelainTheme } from '../lib/theme';
