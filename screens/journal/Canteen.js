import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { pickDay } from '../../store/actions/actions'
import ListContainer from '../../components/ui/ListContainer'
import ListItem from '../../components/ui/ListItem'
import ExpandedCalendar from '../../components/Calendar'
import JournalButton from '../../components/ui/Button'

const Canteen = ({userData, day, navigation}) => {
    const [isEducator, setIsEducator] = useState(true)
    const [students, setStudents] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        pickDay('')
    }, [navigation])

    useEffect(() => {
        setStudents(null)
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_menu.php?clue=${userData.clue}&user_id=${userData.user_id}&date=${day}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 3) {
                    setIsEducator(false)
                }
                setStudents(res.array_students_menu)
                res.array_students_menu.map(student => {
                    console.log(student.menu_array)
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
                    {isEducator ?
                        students && students.map(student => (
                            <ListItem key={student.student_id}>
                                <Text key={student.name + student.surname}>{student.surname} {student.name}</Text>
                            </ListItem>
                        )) :
                        <Text>user is not educator</Text>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Canteen)
