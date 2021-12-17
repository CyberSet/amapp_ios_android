import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const InputField = ({value, onChangeText}) => {
    return (
        <View style={styles.container}>
            <TextInput 
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
});

export default InputField
