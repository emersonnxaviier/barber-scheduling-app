import React from 'react';
import {
    View,
    StyleSheet,
    Text,

} from 'react-native';

import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';


export default function Stars({ stars, showNumber }) {

    /**
        0 = estrela vazia
        1 = estrela pela metade 
        2 = estrela cheia
     */

    let s = [0, 0, 0, 0, 0];

    let floor = Math.floor(stars);  // vai retornar somente os números inteiros das notas.
    let left = stars - floor; // vai retornar somente os decimais das notas.

    for (var i = 0; i < floor; i++) {
        s[i] = 2;
    }

    if (left > 0) {
        s[i] = 1;
    }

    return (
        <View style={styles.starArea}>

            {s.map((item, index) => (

                <View key={index}>

                    {item === 0 && <StarEmpty width='18' height='18' fill='#FF9200' />}
                    {item === 1 && <StarHalf width='18' height='18' fill='#FF9200' />}
                    {item === 2 && <StarFull width='18' height='18' fill='#FF9200' />}
                </View>

            ))}

            {showNumber && <Text style={styles.note}> {stars} </Text>}

        </View>
    );
}

const styles = StyleSheet.create({
    starArea: {
        flexDirection: 'row',
    },
    note: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
        color: '#737373',
    },
});