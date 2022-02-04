import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { styles } from '../../components/Style'
import { pickDay } from '../../store/actions/actions'
import ListContainer from '../../components/ui/ListContainer'
import ListItem from '../../components/ui/ListItem'
import ExpandedCalendar from '../../components/Calendar'
import JournalButton from '../../components/ui/Button'
import AbsenceStudentCard from '../../components/AbsenceStudentCard'

const Visit = ({userData, day, pickDay, navigation}) => {
    const [stat, setStat] = useState(null)
    const [showCalendar, setShowCalendar] = useState(true)
    const [isAll, setIsAll] = useState(false)

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
                setIsAll(Boolean(Number(res.all)))
                res.array_students_menu.map(item => {
                    console.log(item.absence_array)
                })
            })
            .catch(err => console.log(err))
    }, [day])

    const saveChange = (type, value, student_id) => {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/save_student_absence.php?clue=${userData.clue}&user_id=${userData.user_id}&date=${day}&type=${type}&argument=${value}&student_id=${student_id}`
        console.log(url)
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
                                <View style={{ paddingLeft: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <TouchableOpacity 
                                            style={{ borderWidth: 2, width: 40, height: 40 }}
                                            onPress={() => {
                                                setIsAll(!isAll)
                                                saveChange(4, Number(!isAll), 1)
                                            }}
                                        >
                                            {isAll ? 
                                                <Icon
                                                    name='checkmark'
                                                    size={36}
                                                    color='green'
                                                /> : <></>
                                            }
                                        </TouchableOpacity>
                                        <Text style={{ ...styles.lessonInfo, paddingLeft: 15 }}>Присутствуют все</Text>
                                    </View>
                                </View>
                            </ListItem>
                            {isAll ? <></> : stat?.map(item => (
                                <AbsenceStudentCard key={item.student_id} saveChange={saveChange} student={item} />
                            ))}
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Visit)
