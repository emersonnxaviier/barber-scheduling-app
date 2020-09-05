import React, { useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

// COMPONENTS
import SignInput from '../../components/SignInput';

// ICONS
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default function SignIn() {

    const { dispath: userDispatch } = useContext(UserContext);

    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    // ENVIA O USUÁRIO PARA A ROTA SEM A OPÇÃO DE RETORNAR, SE TENTAR VOLTAR PELO BOTÃO DO DISPOSITIVO IRÁ FECHAR O APP.
    function handleToSignUp() {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    }

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '') {

            let resp = await api.signIn(emailField, passwordField);

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
                //alert(`Erro: ${resp.error}`)
                alert('Email e/ou senha incorreto(s)!');
            }

        } else {
            alert('Preencha os campos!');
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <BarberLogo width='100%' height='160' />

            <View style={styles.inputArea}>

                <SignInput
                    IconSvg={EmailIcon}
                    placeholder='Digite seu Email'
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder='Digite se senha'
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />


                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={handleSignClick}
                >
                    <Text
                        style={styles.textBtnLogin}
                    >
                        LOGIN
                    </Text>
                </TouchableOpacity>

            </View>


            <TouchableOpacity
                style={styles.btnSignUp}
                onPress={handleToSignUp}
            >
                <Text style={styles.btnText}>
                    Ainda não possui uma conta?
                </Text>
                <Text style={[styles.btnText, { fontWeight: 'bold' }]}>
                    Cadastre-se
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#63C2D1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputArea: {
        width: '100%',
        padding: 40,
    },
    btnLogin: {
        height: 60,
        backgroundColor: '#268596',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtnLogin: {
        fontSize: 18,
        color: '#FFF',
    },
    btnSignUp: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 0
    },
    btnText: {
        fontSize: 16,
        color: '#268596',
        marginLeft: 5,
    },

});