import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import ListItem from '../ListItem'
import DaysColumn from './DaysColumn'
import LessonsColumn from './LessonsColumn'

const Schedule = ({schedule}) => {
    const lessonsNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    return (
        <ListItem>
            <ScrollView horizontal>
                <View style={styles.container}>
                    <DaysColumn />
                    {lessonsNums.map(num => (
                        <LessonsColumn schedule={schedule} lessonNum={num} />
                    ))}
                </View>
            </ScrollView>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default Schedule
