import { Redirect, Stack } from "expo-router";
import { StatusBar } from 'react-native';
import { UserProvider } from '../assets/src/userContext';

const StartPage = () => {
    return (
        <UserProvider>
            <StatusBar hidden={true} />
            <Stack />
            <Redirect href="/login" />
        </UserProvider>
    );
};

export default StartPage;
