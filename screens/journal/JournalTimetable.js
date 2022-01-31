import React, { useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import TeacherSchedule from '../../components/TeacherSchedule'
import TeachersList from '../../components/TeachersList'
import JournalButton from '../../components/ui/Button'
import ListContainer from '../../components/ui/ListContainer'

const JournalTimetable = () => {
    const [teacher, setTeacher] = useState(null)
    const [teachersListExpanded, setTeachersListExpanded] = useState(false)

    const selectTeacher = (teacher) => {
        setTeacher(teacher)
        setTeachersListExpanded(false)
    }

    const buttonHandler = () => {
        setTeacher(null)
        setTeachersListExpanded(!teachersListExpanded)
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ListContainer>
                    <JournalButton 
                        title={
                            teacher ? `${teacher.surname} ${teacher.name} ${teacher.middlename}` : 'Выберите учителя'
                        } 
                        onPress={() => buttonHandler()}
                    />
                    {teachersListExpanded 
                        ? <TeachersList onPress={selectTeacher} /> 
                        : <></>
                    }
                    {teacher 
                        ? <TeacherSchedule teacher={teacher} /> 
                        : <></>
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

export default connect(mapStateToProps)(JournalTimetable)
