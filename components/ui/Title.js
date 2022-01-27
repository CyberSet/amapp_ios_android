import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Title = ({...props}) => {
        return(
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
            </View> 
        )
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#51176C',
        paddingVertical: 15,
        paddingRight: 15,
        marginVertical: 5,
        borderRadius: 15,
        shadowOpacity: .4,
    },
    title: {
        color: '#fff',
        fontSize: 21,
        fontStyle: 'italic',
        paddingLeft: 15,
        textAlign: 'center'
    }
});

export default Title