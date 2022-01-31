import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TableSquare from './TableSquare'

const LessonsColumn = ({schedule, lessonNum}) => {

    return (
        <View>
            <TableSquare>
                <Text style={{ fontSize: 18 }}>{lessonNum}</Text>
            </TableSquare>
            {schedule?.map(item => (
                item.number_lesson === lessonNum ?
                    <TableSquare>
                        <Text 
                            key={item.number_lesson}
                            style={{
                                ...styles.columnText,
                                color: item.individual == '1' ? '#51176C' : '',
                                fontWeight: item.individual == '1' ? 'bold' : '',
                            }}>
                            {item.subject ? item.subject : item.student_field}
                        </Text>
                    </TableSquare> : <></>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    columnText: {
        fontSize: 16
    }
})

export default LessonsColumn
