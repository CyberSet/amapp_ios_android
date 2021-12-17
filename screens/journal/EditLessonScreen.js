import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import InputField from "../../components/Input";
import { styles } from "./JournalLessons";
import JournalButton from "../../components/Button";
import { connect } from "react-redux";

const EditLesson = (props) => {
    const {navigation, userData} = props;
    const {date, lesson, lesson_id} = props.route.params;
    const [theme, setTheme] = useState(lesson ? lesson : 'Тема урока');
    const [lessonDate, setLessonDate] = useState(date ? date : 'Дата');
    const buttons = [
        {title: 'Удалить'},
        {title: 'Сохранить'}
    ];

    // const sendChanges = () => {
    //     console.log(props.route.params)
    //     fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson_edit.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id${lesson_id}`)
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => console.log(err));
    // };

    useEffect(() => {
        console.log(userData)
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson_edit.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id${lesson_id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
          title: date != null ? 'Редактирование урока' : 'Добавление урока',
        });
    }, [navigation, date]);

    const renderItem = ({item}) => (
        <JournalButton title={item.title} onPress={() => navigation.goBack()} />
    );

    return (
        <SafeAreaView style={{ margin: 5 }}>
            <View style={styles.listItem}>
                <InputField 
                    value={lessonDate}
                    onChangeText={setLessonDate}
                />
                <InputField 
                    value={theme}
                    onChangeText={setTheme}
                />
            </View>
            <FlatList 
                data={buttons}
                renderItem={renderItem}
                keyExtractor={item => item.title}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
    };
};

export default connect(mapStateToProps)(EditLesson)