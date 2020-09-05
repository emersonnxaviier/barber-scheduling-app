import React, { useEffect, useContext } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,

} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // USADO PARA FAZER A NAVEGAÇÃO DE TELAS.
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';


import BarberLogo from '../../assets/barber.svg';

export default function Preload() {

    const { dispath: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();


    // VAI VERIFICAR SE EXISTE TOKEN SALVO NO APLICATIVO E RETORNAR.
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                //validar o token
                let resp = await api.checkToken(token);

                if (resp.token) {
                    // salva no storage.
                    await AsyncStorage.setItem('token', resp.token); // item passado no preload.
                    // salva no context, para ter essa informação em qualquer lugar.
                    userDispatch({
                        type: 'setAvatar',  // mesmo nome passado no UserReducer.js
                        payload: {
                            avatar: resp.data.avatar
                        }
                    });

                    // envia o usuário para o home.
                    navigation.reset({
                        routes: [{ name: 'MainTab' }]
                    });

                } else {
                    navigation.navigate('SignIn');
                }

            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);


    return (
        <SafeAreaView style={styles.container}>

            <BarberLogo width='100%' height='160' />

            <ActivityIndicator
                style={styles.load}
                size='large'
                color='#FFF'
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#63C2D1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    load: {
        marginTop: 50,
    },
});