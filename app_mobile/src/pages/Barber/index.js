import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,

} from 'react-native';

import api from '../../services/api';
import Carousel from 'react-native-looped-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';

import Stars from '../../components/Stars';

import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';

export default function Barber() {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });
    const [loading, setLoading] = useState(false);


    function handleBackButton() {
        navigation.goBack();
    }


    useEffect(() => {

        async function getBarberInfo() {

            setLoading(true);

            let json = await api.getBarber(userInfo.id);

            if (json.error == '') {
                setUserInfo(json.data);
            }
            else {
                Alert.alert('Erro: ' + json.error);
            }

            setLoading(false);
        }

        getBarberInfo();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.scroll}>
                {
                    userInfo.photos && userInfo.photos.length > 0
                        ?
                        <Carousel
                            style={styles.swiper}
                            delay={3000}
                            autoplay={true}
                            pageInfo
                        >
                            {

                                userInfo.photos.map((item, index) => (
                                    <View
                                        key={index}
                                        style={styles.swipeItem}
                                    >
                                        <Image
                                            style={styles.swipeImage}
                                            source={{ uri: item.url }}
                                            resizeMode='cover'
                                        />
                                    </View>
                                ))
                            }

                        </Carousel>
                        :

                        <View style={styles.fakeSwiper}>

                        </View>
                }

                <View style={styles.pageBody}>

                    <View style={styles.userInfoArea}>
                        <Image
                            style={styles.userAvatar}
                            source={{ uri: userInfo.avatar }}
                        />

                        <View style={styles.userInfo}>
                            <Text style={styles.UserInfoName}> {userInfo.name} </Text>
                            <Stars stars={userInfo.stars} showNumber={true} />
                        </View>


                        <TouchableOpacity style={styles.userFavorite}>
                            <FavoriteIcon width='24' height='24' fill='#ff0000' />
                        </TouchableOpacity>
                    </View>

                    {loading &&
                        <ActivityIndicator
                            size='large'
                            color='#000'
                            style={{ marginTop: 50 }}
                        />
                    }

                    {userInfo.services &&

                        <View style={styles.servicesArea}>

                            <Text style={styles.servicesTitle}> Lista de serviços </Text>

                            {userInfo.services.map((item, index) => (

                                <View
                                    key={index}
                                    style={styles.servicesItem}
                                >

                                    <View style={styles.servicesInfo}>
                                        <Text style={styles.servicesName}>
                                            {item.name}
                                        </Text>

                                        <Text style={styles.servicesPrice}>
                                            R$ {item.price}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.chooseButton}
                                    >
                                        <Text style={styles.textChooseButton}>
                                            Agendar
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            ))}

                        </View>
                    }

                    <View style={styles.testimonialArea}>
                    </View>

                </View>

            </ScrollView>

            <TouchableOpacity
                onPress={handleBackButton}
                style={styles.backButton}
            >
                <BackIcon width='44' height='44' fill='#FFF' />

            </TouchableOpacity>

        </SafeAreaView>
    );
}

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flex: 1,
    },

    swiper: {
        height: 240,
        flex: 1,
        overflow: 'visible',
    },

    fakeSwiper: {
        height: 180,
        backgroundColor: '#63c2d1'
    },
    pageBody: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 60,
        marginTop: -50,
        minHeight: 400, //altura minima

    },
    servicesArea: {
        marginTop: 40,
    },
    servicesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 30,
        color: '#268596',
        marginBottom: 20,
    },
    servicesItem: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 20,
        marginBottom: 20,
    },
    servicesInfo: {
        flex: 1,
    },
    servicesName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#268596',
    },
    servicesPrice: {
        fontSize: 14,
        color: '#268596',
    },
    chooseButton: {
        backgroundColor: '#4EADBE',
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    textChooseButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    testimonialArea: {

    },
    swipeDot: {
        height: 10,
        width: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 3,
    },
    swipeDotActive: {
        height: 10,
        width: 10,
        backgroundColor: '#000',
        borderRadius: 5,
        margin: 3,
    },
    swipeItem: {
        flex: 1,
        backgroundColor: '#63C2D1'
    },
    swipeImage: {
        width: '100%',
        height: 240
    },
    userInfoArea: {
        flexDirection: 'row',
        marginTop: -30
    },
    userAvatar: {
        width: 110,
        height: 110,
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 20,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    UserInfoName: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userFavorite: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#999',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: 10,
        zIndex: 9, // para ficar por cima das fotos.
    },
});