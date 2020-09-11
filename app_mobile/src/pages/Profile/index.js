import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    Button,

} from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';


export default function Profile() {

    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await api.logout();

        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }

    return (
        <SafeAreaView style={styles.container}>

            <Text> PROFILE </Text>

            <Button title='LogOut' onPress={handleLogoutClick} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});