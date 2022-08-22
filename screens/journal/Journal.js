import React, { Component, useEffect, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import JournalButton from '../../components/ui/Button';
import ListContainer from '../../components/ui/ListContainer';
import ListItem from '../../components/ui/ListItem';

const Journal = (props) => {
    const { navigation, userData } = props;
    const { pk, class_id, group, term } = props.route.params;

    const [studentsMarksArray, setStudentsMarksArray] = useState([]);
    const [lessonsArray, setLessonsArray] = useState([]);
    console.log(pk, class_id, group)

    const marksColor = [
        "#000000",
        "#540099",
        "#44944A",
        "#0000FF",
        "#FF4E33"
    ]

    //`https://diary.alma-mater-spb.ru/e-journal/api/open_journal.php?clue=${props.userData.clue}&user_id=${props.userData.user_id}&subject_id=${pk}&class_id=${class_id}&class_group=${group}&period=${term}`
    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_journal.php?clue=${props.userData.clue}&user_id=${props.userData.user_id}&subject_id=${pk}&class_id=${class_id}&class_group=${group}&period=${term}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                const tempStudents = []
                let i = 1
                while (res.students_marks_array[i] !== undefined) {
                    tempStudents.push(res.students_marks_array[i])
                    i++
                }
                setStudentsMarksArray(tempStudents)
                setLessonsArray(res.lessons)
            })
            .catch(err => console.log(res))
    }, [])

    const CeilItem = ({ lesson_id, lessonIndex, info, student_id }) => (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() =>
                navigation.navigate('Редактирование оценок', { lesson_id, student_id, class_id })
            }>
                <ListItem>
                    {lessonsArray[lessonIndex] ? <Text style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>{lessonsArray[lessonIndex].date_format} {lessonsArray[lessonIndex].abbreviation}</Text> : <></>}
                    {info.delay ? <Text>О</Text> : <></>}
                    {info.absence ? <Text>Н</Text> : <></>}
                    <View style={{ width: 15 }}>
                        {info.marks.map(
                            mark => (
                                <Text style={mark.coefficient == 1 ? { color: marksColor[0] } :
                                    mark.coefficient == 2 ? { color: marksColor[1] } :
                                        mark.coefficient == 3 ? { color: marksColor[2] } :
                                            mark.coefficient == 4 ? { color: marksColor[3] } :
                                                { color: marksColor[4] }}
                                >{mark.value}</Text>
                            )
                        )}
                    </View>
                </ListItem>
            </TouchableOpacity>
    )


    return (
        <SafeAreaView>
            <ScrollView>
                <ListContainer style={{ flexDirection: 'row' }}>
                    {studentsMarksArray ? studentsMarksArray.map(
                        student => {
                            let lessonIndex = -1;
                            return (<View style={{ flexDirection: 'row' }}>
                                <ListItem>
                                    <View style={{ width: 130 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{student.surname}</Text>
                                        <Text>{student.name}</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{student.average.toFixed(2)}</Text>
                                    </View>
                                </ListItem>
                                <ScrollView horizontal={true}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {student.marks_array.map(
                                            info => {
                                                lessonIndex++;
                                                return (
                                                    <CeilItem lessonIndex={lessonIndex} lesson_id={lessonsArray[lessonIndex] ? lessonsArray[lessonIndex].lesson_id : 0} info={info} student_id={student.student_id} />
                                                )
                                            }
                                        )}
                                    </View>
                                </ScrollView>

                            </View>
                            )
                        }
                    )
                        :
                        <Text>Загрузка...</Text>
                    }
                </ListContainer>
            </ScrollView>
        </SafeAreaView>
    )
}

function mapStateToProps(state) {
    return {
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps)(Journal)
