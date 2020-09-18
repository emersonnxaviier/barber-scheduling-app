import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    Alert,

} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

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

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null); // null pois o valor é retirado de um array.
    const [listHours, setListHours] = useState([]);
    const [listDays, setListDays] = useState([]);

    // vai monitorar usuario, o mês e o ano porque sempre que forem alterados, vai acessar a nova lista de dias disponiveis daquele mês.
    useEffect(() => {
        if (user.available) {
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate(); // o mês + 1 leva para o próximo mês do escolhido, mas com dia zero, ele retorna para o ultimo dia do mês escolhido, e assim se tem o ultimo dia do mês.
            let newListDays = [];

            for (let i = 1; i <= daysInMonth; i++) {

                let d = new Date(selectedYear, selectedMonth, i);
                let year = d.getFullYear();
                let month = d.getMonth();
                let day = d.getDay();

                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;

                let selecDate = `${year}-${month}-${day}`; // montando uma data especifica, fica mais facil verificar no array se essa data esta presente, e se sim, significa que o barbeiro tem disponibilidade nessa data.

                let availability = user.available.filter(e => e.date === selecDate);

                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekday: days[d.getDay()],
                    number: i  // numero do dia.
                })
            }

            setListDays(newListDays);
            setSelectedDay(0);
            setListHours([]);
            setSelectedHour(0);
        }
    }, [user, selectedMonth, selectedYear]); // todas as informações externas usadas devem ser monitoradas.


    // vai acessar o dia, mês e ano atual do dispositivo.
    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());

    }, []);


    // vai monitorar o dia para que quando o mesmo for clicado, altere os horarios disponiveis naquela data 
    useEffect(() => {
        if (user.available && selectedDay > 0) {
            let d = new Date(selectedYear, selectedMonth, selectedDay);

            let year = d.getFullYear();
            let month = d.getMonth();
            let day = d.getDay();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            let selecDate = `${year}-${month}-${day}`;

            let availability = user.available.filter(e => e.date === selecDate);

            if (availability.length > 0) {
                setListHours(availability[0].hours);
            }
        }
        setSelectedHour(null); // vai zerar a hora de agendamento sempre que o dia for alterado.
    }, [user, selectedDay]);

    function handleCloseModal() {
        setShow(false);
    }

    // função do botão de finalizar o agendamento.
    async function handleFinishClick() {
        if (
            user.id &&
            service != null &&
            selectedYear > 0 &&
            selectedMonth > 0 &&
            selectedDay > 0 &&
            selectedHour != null
        ) {
            /* let resp = await api.setAppointment(
                 user.id,
                 service,
                 selectedYear,
                 selectedMonth,
                 selectedDay,
                 selectedHour
             );
             if (resp.error == '') {
                 setShow(false);
                 navigation.navigate('Appointments');
 
             } else {
                 Alert.alert(`Erro: ${resp.error}`);
             } */
            setShow(false);
            navigation.navigate('Appointments');

        } else {
            Alert.alert('Preencha todos os dados!')
        }
    }

    function handleLeftDateClick() {
        let monthDate = new Date(selectedYear, selectedMonth, 1);
        monthDate.setMonth(monthDate.getMonth() - 1);
        setSelectedYear(monthDate.getFullYear());
        setSelectedMonth(monthDate.getMonth());
        setSelectedDay(0);
    }

    function handleRigthDateClick() {
        let monthDate = new Date(selectedYear, selectedMonth, 1);
        monthDate.setMonth(monthDate.getMonth() + 1);
        setSelectedYear(monthDate.getFullYear());
        setSelectedMonth(monthDate.getMonth());
        setSelectedDay(0);
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
                                onPress={() => handleLeftDateClick()}
                            >
                                <NavPrevIcon width='35' height='35' fill='#000' />
                            </TouchableOpacity>

                            <View style={styles.dateTitleArea}>
                                <Text style={styles.dateTitle}>
                                    {months[selectedMonth]} {selectedYear}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.dateNextArea}
                                onPress={() => handleRigthDateClick()}
                            >
                                <NavNextIcon width='35' height='35' fill='#000' />
                            </TouchableOpacity>

                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >

                            {
                                listDays.map((item, index) => (

                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => item.status ? setSelectedDay(item.number) : null}
                                        style={[styles.dateItem, {
                                            opacity: item.status ? 1 : 0.5,
                                            backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFF'
                                        }]}
                                    >

                                        <Text style={[styles.dateItemWeekDay, {
                                            color: item.number === selectedDay ? '#FFF' : '#000'
                                        }]}
                                        >
                                            {item.weekday}
                                        </Text>

                                        <Text style={[styles.dateItemWeekDayNumber, {
                                            color: item.number === selectedDay ? '#FFF' : '#000'
                                        }]}
                                        >
                                            {item.number}
                                        </Text>

                                    </TouchableOpacity>

                                ))
                            }

                        </ScrollView>

                    </View>


                    {selectedDay > 0 && listHours.length > 0 &&

                        <View style={styles.modalItem}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {
                                    listHours.map((item, index) => (

                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.timeItem, {
                                                backgroundColor: item === selectedHour ? '#4EADBE' : '#FFF'
                                            }]}
                                            onPress={() => setSelectedHour(item)}
                                        >
                                            <Text
                                                style={[styles.timeItemText, {
                                                    color: item === selectedHour ? '#FFF' : '#000',
                                                    fontWeight: item === selectedHour ? 'bold' : 'normal'
                                                }]}
                                            >
                                                {item}
                                            </Text>

                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>

                        </View>

                    }

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
    dateItem: {
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },
    dateItemWeekDay: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateItemWeekDayNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeItem: {
        width: 75,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    timeItemText: {
        fontSize: 16,
    },
});