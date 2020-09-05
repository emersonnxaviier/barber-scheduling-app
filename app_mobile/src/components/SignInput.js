import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,

} from 'react-native';

export default function SignInput({ IconSvg, placeholder, value, onChangeText, password }) { // passa as props
    return (
        <View style={styles.container}>

            <IconSvg width='24' height='24' fill='#268596' />

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor='#268596'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password} // PARA O CAMPO QUE FOR SENHA, NÃO A EXIBA
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: '#83D6E3',
        flexDirection: 'row',
        borderRadius: 30,
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#268596',
        marginLeft: 10
    },

});