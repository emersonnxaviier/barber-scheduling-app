import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Stars from './Stars';

export default function BarberItems({ data }) {

    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('Barber', {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            stars: data.stars
        });
    }


    return (
        <View style={styles.area}>

            <Image
                source={{ uri: data.avatar }}
                style={styles.imgAvatar}
            />

            <View style={styles.infoArea}>

                <Text style={styles.userName}> {data.name} </Text>

                <Stars stars={data.stars} showNumber={true} />

                <TouchableOpacity style={styles.seeProfile} onPress={handleClick}>

                    <Text style={styles.textButton}> Ver Perfil </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    area: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
    },
    imgAvatar: {
        width: 88,
        height: 88,
        borderRadius: 20
    },
    infoArea: {
        marginLeft: 17,
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    seeProfile: {
        width: 85,
        height: 26,
        borderWidth: 1,
        borderColor: '#4EADBE',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 13,
        color: '#268596'
    },

});