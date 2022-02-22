import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import InputField from '../../components/ui/Input'
import JournalButton from '../../components/ui/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pickDay, setObjectLesson, setLessonTypes } from '../../store/actions/actions'
import ExpandedCalendar from '../../components/Calendar'
import ListItem from '../../components/ui/ListItem'

const EditLesson = (props) => {
    const {navigation, userData, day, pickDay, objectLesson, setObjectLesson, lessonTypes, setLessonTypes} = props
    const {date, lesson_id, pk, class_id, group} = props.route.params
    const [answers, setAnswers] = useState([])
    const buttons = [
        {title: 'Удалить'},
    ]
    const fields = [
        {title: 'Дата', value: 'data_lesson'}, 
        {title: 'Тема урока', value: 'name_lesson'}, 
        {title: 'Домашнее задание', value: 'homework'}, 
        {title: 'Описание урока', value: 'title_of_lesson'},
        {title: 'Тип урока', value: 'type_of_lesson'},
        {title: 'Файлы', value: 'general_file'},
        {title: 'Замечания', value: 'list_of_comments'},
        {title: 'Индивидуальные файлы', value: 'files'},
        {title: 'Ответ ученика', value: 'list_of_files_students'},
    ]
    const [calendarOpened, setCalendarOpened] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [comments, setComments] = useState(null)
    const [indFiles, setIndFiles] = useState(0)

    useLayoutEffect(() => {
        navigation.setOptions({
          title: lesson_id ? 'Редактирование урока' : 'Добавление урока',
        })
    }, [navigation, lesson_id])

    useEffect(() => {
        day ?
        setSelectedDay(day.substring(5).split('-').reverse().join('.')) :
        setSelectedDay(date)
    }, [day])

    useEffect(() => {
        pickDay('')
    }, [navigation])

    useEffect(() => {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_lesson_edit.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setObjectLesson(res.lessons_array)
                console.log(res.lessons_array.list_of_files_ind)
                res.lessons_array.list_of_files_ind.map(item => {
                    console.log(item.files_array)
                        if (item.files_array.length !== 0) {
                            setIndFiles(indFiles + 1)
                        }
                })
            })
            .catch(err => console.log(err))
    }, [])

    // lesson types
    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_types_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&class_id=${class_id}&subject_id=${pk}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setLessonTypes(res.select_type_of_lesson)
            })
            .catch(err => console.log(err))
    }, [])

    // comments
    useEffect(() => {
        let arr = []
        objectLesson?.list_of_comments.map(item => {
            if (item.comment) {
                arr.push(item.comment)
            }
        })
        setComments(arr.length)
    }, [objectLesson])

    // ind files
    useEffect(() => {
        setAnswers(null)
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_student_answer.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                console.log(res.students_answer_array)
                let answerArr = [];
                res.students_answer_array.map(item => {
                    if (item.answer_array.length !== 0) {
                        answerArr.push(item)
                    }
                })
                setAnswers(answerArr)
            })
            .catch(err => console.log(err))
    }, [])

    const makeURL = (...args) => {
        const start = `https://diary.alma-mater-spb.ru/e-journal/api/save_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&class_id=${class_id}&subject_id=${pk}&class_group=${group}`

        let keys = []
        fields.map(field => {
            keys.push(field.value)
            console.log(keys)
        })
        let keysArgs = []
        for (let arg of args) {
            keys.map(key => {
                if (args.indexOf(arg) === keys.indexOf(key)) {
                    keysArgs.push(`&${key}=${arg}`)
                }
            })
        }
        console.log(keysArgs)

        let tail = keysArgs.join('')
        console.log(tail)

        if (tail.includes('data_lesson')) {
            tail = tail.replace('data_lesson', 'date_lesson')
        }

        const url = encodeURI(start + tail)
        console.log(url)
        return url
    }

    const addLesson = async (...args) => {
        const url = makeURL(...args)
        // await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(res => res.json())
        // .then(res => console.log(res))
        // .catch(err => console.log(err))

        // navigation.navigate('Список уроков', {pk, class_id, group, numclass, ind, lesson})
    }

    const saveChanges = (clue, param) => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/save_edit_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}&${clue}=${param}`)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
        console.log(`https://diary.alma-mater-spb.ru/e-journal/api/save_edit_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}&${clue}=${param}`)
    }

    const AcceptChangesPanel = () => (
        buttons.map(button => (
            <JournalButton key={button.title} title={button.title} onPress={() => {
                button.title === 'Удалить' ? 
                navigation.goBack() : 
                addLesson(
                    selectedDay, 
                    objectLesson.name_lesson,
                    objectLesson.homework,
                    objectLesson.title_of_lesson,
                    objectLesson.type_of_lesson,
                    objectLesson.general_file,
                    objectLesson.number_of_comments,
                    objectLesson.files,
                    objectLesson.number_of_student_files,
                )
            }} />
        ))
    )

    return (
        <SafeAreaView style={{ margin: 5 }}> 
            <ScrollView>
                {calendarOpened ?
                    <ExpandedCalendar onPress={() => {
                        console.log(day)
                        setCalendarOpened(false)
                        saveChanges('date_lesson', day)
                    }} /> : <></>
                }
                {objectLesson ?
                    <ListItem> 
                    {fields.map(field => (
                        field.value === 'data_lesson' ?
                            <JournalButton 
                                key={field.title} 
                                title={selectedDay ? selectedDay : 'Выберите дату'} 
                                onPress={() => setCalendarOpened(!calendarOpened)} 
                            /> : field.value === 'type_of_lesson' ?
                            <JournalButton 
                                key={field.title} 
                                title={
                                    objectLesson[field.value] === 0 ?
                                    'Обычный урок' :
                                    lessonTypes?.map(type => (
                                        type.id === objectLesson[field.value] ?
                                        type.title :
                                        ''
                                    ))
                                } 
                                color={objectLesson[field.value] === 0 ? '#00656D' : 'red'}
                                onPress={() => {
                                    navigation.navigate('Типы уроков', {pk})
                                    console.log(objectLesson[field.value])
                                }} 
                            /> : field.value === 'general_file' ?
                            <JournalButton 
                                key={field.title} 
                                title={'+ Добавить файл'} 
                                onPress={() => console.log('files')} 
                            />  : field.value === 'list_of_files_students' ?
                            objectLesson[field.value].length > 0 ?
                            <JournalButton 
                                key={field.title} 
                                title={field.title + '(' + objectLesson[field.value].length + ')'} 
                                onPress={() => navigation.navigate('Ответ ученика')} 
                            /> :
                            <></> : field.value === 'list_of_comments' ?
                            <JournalButton 
                                key={field.title} 
                                title={field.title + ' (' + comments + ')'} 
                                onPress={() => navigation.navigate('Замечания')} 
                            /> : field.value === 'files' ?
                            <JournalButton 
                                key={field.title} 
                                title={field.title + ' (' + answers?.length + ')'} 
                                onPress={() => navigation.navigate('Индивидуальные файлы', {answers})} 
                            /> :
                            <InputField
                                key={field.title}  
                                title={field.title}
                                value={objectLesson[field.value]}
                                onChangeText={text => {
                                    setObjectLesson({ ...objectLesson, [field.value]: text })
                                }}
                                onEndEditing={() => {
                                    saveChanges(field.value, objectLesson[field.value])
                                    console.log(field.value, objectLesson[field.value])
                                }}
                            />
                        ))
                    }
                    </ListItem> : <></>
                }
                <AcceptChangesPanel />
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        user: state.auth.user,
        day: state.jlr.day,
        objectLesson: state.jlr.objectLesson,
        lessonTypes: state.jlr.lessonTypes
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        pickDay,
        setObjectLesson,
        setLessonTypes
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLesson)
