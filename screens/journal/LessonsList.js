import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import JournalButton from '../../components/Button';
import QuartersHeader from '../../components/QuartersHeader';
import { styles } from './JournalLessons';

const LessonsList = (props) => {
    const {navigation, userData, term} = props;
    const {pk, class_id, group, numclass, ind, lesson} = props.route.params;
    const [list, setList] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        const groupName = ind ? ' ' + ind : ' ' + group + ' группа';
        const classNum = numclass.includes('-') ? '' : numclass + ' класс, ';
        setValue(
            lesson + ', ' + classNum + groupName
        )
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
          title: value === '' ? 'Список уроков' : value,
        });
      }, [navigation, value]);

    useEffect(() => {
        console.log(props.route.params)
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&subject_id=${pk}&class_id=${class_id}&class_group=${group}&period=${term}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setList(res.lessons_array);
        })
        .catch(err => console.log(err));
    }, [term]);

    const buttons = [
        {title: 'Открыть журнал', screen: 'Журнал', params: {}},
        {title: '+ Добавить урок', screen: 'Редактирование урока', params: {date: null, lesson: null, lesson_id: null}},
    ];

    const Item = ({date, lesson, lesson_id}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Редактирование урока', {lesson_id})} style={{ ...styles.listItem, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontStyle: 'italic' }}>{date}</Text>
            <Text>{lesson}</Text>
        </TouchableOpacity>
    );

    const renderList = ({item}) => (
        <Item date={item.data_lesson} lesson={item.name_lesson} lesson_id={item.lesson_id} />
    );

    const handlePress = (screen, params) => {
        navigation.navigate(screen, params);
    };

    const renderItem = ({item}) => (
        <JournalButton title={item.title} onPress={() => handlePress(item.screen, item.params)} />
    );

    return(
        <SafeAreaView style={styles.container}>
            <QuartersHeader term={term} />
            {/* <Text>
                {lesson.subject_name}, 
                {' ' + numclass} класс,
                {ind ? ' ' + ind : ' ' + group + ' группа'}
            </Text> */}
            <View style={style.container}>
                <FlatList 
                    data={buttons}
                    renderItem={renderItem}
                    keyExtractor={item => item.title}
                />
                {
                    list ?
                    <FlatList 
                        data={list}
                        renderItem={renderList}
                        keyExtractor={item => item.lesson_id}
                    /> :
                    <View style={styles.listItem}>
                        <Text style={{ textAlign: 'center' }}>Нет добавленных уроков</Text>
                    </View>
                }
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    container: {
        margin: 5,
    },
});

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        subjects: state.jlr.subjects,
        term: state.marks.term
    };
};

export default connect(mapStateToProps)(LessonsList)