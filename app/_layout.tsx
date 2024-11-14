// app/_layout.tsx
import React from 'react';
import { Stack } from "expo-router";
import { UserProvider } from '../assets/src/userContext';

const MainLayout = () => {
    return (
        <UserProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
            </Stack>
        </UserProvider>
    );
};

export default MainLayout;
