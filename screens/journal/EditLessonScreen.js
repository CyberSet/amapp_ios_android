import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import InputField from "../../components/Input";
import { styles } from "./JournalLessons";
import JournalButton from "../../components/Button";
import { connect } from "react-redux";

const EditLesson = (props) => {
    const {navigation, userData} = props;
    const {lesson_id} = props.route.params;
    const buttons = [
        {title: 'Удалить'},
        {title: 'Сохранить'}
    ];
    const fields = [
        {title: 'Дата', value: 'data_lesson'}, 
        {title: 'Тема урока', value: 'name_lesson'}, 
        {title: 'Домашнее задание', value: 'homework'}, 
        {title: 'Домашнее задание', value: 'title_of_lesson'},
    ];
    const [objectLesson, setObjectLesson] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
          title: lesson_id ? 'Редактирование урока' : 'Добавление урока',
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
            {objectLesson ?
                <ScrollView style={styles.listItem}> 
                {fields.map(field => (
                        <InputField
                            title={field.title}
                            value={objectLesson[field.value]}
                            onChangeText={text => 
                                setObjectLesson({ ...objectLesson, [field.value] : text })
                            }
                        />
                    ))
                }
                </ScrollView> : <></>
            }
            <AcceptChangesPanel />
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