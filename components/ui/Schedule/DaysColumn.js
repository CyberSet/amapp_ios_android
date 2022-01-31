import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import TableSquare from './TableSquare'

const DaysColumn = () => {

    const weekDays = [
        {dayNum: '1', dayName: 'Пн'},
        {dayNum: '2', dayName: 'Вт'},
        {dayNum: '3', dayName: 'Ср'},
        {dayNum: '4', dayName: 'Чт'},
        {dayNum: '5', dayName: 'Пт'}
    ]

    return (
        <View>
            <TableSquare></TableSquare>
            {weekDays.map(day => (
                <TableSquare>
                    <Text 
                        key={day.dayName}
                        style={styles.columnText}
                    >
                        {day.dayName}
                    </Text>
                </TableSquare>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    columnText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default DaysColumn
