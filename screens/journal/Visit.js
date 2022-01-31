import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { pickDay } from '../../store/actions/actions'
import ListContainer from '../../components/ui/ListContainer'
import ListItem from '../../components/ui/ListItem'
import ExpandedCalendar from '../../components/Calendar'
import JournalButton from '../../components/ui/Button'

const Visit = ({userData, day, pickDay, navigation}) => {
    const [stat, setStat] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        pickDay('')
    }, [navigation])

    useEffect(() => {
        setStat(null)
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_student_absence.php?clue=${userData.clue}&user_id=${userData.user_id}&date=${day}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setStat(res.array_students_menu)
                res.array_students_menu.map(item => {
                    console.log(item.absence_array)
                })
            })
            .catch(err => console.log(err))
    }, [day])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ListContainer>
                    {showCalendar ?
                        <ExpandedCalendar onPress={() => {
                            console.log(day)
                        }} /> : <></>   
                    }
                    <JournalButton 
                        title={showCalendar ? 'Закрыть календарь' : 'Открыть календарь'} 
                        onPress={() => setShowCalendar(!showCalendar)} 
                    />
                    {stat && stat.map(item => (
                        <ListItem key={item.student_id}>
                            <Text key={item.name + item.surname} style={{ fontSize: 18 }}>{item.surname} {item.name}</Text>
                            {item.absence_array.map(reason => (
                                <Text key={reason.reason_id} style={{ fontSize: 16 }}>{reason.title}</Text>
                            ))}
                        </ListItem>
                    ))}
                </ListContainer>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
        day: state.jlr.day,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        pickDay,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Visit)
