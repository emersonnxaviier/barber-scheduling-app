import React, { useContext } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,

} from 'react-native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';


export default function CustomTabBar({ state, navigation }) {

    const { state: user } = useContext(UserContext);

    // VAI NAVEGAR PARA A SCREEN PASSADA.
    function goTo(screenName) {
        navigation.navigate(screenName);
    }


    return (

        <View style={styles.container}>
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => goTo('Home')}
            >
                <HomeIcon
                    width='24'
                    height='24'
                    fill='#ffffff'
                    style={{ opacity: state.index === 0 ? 1 : 0.5 }}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => goTo('Search')}
            >
                <SearchIcon
                    width='24'
                    height='24'
                    fill='#ffffff'
                    style={{ opacity: state.index === 1 ? 1 : 0.5 }}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabItemCenter}
                onPress={() => goTo('Appointments')}
            >
                <TodayIcon
                    width='32'
                    height='32'
                    fill='#4EADBE'
                    style={{ opacity: state.index === 2 ? 0.7 : 1 }}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => goTo('Favorites')}
            >
                <FavoriteIcon
                    width='24'
                    height='24'
                    fill='#ffffff'
                    style={{ opacity: state.index === 3 ? 1 : 0.5 }}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => goTo('Profile')}
            >
                {
                    user.avatar != ''
                        ?
                        <Image source={{ uri: user.avatar }} style={styles.avatarIcon} />
                        :
                        <AccountIcon
                            width='24'
                            height='24'
                            fill='#ffffff'
                            style={{ opacity: state.index === 4 ? 1 : 0.5 }}
                        />

                }

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#4EADBE',
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItemCenter: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#4EADBE',
        marginTop: -30
    },
    avatarIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },

});