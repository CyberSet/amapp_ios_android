import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

class JournalButton extends Component {
    constructor(props) {
        super(props);
        title = this.props.title;
        onPress = this.props.onPress;
    };

    render() {
        return(
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>
                    {title}
                </Text>
            </TouchableOpacity> 
        );
    };
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00656D',
        padding: 8,
        marginVertical: 8,
        width: '60%',
        borderRadius: 15,
        shadowOpacity: .4
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    }
});

export default JournalButton;