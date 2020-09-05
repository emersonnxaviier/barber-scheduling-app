import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const stack = createStackNavigator();

import Preload from './pages/Preload';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import MainTab from './stacks/MainTab';

import UserContextProvider from './contexts/UserContext'; // USADO PARA ENGLOBAR TODO O CONTEUDO DO APLICATIVO E ASSIM TER ACESSO EM QUALQUER LUGAR(TELA) AS INFORMAÇÕES DO USUÁRIO.


const Routes = () => {
    return (
        <UserContextProvider>
            <NavigationContainer>

                <stack.Navigator
                    initialRouteName='MainTab'
                    screenOptions={{
                        headerShown: false
                    }}
                >

                    <stack.Screen name='Preload' component={Preload} />
                    <stack.Screen name='SignIn' component={SignIn} />
                    <stack.Screen name='SignUp' component={SignUp} />
                    <stack.Screen name='MainTab' component={MainTab} />

                </stack.Navigator>

            </NavigationContainer>
        </UserContextProvider>
    );
}

export default Routes;