import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const InputField = ({title, value, onChangeText, onEndEditing, onChange, color='#000'}) => {
    return (
        <View style={{ ...styles.container, marginVertical: 15 }}>
            {title ? <Text style={styles.title}>{title}</Text> : <></>}
            <TextInput 
                multiline
                style={{ fontSize: 20, color: color }}
                value={value}
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
                onChange={onChange}
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
