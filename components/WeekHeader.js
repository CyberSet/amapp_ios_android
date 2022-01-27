import React from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'

import JournalButton from './ui/Button'

const WeekHeader = ({week, setWeek, period}) => {

    return (
        <ScrollView contentContainerStyle={styles.weekHeader}>
            <JournalButton
                onPress={() => setWeek(week + 1)}
                iconName='chevron-back-outline'
            >
            </JournalButton>
            <Text style={{ fontSize: 20, color: '#fff' }}>
                {period}
            </Text>
            <JournalButton
                onPress={() => setWeek(week - 1)}
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

export default WeekHeader
