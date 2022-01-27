import React from 'react'
import { View } from 'react-native'

const ListItem = ({children, ...props}) => {
    return (
        <View style={styles.listItem}>
            {children}
        </View>
    )
}

const styles = ({
    listItem: {
        padding: 15,
        margin: 5,
        backgroundColor: '#F8EEDF',
        borderRadius: 15,
        shadowOpacity: .4
    }
});

export default ListItem
