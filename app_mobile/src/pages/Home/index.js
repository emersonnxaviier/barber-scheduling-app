import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    RefreshControl,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import api from '../../services/api';

import BarberItems from '../../components/BarberItems';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';


export default function Home() {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [listBarbers, setListBarbers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);



    function handleToSearch() {
        navigation.navigate('Search');
    }

    // VAI ACESSAR A LOCALIZAÇÃO
    async function handleLocationFinder() {
        setCoords(null);
        const { status } = await Location.requestPermissionsAsync(); // retorna se o usuário deu permissão ou não.

        if (status !== 'granted') {
            Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização');
            return;  // return vazio pois como não foi dado a permissão não pode executar o restante do código.
        }

        setLoading(true);
        // zera as informações que tiver.
        setLocationText('');
        setListBarbers([]);

        /*
        await Location.getCurrentPositionAsync((info) => {
            setCoords(info.coords);
        }); //pega a localização do usuário.
        */

        const location = await Location.getCurrentPositionAsync(); //pega a localização do usuário.
        const { latitude, longitude } = location.coords; // latitude e longetude do usuário.
        setCoords([
            latitude,
            longitude
        ]);


        getBarbers(); // após ser passada localização, lista os barbeiros daquela localidade.
    }

    // VAI ACESSAR A LISTA DE BARBEIROS.
    async function getBarbers() {
        setLoading(true);
        setListBarbers([]);

        let lat = null;
        let lng = null;

        if (coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let resp = await api.getBarbers(lat, lng, locationText);

        if (resp.error == '') {

            if (resp.loc) {
                setLocationText(resp.loc);
            }
            setListBarbers(resp.data);
        }
        else {
            Alert.alert(`Erro: ${resp.error}`);
        }

        setLoading(false);
    }

    // QUANDO INICIAR LISTA OS BARBEIROS.
    useEffect(() => {
        getBarbers();
    }, [])

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    function handleLocationSearch() {
        setCoords({});
        getBarbers();
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                style={styles.scroll}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <View style={styles.headerArea}>
                    <Text
                        numberOfLines={2}
                        style={styles.headerTitle}
                    >
                        Encontre o seu barbeiro favorito
                    </Text>

                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={handleToSearch}
                    >
                        <SearchIcon width='26' height='26' fill='#FFF' />
                    </TouchableOpacity>
                </View>

                <View style={styles.locationArea}>

                    <TextInput
                        style={styles.locationInput}
                        placeholder='Onde você está?'
                        placeholderTextColor='#FFF'
                        value={locationText}
                        onChangeText={t => setLocationText(t)} // quando mudar o texto, o value será esse novo texto.
                        onEndEditing={handleLocationSearch} //quando digita e da um enter
                    />

                    <TouchableOpacity onPress={handleLocationFinder}>
                        <MyLocationIcon width='26' height='26' fill='#FFF' />
                    </TouchableOpacity>

                </View>

                {loading &&
                    <ActivityIndicator
                        style={styles.loadIndicator}
                        size='large'
                        color='#FFF'
                    />
                }

                <View style={styles.listArea}>
                    {
                        listBarbers.map((item, index) => (
                            <BarberItems key={index} data={item} />
                        ))
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#63C2D1',
    },
    scroll: {
        flex: 1,
        padding: 20,
    },
    headerArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        width: 250
    },
    searchButton: {
        width: 28,
        height: 28
    },
    locationArea: {
        backgroundColor: '#4EADBE',
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    locationInput: {
        flex: 1,
        fontSize: 16,
        color: '#FFF'
    },
    loadIndicator: {
        marginTop: 50
    },

    listArea: {
        marginTop: 30,
        marginBottom: 30,
    },

});