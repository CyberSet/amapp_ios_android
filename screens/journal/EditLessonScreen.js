import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import InputField from "../../components/Input";
import { journalLessonsStyle } from "./JournalLessons";
import JournalButton from "../../components/Button";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { pickDay } from '../../store/reducers/jLessonsReducer';
// import { pickSubject } from "../../store/reducers/jLessonsReducer";
import ExpandedCalendar from '../../components/Calendar';

const EditLesson = (props) => {
    const {navigation, userData, day, pickDay} = props;
    const {date, lesson_id, pk, class_id, group, numclass, ind, lesson} = props.route.params;
    const buttons = [
        {title: 'Удалить'},
        {title: 'Сохранить'}
    ];
    const fields = [
        {title: 'Дата', value: 'data_lesson'}, 
        {title: 'Тема урока', value: 'name_lesson'}, 
        {title: 'Домашнее задание', value: 'homework'}, 
        {title: 'Описание урока', value: 'title_of_lesson'},
        {title: 'Тип урока', value: 'type_of_lesson'},
        {title: 'Файлы', value: 'general_file'},
        {title: 'Замечания', value: 'number_of_comments'},
        {title: 'Индивидуальные файлы', value: 'files'},
        {title: 'Ответ ученика', value: 'number_of_student_files'},
    ];
    const [objectLesson, setObjectLesson] = useState(null);
    const [calendarOpened, setCalendarOpened] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
          title: lesson_id ? 'Редактирование урока' : 'Добавление урока',
        });
    }, [navigation, lesson_id]);

    useEffect(() => {
        day ?
        setSelectedDay(day.substring(5).split('-').reverse().join('.')) :
        setSelectedDay(date);
    }, [day]);

    useEffect(() => {
        pickDay('');
    }, [navigation]);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson_edit.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setObjectLesson(res.lessons_array);
        })
        .catch(err => console.log(err));
    }, []);

    const makeURL = (...args) => {
        const start = `https://diary.alma-mater-spb.ru/e-journal/api/save_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&class_id=${class_id}&subject_id=${pk}&class_group=${group}`;

        let tail;

        let keys = [];
        fields.map(field => {
            keys.push(field.value)
            console.log(keys);
        });
        let keysArgs = [];
        for (let arg of args) {
            keys.map(key => {
                if (args.indexOf(arg) === keys.indexOf(key)) {
                    keysArgs.push(`&${key}=${arg}`);
                }
            });
        }
        console.log(keysArgs);

        tail = keysArgs.join('');
        console.log(tail);

        if (tail.includes('data_lesson')) {
            tail = tail.replace('data_lesson', 'date_lesson');
        }

        const url = encodeURI(start + tail);
        console.log(url);
        return url;
    }

    const addLesson = async (...args) => {
        const url = makeURL(...args);
        // await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(res => res.json())
        // .then(res => console.log(res))
        // .catch(err => console.log(err));

        // navigation.navigate('Список уроков', {pk, class_id, group, numclass, ind, lesson});
    };

    const saveChanges = (clue, param) => {
        // fetch(`https://diary.alma-mater-spb.ru/e-journal/api/save_edit_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}&${clue}=${param}`)
        //     .then(res => res.json())
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err));
        console.log(`https://diary.alma-mater-spb.ru/e-journal/api/save_edit_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}&${clue}=${param}`);
    };

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
    );

    return (
        <SafeAreaView style={{ margin: 5 }}> 
            <ScrollView>
                {
                    calendarOpened ?
                    <ExpandedCalendar onPress={() => {
                        console.log(day);
                        setCalendarOpened(false);
                    }
                } /> : <></>
                }
                {objectLesson ?
                    <ScrollView style={journalLessonsStyle.listItem}> 
                    {fields.map(field => (
                        field.value === 'data_lesson' ?
                        <JournalButton 
                                key={field.title} 
                                title={selectedDay} 
                                onPress={() => setCalendarOpened(!calendarOpened)} 
                            /> : field.value === 'type_of_lesson' ?
                            <JournalButton 
                                key={field.title} 
                                title={objectLesson[field.value] === 0 ? 'Обычный урок' : 'Контроль'} 
                                onPress={() => navigation.navigate('Типы уроков', {pk})} 
                            /> : field.value === 'general_file' ?
                            <JournalButton 
                                key={field.title} 
                                title={'+ Добавить файл'} 
                                onPress={() => console.log('files')} 
                            />  : 
                            <InputField
                                key={field.title} 
                                title={field.title}
                                value={objectLesson[field.value]}
                                onChangeText={text => 
                                    setObjectLesson({ ...objectLesson, [field.value]: text })
                                }
                            />
                        ))
                    }
                    </ScrollView> : <></>
                }
                <AcceptChangesPanel />
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        user: state.auth.user,
        day: state.jlr.day
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        pickDay
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLesson);