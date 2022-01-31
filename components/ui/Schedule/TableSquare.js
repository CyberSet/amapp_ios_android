import React from 'react'
import { View } from 'react-native'

const TableSquare = ({children}) => {

    return (
        <View style={{
            height: 35,
            paddingHorizontal: 10,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </View>
    )
}

export default TableSquare
