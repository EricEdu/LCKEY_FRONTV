import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, TextInput, Button, ActivityIndicator, Platform } from "react-native";
import { authService } from '../assets/src/Service/authService';
import { useRouter } from 'expo-router';
import { useUser } from '../assets/src/userContext'; // Importe o contexto

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useUser();

    const signIn = async () => {
        setLoading(true);
        try {
            const user = await authService.signIn(email, password);
            setUser(null)
            await setUser(user)
            router.push('/(tabs)/home');
        } catch (error) {
            console.log('Erro no login:', error);
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
                {loading ? (
                    <ActivityIndicator size={'small'} style={{ margin: 28 }} />
                ) : (
                    <Button onPress={signIn} title="Logar" />
                )}
                <Button title="Criar uma conta" onPress={() => router.push('/register')} />
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
