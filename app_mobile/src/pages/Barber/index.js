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
import Modal from '../../components/Modal';

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
//import NavPrevIcon from '../../assets/nav_prev.svg';
//import NavNextIcon from '../../assets/nav_next.svg';


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
    const [favorited, setFavorited] = useState(false);
    const [selectedServices, setSelectedServices] = useState(null); // para indentificar qual serviço foi selecionado.
    const [showModal, setShowModal] = useState(false); // para controlar a exibição do modal.


    function handleBackButton() {
        navigation.goBack();
    }

    function handleFavClick() {
        setFavorited(!favorited);
        api.setFavorite(userInfo.id);
    }

    function handleServiceChoose(index) {
        setSelectedServices(index);
        setShowModal(true);
    }

    useEffect(() => {

        async function getBarberInfo() {

            setLoading(true);

            let json = await api.getBarber(userInfo.id);

            if (json.error == '') {
                setUserInfo(json.data);
                setFavorited(json.data.favorited);
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
                            delay={2000}
                            autoplay={true}
                            pageInfo={true}
                            swipe={true}
                            bullets={true}
                            bulletsContainerStyle={{ top: 10, right: -250 }}

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


                        <TouchableOpacity style={styles.userFavorite} onPress={handleFavClick}>
                            {
                                favorited
                                    ?
                                    <FavoriteFullIcon width='24' height='24' fill='#ff0000' />
                                    :
                                    <FavoriteIcon width='24' height='24' fill='#ff0000' />
                            }
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
                                            R$ {item.price.toFixed(2)}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.chooseButton}
                                        onPress={() => handleServiceChoose(index)}
                                    >
                                        <Text style={styles.textChooseButton}>
                                            Agendar
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            ))}

                        </View>
                    }

                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&

                        <View style={styles.testimonialArea}>
                            <Carousel
                                style={styles.carouselTestimonials}
                                pageStyle={{ height: 110 }}
                                arrows={true}
                                autoplay={true}
                                delay={5000}
                                rightArrowText='RRRRRRRR'
                                leftArrowText='LLLLLLLL'
                                leftArrowStyle={{ backgroundColor: '#ddd' }}
                                rightArrowStyle={{ backgroundColor: '#ddd' }}
                            >
                                {
                                    userInfo.testimonials.map((item, index) => (

                                        <View style={styles.testimonialItem} key={index}>

                                            <View style={styles.testimonialInfo}>
                                                <Text style={styles.testimonialName}> {item.name} </Text>
                                                <Stars stars={item.rate} showNumber={false} />
                                            </View>

                                            <Text style={styles.testimonialBody}>
                                                {item.body}
                                            </Text>

                                        </View>
                                    ))
                                }
                            </Carousel>
                        </View>
                    }

                </View>

            </ScrollView>

            <TouchableOpacity
                onPress={handleBackButton}
                style={styles.backButton}
            >
                <BackIcon width='44' height='44' fill='#FFF' />
            </TouchableOpacity>


            <Modal
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedServices}
            />

        </SafeAreaView>
    );
}

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
        marginTop: 30,
        marginBottom: 50,
    },
    carouselTestimonials: {
        height: 110,
    },
    testimonialItem: {
        backgroundColor: '#268596',
        padding: 5,
        borderRadius: 10,
        height: 100,
        justifyContent: 'center',
        // alignItems: 'center',
        marginLeft: 50,
        marginRight: 50,
    },
    testimonialInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    testimonialName: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    testimonialBody: {
        color: '#FFF',
        fontSize: 13,
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
        borderColor: '#F5F2EE',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 70
    },
    backButton: {
        position: 'absolute',
        left: 0,
        top: 10,
        zIndex: 9, // para ficar por cima das fotos.
    },
});