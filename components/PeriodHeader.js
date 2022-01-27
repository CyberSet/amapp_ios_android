import React from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'

import JournalButton from './ui/Button'

const PeriodHeader = ({handleBackChevron, handleForwardChevron, period}) => {

    return (
        <ScrollView contentContainerStyle={styles.weekHeader}>
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
        </ScrollView>
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
        borderRadius: 15,
        shadowOpacity: .4
    },
})

export default PeriodHeader
