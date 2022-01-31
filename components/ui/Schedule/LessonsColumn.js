import React from 'react'
import { Text, View } from 'react-native'
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
                                fontSize: 16,
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

export default LessonsColumn
