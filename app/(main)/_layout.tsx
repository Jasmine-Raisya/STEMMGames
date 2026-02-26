import { Stack } from 'expo-router';

export default function MainLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="dashboard/index" />
            <Stack.Screen name="activities/[id]" />
            <Stack.Screen name="leaderboard/index" />
            <Stack.Screen name="reflections/index" />
        </Stack>
    );
}
