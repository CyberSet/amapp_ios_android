import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const InputField = ({title, value, onChangeText, onEndEditing, onChange}) => {
    return (
        <View style={styles.container}>
            {title ? <Text style={styles.title}>{title}</Text> : <></>}
            <TextInput 
                multiline
                style={{ borderBottomWidth: 1, fontSize: 20 }}
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
