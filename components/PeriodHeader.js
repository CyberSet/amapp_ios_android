import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import JournalButton from './ui/Button'

const PeriodHeader = ({handleBackChevron, handleForwardChevron, period}) => {

    return (
        <View style={styles.weekHeader}>
            <JournalButton
                onPress={handleBackChevron}
                iconName='chevron-back-outline'
            >
            </JournalButton>
            <Text style={{ fontSize: 20, color: '#fff' }}>
                {period}
            </Text>
            <JournalButton
                onPress={handleForwardChevron}
                iconName='chevron-forward-outline'
            >
            </JournalButton>
        </View>
    )
};

const styles = StyleSheet.create({
    weekHeader: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#00656D',
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 15,
        shadowOpacity: .4
    },
})

export default PeriodHeader
