import React from 'react'
import { View } from 'react-native'

const TableSquare = ({children}) => {

    return (
        <View style={{
            width: 35,
            height: 35,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </View>
    )
}

export default TableSquare
