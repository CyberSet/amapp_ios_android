import React from 'react'
import { ScrollView, View } from 'react-native'

import ListItem from '../ListItem'
import DaysColumn from './DaysColumn'
import LessonsColumn from './LessonsColumn'

const Schedule = ({schedule}) => {
    const lessonsNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    return (
        <ListItem>
            <ScrollView horizontal>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <DaysColumn />
                    {lessonsNums.map(num => (
                        <LessonsColumn schedule={schedule} lessonNum={num} />
                    ))}
                </View>
            </ScrollView>
        </ListItem>
    )
}

export default Schedule
