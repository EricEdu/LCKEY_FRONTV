// app/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone
import { useUser } from '../../assets/src/userContext';

const Profile = () => {
    const { user } = useUser();
    const userl = {
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        profilePicture: 'https://via.placeholder.com/150', // Imagem de perfil fictícia
        bio: 'Desenvolvedor Mobile apaixonado por tecnologia e esportes.'
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: userl.profilePicture }} style={styles.profilePicture} />
            {/* <Icon name="user" size={200} color="#FFFFFF" style={styles.icon} /> Ícone de usuário */}
            <Text style={styles.name}>{userl.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.bio}>{userl.bio}</Text>
        </View>
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
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    icon: {
        marginBottom: 10, // Espaço abaixo do ícone
    },
    name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    bio: {
        fontSize: 14,
        color: '#AAAAAA',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default Profile;
