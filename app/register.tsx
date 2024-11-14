import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, TextInput, Button, ActivityIndicator, Platform } from "react-native";
import { authService } from '../assets/src/Service/authService';
import { useRouter } from 'expo-router';
import { useUser } from "@/assets/src/userContext";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useUser();

    const signUp = async () => {
        setLoading(true);
        try {
            const user = await authService.signUp(email, password, key);
            setUser(null)
            await setUser(user)
            router.push('/(tabs)/home'); // Verifique se essa rota está correta no seu projeto
        } catch (error) {
            console.log('Erro ao registrar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.inner}>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Password"
                />
                <TextInput
                    style={styles.input}
                    value={key}
                    onChangeText={setKey}
                    placeholder="Key"
                />
                {loading ? (
                    <ActivityIndicator size={'small'} style={{ margin: 28 }} />
                ) : (
                    <Button onPress={signUp} title="Registrar" disabled={loading} />
                )}
                <Button title="Já tem uma conta?" onPress={() => router.push('/login')} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#464646',
    },
    inner: {
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginVertical: 8,
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    }
});
