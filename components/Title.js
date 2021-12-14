import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Title extends Component {
    constructor(props) {
        super(props);
        line = this.props.line;
        key = this.props.key;
    };

    render() {
        return(
            <View style={styles.button}>
                <Text key={key} style={styles.buttonText}>
                    {line}
                </Text>
            </View> 
        );
    };
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00656D',
        padding: 8,
        marginVertical: 8,
        borderRadius: 15,
        shadowOpacity: .4
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Title