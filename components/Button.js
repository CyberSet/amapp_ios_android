import React, { Component, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const JournalButton = ({title, iconName, onPress}) => {
    // const [isIcon, setIcon] = useState(iconName);

    return(
        <TouchableOpacity 
            onPress={onPress} 
            style={
                iconName ? { ...styles.button, flexDirection: 'row', justifyContent: 'space-between' } : styles.button
        }>
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
        backgroundColor: '#00656D',
        padding: 10,
        marginVertical: 8,
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