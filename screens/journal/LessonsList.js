import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import JournalButton from '../../components/Button';
import { styles } from '../../components/Style';

const LessonsList = (props) => {
    const {navigation, userData, subjects} = props;
    const {pk, group, numclass} = props.route.params;
    const [lesson, setLesson] = useState('');
    const [list, setList] = useState('');

    useEffect( async () => {
       await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}subject_id=${pk}&class_id=22&class_group=1&period=1`)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
        subjects.map(lesson => {
            if (lesson.subject_id === pk)
                setLesson(lesson);
        });
    }, []);

    const buttons = [
        {title: 'Открыть журнал', screen: 'Журнал'},
        {title: '+ Добавить урок', screen: 'Добавление урока'}
    ];

    const _handlePress = (screen) => {
        navigation.navigate(screen);
    };

    const _renderItem = ({item}) => (
        <JournalButton title={item.title} onPress={() => _handlePress(item.screen)} />
    );
    return(
        <SafeAreaView style={styles.journalContainer}>
            <Text>
                {lesson.subject_name}, 
                {' ' + numclass} класс,
                {' ' + group}
                </Text>
                <FlatList 
                    data={buttons}
                    renderItem={_renderItem}
                    keyExtractor={item => item.title}
                />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        subjects: state.jlr.subjects
    };
};

export default connect(mapStateToProps)(LessonsList)