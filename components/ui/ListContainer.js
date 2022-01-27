import React from 'react'
import { View } from 'react-native'

const ListContainer = ({children, ...props}) => {
    return (
        <View style={styles.listContaner}>
            {children}
        </View>
    )
}

export const styles = ({
    listContaner: {
        marginHorizontal: 5,
    },
});

export default ListContainer
