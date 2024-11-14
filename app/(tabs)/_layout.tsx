import { Tabs, useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useUser } from '../../assets/src/userContext';
import { useEffect, useState } from 'react';

export default () => {
    const { user } = useUser(); // Obtém o usuário do contexto
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Estado de carregamento

    useEffect(() => {
        // Apenas altera o estado de loading após a verificação do usuário estar concluída
        if (user !== undefined) {
            setLoading(false);
            if (!user) {
                router.push('/login');
            }
        }
    }, [user, router]);

    if (loading) {
        return null; // Ou um componente de carregamento
    }

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarActiveTintColor: '#0000FF',
                tabBarInactiveTintColor: '#A9A9A9',
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size || 24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person-outline" color={color} size={size || 24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="historico"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="book" color={color} size={size || 24} />
                    ),
                }}
            />
        </Tabs>
    );
};
