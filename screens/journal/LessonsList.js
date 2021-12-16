import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import JournalButton from '../../components/Button';
import QuartersHeader from '../../components/QuartersHeader';

const LessonsList = (props) => {
    const {navigation, userData, subjects, term} = props;
    const {pk, class_id, group, numclass, ind} = props.route.params;
    const [lesson, setLesson] = useState('');
    const [list, setList] = useState('');

    useEffect(() => {
        console.log(props.route.params)
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&subject_id=${pk}&class_id=${class_id}&class_group=${group}&period=${term}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setList(res.lessons_array);
        })
        .catch(err => console.log(err));
        subjects.map(lesson => {
            if (lesson.subject_id === pk)
                setLesson(lesson);
        });
    }, [term]);

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
        <SafeAreaView style={styles.container}>
            <QuartersHeader term={term} />
            <Text>
                {lesson.subject_name}, 
                {' ' + numclass} класс,
                {ind ? ' ' + ind : ' ' + group + ' группа'}
                </Text>
                <FlatList 
                    data={buttons}
                    renderItem={_renderItem}
                    keyExtractor={item => item.title}
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
})

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        subjects: state.jlr.subjects,
        term: state.marks.term
    };
};

export default connect(mapStateToProps)(LessonsList)