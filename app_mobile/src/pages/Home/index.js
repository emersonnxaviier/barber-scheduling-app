import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';


export default function Home() {

    const navigation = useNavigation();

    function handleToSearch() {
        navigation.navigate('Search');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>

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
                    />

                    <TouchableOpacity>
                        <MyLocationIcon width='26' height='26' fill='#FFF' />
                    </TouchableOpacity>

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
    }
});