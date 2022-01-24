import React, { useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, Linking } from 'react-native';
import { useSelector } from "react-redux";

import { styles } from "../components/Style";

const Lesson = ({navigation}) => {
    const lesson = useSelector(state => state.lesson.lesson);
    const homework = useSelector(state => state.lesson.homework);
    const links = useSelector(state => state.lesson.links);
    const date = useSelector(state => state.date.stringDate);
    const d = useSelector(state => state.date.stringDay);
    const m = useSelector(state => state.date.stringMonth);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: lesson.subject_name });
    }, []);

    const handleLink = async (url) => {
        await Linking.openURL(encodeURI(url).replace(/[' ']/g, '%20'));
        console.log(url.replace(/[' ']/g, '%20'));
    };

    const data = [
        { title: 'Дата', info: `${date} ${m}, ${d}` },
        { title: 'Тема урока', info: lesson.name_lesson },
        { title: 'Домашнее задание', info: homework, links: links },
        { title: 'Оценки', info: lesson.value },
        { title: 'Замечания', info: lesson.comment, type: lesson.comment_type }
    ];

    const [selectable, setSelectable] = useState(false);

    const handlePress = (uri) => {
        setSelectable(true);
        handleLink(uri);
    }

    const Item = ({title, info, links, type}) => {
        return (
            <View>
                <Text style={styles.lessonInfoTitle}>
                    {title}
                </Text>
                {
                    info ? 
                    <Text 
                        key={info}
                        onPress={() => setSelectable(true)}
                        selectable={selectable}
                        style={{
                            ...styles.lessonInfo, 
                            color: type === 0 
                            ? 'red' 
                            : type === 1 
                            ? 'green' 
                            : '#000'
                        }}
                    >
                        {info.toString()}
                    </Text>
                    : <></>
                }
                {
                    links ? 
                    links.map(link => (
                        <Text 
                            key={link}
                            selectable={selectable} 
                            onPress={() => handlePress(link)} 
                            style={{ ...styles.lessonInfo, color: '#0080ff'}}
                        >
                            {link}
                        </Text>
                    ))
                    : <></>
                }
            </View>
        );
    };

    const renderItem = ({item}) => {
        if (item.info || item.links) {
            return (
                <View>
                    <Item title={item.title} info={item.info} links={item.links} type={item.type} />
                </View>
            )
        }
    };

    const Files = () => (
        <View style={{ paddingBottom: 20 }}>
            <Text style={styles.lessonInfoTitle}>
                Файлы
            </Text>

            <View style={{flexDirection: 'row'}}>
                <Text
                    style={
                        {
                            ...styles.lessonInfo, fontStyle: 'italic'
                        }
                    }
                >
                    {lesson.numrows_files_lesson != 0 ? `Общие: ${lesson.numrows_files_lesson}` : ''}
                </Text>
                <Text
                    style={
                        {
                            ...styles.lessonInfo, fontStyle: 'italic'
                        }
                    }
                >
                    {lesson.numrows_files_ind != 0 ? `Индивидуальные: ${lesson.numrows_files_ind}` : ''}
                </Text>
            </View>

            <View>
                {lesson.files_lesson.map(item =>
                    <Text
                        style={
                            {
                                ...styles.lessonInfo, color: 'green'
                            }
                        }
                        key={lesson.lesson_id}
                        onPress={
                            () => handleLink(item.url)
                        }
                    >
                        {item.title}
                    </Text>
                )}
            </View>

            <View>
                {lesson.files_ind.map(item =>
                    <Text
                        style={
                            {
                                ...styles.lessonInfo, color: 'red'
                            }
                        }
                        key={lesson.files_ind}
                        onPress={
                            () => handleLink(item.url)
                        }
                    >
                        {item.title}
                    </Text>
                )}
            </View>
        </View>
    );

    return (
        <FlatList
            style={{padding: 10}}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.title}
            ListFooterComponent={
                lesson.files.length != 0 ? <Files /> : ''
            }
        />
    );
};

export default Lesson;