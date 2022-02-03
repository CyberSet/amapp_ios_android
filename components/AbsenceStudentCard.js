import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AbsenceReasonsCard from './AbsenceReasonsCard';

import { styles } from "./Style";
import JournalButton from './ui/Button'
import ListItem from './ui/ListItem'

const AbsenceStudentCard = ({student, saveChange}) => {
    const [isDropdownExpanded, setDropdownExpanded] = useState(false)
    const [absenceReason, setAbsenceReason] = useState('')
    const [isDistantStudent, setDistantStudent] = useState('')

    useEffect(() => {
        const value = Number(student.absence_array.value)
        absenceReasons[value]
        ? setAbsenceReason(absenceReasons[value].title)
        : setAbsenceReason(absenceReasons[0].title)

        const distance = Boolean(Number(student.absence_array.distance))
        setDistantStudent(distance)
    }, [])

    console.log(Number(isDistantStudent))

    const absenceReasons = [
        {reason_id: 0, title: ' - '},
        {reason_id: 1, title: 'Болезнь (справка)'},
        {reason_id: 2, title: 'Плохое самочувствие (без справки до 3 дней)'},
        {reason_id: 3, title: 'Семейные обстоятельства'},
        {reason_id: 4, title: 'Отдых (по заявлению)'},
        {reason_id: 5, title: 'Соревнования/выступления/Олимпиады'},
        {reason_id: 6, title: 'Иное'},
    ]

    return (
        <ListItem>
            <Text style={{ fontSize: 20, padding: 10, fontWeight: 'bold' }}>{student.surname} {student.name}</Text>
            <View style={{ paddingLeft: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 }}>
                    <TouchableOpacity 
                        style={{ borderWidth: 2, width: 35, height: 35 }}
                        onPress={() => {
                            setDistantStudent(!isDistantStudent)
                            saveChange(3, Number(!isDistantStudent), student.student_id)
                        }}
                    >
                        {isDistantStudent ?
                            <Icon
                                name='checkmark'
                                size={30}
                                color='green'
                            /> : <></>
                        }
                    </TouchableOpacity>
                    <Text style={{ ...styles.lessonInfo, paddingLeft: 15 }}>Учится дистанционно</Text>
                </View>
            </View>
            <Text style={{ fontSize: 16, padding: 5 }}>Причина отсутствия:</Text>
            <JournalButton title={absenceReason} onPress={() => setDropdownExpanded(!isDropdownExpanded)}/>
            {isDropdownExpanded ?
                <View>
                    {absenceReasons.map(reason =>
                        <AbsenceReasonsCard 
                            saveChange={saveChange}
                            saveChange={saveChange}
                            reason={reason} 
                            student_id={student.student_id}
                            setDropdownExpanded={setDropdownExpanded} 
                            absenceReason={absenceReason} 
                            setAbsenceReason={setAbsenceReason} 
                        />
                    )}
                </View> : <></>   
            }
        </ListItem>
    )
}

export default AbsenceStudentCard
