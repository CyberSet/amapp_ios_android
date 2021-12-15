import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const JournalButton = ({title, iconName, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
            {
                iconName ?
                <Icon
                    name={iconName}
                    size={25}
                    color='#fff'
                /> :
                <></>
            }
        </TouchableOpacity> 
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#00656D',
        padding: 10,
        marginVertical: 8,
        // width: '60%',
        borderRadius: 15,
        shadowOpacity: .4
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default JournalButton;