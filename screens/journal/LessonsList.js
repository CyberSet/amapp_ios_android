import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import JournalButton from '../../components/ui/Button';
import QuartersHeader from '../../components/QuartersHeader';
import ListItem from '../../components/ui/ListItem';
import ListContainer from '../../components/ui/ListContainer';
import { useIsFocused } from '@react-navigation/native';

const LessonsList = (props) => {
    const {navigation, userData, term} = props;
    const {pk, class_id, group, numclass, ind, lesson} = props.route.params;
    const [list, setList] = useState('');
    const [value, setValue] = useState('');
    const isFocused = useIsFocused();

    const buttons = [
        {title: 'Открыть журнал', screen: 'Журнал', params: {
            pk: pk,
            class_id: class_id,
            group: group,
            term: term
        }},
        {
            title: '+ Добавить урок', 
            screen: 'Редактирование урока', 
            params: {
                pk: pk, 
                class_id: class_id, 
                group: group,
                numclass: numclass,
                ind: ind,
                lesson: lesson
            }
        },
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
          title: value === '' ? 'Список уроков' : value,
        });
      }, [navigation, value]);

    useEffect(() => {
        const groupName = ind ? ' ' + ind : ' ' + group + ' группа';
        const classNum = numclass.includes('-') ? '' : numclass + ' класс, ';
        setValue(
            lesson + ', ' + classNum + groupName
        )
    }, []);

    useEffect(() => {
        console.log(props.route.params)
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&subject_id=${pk}&class_id=${class_id}&class_group=${group}&period=${term}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setList(res.lessons_array);
        })
        .catch(err => console.log(err));
    }, [term, navigation, isFocused]);

    const Item = ({date, lesson, lesson_id, pk, class_id, group, numclass, ind}) => (
        <TouchableOpacity 
            onPress={() => 
                navigation.navigate('Редактирование урока', 
                {date, lesson, lesson_id, pk, class_id, group, numclass, ind}
            )}
        >
            <ListItem>
                <Text style={{ fontStyle: 'italic' }}>{date}</Text>
                <Text>{lesson}</Text>
            </ListItem>
        </TouchableOpacity>
    );

    const renderLessonsList = ({item}) => (
        <Item 
            date={item.data_lesson} 
            lesson={item.name_lesson} 
            lesson_id={item.lesson_id} 
            pk={pk} 
            class_id={class_id} 
            group={group}
            numclass={numclass}
            ind={ind}
        />
    );

    const handlePress = (screen, params) => {
        navigation.navigate(screen, params);
    };

    const OptionsPanel = () => (
        buttons.map(button => (
            <JournalButton key={button.title} title={button.title} onPress={() => handlePress(button.screen, button.params)} />
        ))
    );

    const Header = () => {
        return(
            <View>
                <QuartersHeader term={term} />
                <OptionsPanel />
            </View>
        )
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ListContainer>
                {list ? 
                    <FlatList 
                        ListHeaderComponent={Header}
                        data={list}
                        renderItem={renderLessonsList}
                        keyExtractor={item => item.lesson_id}
                    /> :
                    <>
                        <Header />
                        <ListItem>
                            <Text style={{ textAlign: 'center' }}>Нет добавленных уроков</Text>
                        </ListItem>
                    </>
                }
            </ListContainer>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        term: state.marks.term
    };
};

export default connect(mapStateToProps)(LessonsList)