import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import ListItem from '../ListItem'
import TableSquare from './TableSquare'
import DaysColumn from './DaysColumn'

const Schedule = ({schedule}) => {

    const weekDays = [
        {dayNum: '1', dayName: 'Пн'},
        {dayNum: '2', dayName: 'Вт'},
        {dayNum: '3', dayName: 'Ср'},
        {dayNum: '4', dayName: 'Чт'},
        {dayNum: '5', dayName: 'Пт'}
    ]

    const lessonsNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    const LessonsColumn = ({lessonNum}) => (
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
                            {item.student_field}
                        </Text>
                    </TableSquare> : <></>
            ))}
        </View>
    )

    return (
        <ListItem>
            <ScrollView horizontal>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <DaysColumn />
                    {lessonsNums.map(num => (
                        <LessonsColumn lessonNum={num} />
                    ))}
                </View>
            </ScrollView>
        </ListItem>
    )
}

export default Schedule
