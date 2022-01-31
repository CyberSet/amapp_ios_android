import React from 'react'
import { View, StyleSheet } from 'react-native'

const TableSquare = ({children}) => {

    return (
        <View style={styles.square}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    square: {
        height: 35,
        paddingHorizontal: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default TableSquare
