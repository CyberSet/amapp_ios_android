import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import ClassesList from '../../components/ClassesList'
import ClassSchedule from '../../components/ClassSchedule'
import TeacherSchedule from '../../components/TeacherSchedule'
import TeachersList from '../../components/TeachersList'
import JournalButton from '../../components/ui/Button'
import ListContainer from '../../components/ui/ListContainer'
import ListItem from '../../components/ui/ListItem'

const JournalTimetable = () => {
    const [teacher, setTeacher] = useState(null)
    const [teachersListExpanded, setTeachersListExpanded] = useState(false)

    const [schoolClass, setSchoolClass] = useState(null)
    const [classesListExpanded, setClassesListExpanded] = useState(false)

    const selectTeacher = (teacher) => {
        setTeacher(teacher)
        setTeachersListExpanded(false)
    }

    const teacherButtonHandler = () => {
        setTeacher(null)
        setTeachersListExpanded(!teachersListExpanded)
    }

    const selectClass = (schoolClass) => {
        setSchoolClass(schoolClass)
        setClassesListExpanded(false)
    }

    const classButtonHandler = () => {
        setSchoolClass(null)
        setClassesListExpanded(!classesListExpanded)
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ListContainer>
                    <JournalButton 
                        title={
                            teacher ? `${teacher.surname} ${teacher.name} ${teacher.middlename}` : 'Выберите учителя'
                        } 
                        onPress={() => teacherButtonHandler()}
                    />
                    {teachersListExpanded 
                        ? <TeachersList onPress={selectTeacher} /> 
                        : <></>
                    }
                    {teacher 
                        ? <TeacherSchedule teacher={teacher} /> 
                        : <></>
                    }
                    <JournalButton 
                        title={
                           schoolClass ? schoolClass.class_name : 'Выберите класс'
                        } 
                        onPress={() => classButtonHandler()}
                    />
                    {classesListExpanded 
                        ? <ClassesList onPress={selectClass} /> 
                        : <></>
                    }
                    {schoolClass 
                        ? <ClassSchedule class_id={schoolClass.class_id} /> 
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
