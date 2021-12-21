import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const InputField = ({title, value, onChangeText}) => {
    return (
        <View style={styles.container}>
            {title ? <Text style={styles.title}>{title}</Text> : <></>}
            <TextInput 
                multiline
                style={{ borderBottomWidth: 1, fontSize: 20 }}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontWeight: 'bold',
    }
});

export default InputField
