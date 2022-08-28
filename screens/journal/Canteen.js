import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { styles } from '../../components/Style'
import { pickDay } from '../../store/actions/actions'
import ListContainer from '../../components/ui/ListContainer'
import ListItem from '../../components/ui/ListItem'
import ExpandedCalendar from '../../components/Calendar'
import JournalButton from '../../components/ui/Button'
import CanteenStudentCard from '../../components/CanteenStudentCard'

const Canteen = ({userData, day, navigation}) => {
    const [isEducator, setIsEducator] = useState(true)
    const [students, setStudents] = useState(null)
    const [showCalendar, setShowCalendar] = useState(true)
    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    const [timeBorder, setTimeBorder] = useState(null)

    useEffect(() => {
        pickDay('')
    }, [navigation])

    useEffect(() => {
        setStudents(null)
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_menu.php?clue=${userData.clue}&user_id=${userData.user_id}&date=${day}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.status === 3) {
                    setIsEducator(false)
                }
                setTimeBorder(res.time)
                setStudents(res.array_students_menu)
            })
            .catch(err => console.log(err))
    }, [day])

    const saveChange = (student_id, type) => {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/save_menu.php?clue=${userData.clue}&user_id=${userData.user_id}&date=${day}&student_id=${student_id}&type=${type}`

        fetch(url)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ListContainer>
                    {showCalendar ?
                        <ExpandedCalendar onPress={() => {
                            setShowCalendar(false)
                        }} /> : <></>   
                    }
                    {showCalendar ? <></> :
                        <View>
                            <JournalButton 
                                title={day ? day.substring(5).split('-').reverse().join('.') : 'Выберите день'} 
                                onPress={() => {setShowCalendar(!showCalendar)}} 
                            />
                            <ListItem>
                                <Text style={{
                                        ...styles.lessonInfo, 
                                        fontWeight: 'bold', 
                                        textAlign: 'center' 
                                    }}>
                                        {weekDays[new Date(day).getDay()]}
                                </Text>
                            </ListItem>
                            {students?.map(student => (
                                <CanteenStudentCard 
                                    key={student.student_id} 
                                    day={day}
                                    timeBorder={timeBorder}
                                    student={student} 
                                    saveChange={saveChange} 
                                />
                            ))}
                        </View>
                    }
                </ListContainer>
            </ScrollView>
            {new Date().getHours() > 14 || new Date() >= new Date(day) ? 
                <View style={{ backgroundColor: 'red', padding: 5 }}>
                    <Text style={{
                        color: '#fff', 
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>
                        Редактирование завершено
                    </Text>
                </View> : <></>
            }
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
