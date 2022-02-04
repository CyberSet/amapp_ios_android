import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const InputField = ({color='#000', ...props}) => {
    return (
        <View style={{ ...styles.container, marginVertical: 15 }}>
            {props.title ? <Text style={styles.title}>{props.title}</Text> : <></>}
            <TextInput 
                {...props}
                multiline
                style={{ fontSize: 20, color: color }}
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowOpacity: .4,
    },
    title: {
        fontWeight: 'bold',
    }
});

export default InputField
