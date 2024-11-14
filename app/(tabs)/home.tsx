import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useRouter } from 'expo-router';
import { useUser } from '@/assets/src/userContext';
import userRepository from '../../assets/src/Repository/userRepository'

const minuteSeconds = 60; // Duração do timer em segundos
const timerProps = {
    isPlaying: true,
    size: 90,
    strokeWidth: 6,
};

const Home = () => {
    const route = useRouter(); // Obtendo a instância da rota
    const { user } = useUser();
    const [randomNumber, setRandomNumber] = useState(user.entryCode); // Número inicial

    const handleLogout = () => {
        route.push('/login'); // Navegando para a tela de Login
    };

    // Se o user existir, use o entryCode ou, se não, use o número aleatório
    const mynumber = user ? randomNumber ?? user.entryCode : randomNumber;

    useEffect(() => {
        if (user && user.entryCode) {
            // Atualiza o estado quando o entryCode mudar no Firestore
            setRandomNumber(user.entryCode);
        }
    }, [user?.entryCode]); // O useEffect será executado sempre que o entryCode mudar

    useEffect(() => {
        // Atualiza o entryCode do usuário a cada 60 segundos
        const interval = setInterval(async () => {
            try {
                const newNumber = Math.floor(100000 + Math.random() * 900000);
                if (user) {
                    await userRepository.updateEntryCode(newNumber, user.uid);
                    setRandomNumber(newNumber); // Atualiza o número gerado no estado
                }
            } catch (error) {
                console.error('Erro ao atualizar entry code:', error);
            }
        }, 60000);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, [user]); // Adicionando `user` como dependência para reagir a mudanças no usuário

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            <Text style={styles.subtitle}>Você está logado!</Text>
            <View>
                <Text style={styles.number}>{mynumber}</Text>
            </View>
            <View style={styles.timerContainer}>
                <UrgeWithPleasureComponent />
            </View>
            <Button title="Sair" onPress={handleLogout} color="#FF5733" />
        </View>
    );
};

const UrgeWithPleasureComponent = () => {
    const remainingTime = minuteSeconds; // Tempo total do contador

    return (
        <CountdownCircleTimer
            {...timerProps}
            colors={"#808080"}
            trailColor="#dbdbdb"
            duration={remainingTime}
            initialRemainingTime={remainingTime} // Sempre começa do tempo total
            onComplete={() => {
                return { shouldRepeat: true, delay: 1 }; // Continua girando indefinidamente
            }}
        >
            {({ elapsedTime }) => {
                const secondsRemaining = Math.max(0, remainingTime - elapsedTime); // Calcula o tempo restante em segundos
                return (
                    <Text style={styles.timerText}>
                        {Math.floor(secondsRemaining)} {/* Exibe apenas os segundos restantes */}
                    </Text>
                );
            }}
        </CountdownCircleTimer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#464646',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    number: {
        fontSize: 50,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 40,
    },
    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 24,
        color: '#FFFFFF',
        marginTop: 20,
    },
});

export default Home;
