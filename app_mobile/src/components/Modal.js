import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
    Text,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

export default function Modall({ show, user, setShow, service }) { //props que vem do arquivo principal.

    const navigation = useNavigation();

    function handleCloseModal() {
        setShow(false);
    }

    function handleFinishClick() {

    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType='slide'
        >

            <View style={styles.modalArea}>
                <View style={styles.modalBody}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={handleCloseModal}
                    >
                        <ExpandIcon width='40' height='40' fill='#000' />
                    </TouchableOpacity>

                    <View style={styles.modalItem}>
                        <View style={styles.userInfo}>
                            <Image
                                source={{ uri: user.avatar }}
                                style={styles.imageAvatar}
                            />
                            <Text style={styles.userName}>
                                {user.name}
                            </Text>
                        </View>
                    </View>

                    {service != null &&
                        <View style={styles.modalItem}>
                            <View style={styles.serviceInfo}>
                                <Text style={styles.serviceName}>
                                    {user.services[service].name}
                                </Text>

                                <Text style={styles.servicePrice}>
                                    R$ {user.services[service].price.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    }

                    <View style={styles.modalItem}>
                        <View style={styles.dateInfo}>
                            <TouchableOpacity
                                style={styles.datePrevArea}
                                onPress={() => { }}
                            >
                                <NavPrevIcon width='35' height='35' fill='#000' />
                            </TouchableOpacity>

                            <View style={styles.dateTitleArea}>
                                <Text style={styles.dateTitle}>
                                    Setembro 2020
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.dateNextArea}
                                onPress={() => { }}
                            >
                                <NavNextIcon width='35' height='35' fill='#000' />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.finishButton}
                        onPress={handleFinishClick}
                    >
                        <Text style={styles.finishButtonText}>
                            Finalizar agendamento
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>
    );
}


const styles = StyleSheet.create({
    modal: {

    },
    modalArea: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalBody: {
        backgroundColor: '#83D6E3',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 300, // altura do modal na tela.
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 40,
        paddingLeft: 20,
    },
    closeButton: {
        width: 40,
        height: 40,
    },
    modalItem: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    userName: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageAvatar: {
        width: 56,
        height: 56,
        borderRadius: 20,
        marginRight: 15,
    },
    serviceInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    finishButton: {
        height: 60,
        backgroundColor: '#268596',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    finishButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold'
    },
    dateInfo: {
        flexDirection: 'row',
    },
    datePrevArea: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dateTitleArea: {
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    },
    dateNextArea: {
        flex: 1,
        alignItems: 'flex-start',
    },

});