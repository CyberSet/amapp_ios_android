import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import InputField from "../../components/Input";
import { styles } from "./JournalLessons";
import JournalButton from "../../components/Button";
import { connect } from "react-redux";

const EditLesson = (props) => {
    const {navigation, userData} = props;
    const {lesson, lesson_id} = props.route.params;
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

    useLayoutEffect(() => {
        navigation.setOptions({
          title: lesson ? 'Редактирование урока' : 'Добавление урока',
        });
    }, [navigation, lesson_id]);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson_edit.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setObjectLesson(res.lessons_array);
        })
        .catch(err => console.log(err));
    }, []);

    const AcceptChangesPanel = () => (
        buttons.map(button => (
            <JournalButton key={button.title} title={button.title} onPress={() => navigation.goBack()} />
        ))
    );

    return (
        <SafeAreaView style={{ margin: 5 }}> 
            <ScrollView>
                {objectLesson ?
                    <ScrollView style={styles.listItem}> 
                    {fields.map(field => (
                        field.value === 'type_of_lesson' ?
                            <JournalButton 
                                key={field.title} 
                                title={objectLesson[field.value] === 0 ? 'Обычный урок' : 'Контроль'} 
                                onPress={() => navigation.navigate('Типы уроков', {lesson_id})} 
                            /> : field.value === 'general_file' ?
                            <JournalButton 
                                key={field.title} 
                                title={'+ Добавить файл'} 
                                onPress={() => console.log('files')} 
                            />  : 
                            <InputField
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
    };
};

export default connect(mapStateToProps)(EditLesson)