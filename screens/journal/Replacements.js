import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ScrollView, View, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';
import { connect } from "react-redux";
import { styles } from "../../components/Style";
import { journalLessonsStyle } from "./JournalLessons";
import { getMonthDeclination } from "../../components/Date";
import Icon from 'react-native-vector-icons/Ionicons';

const Replacements = (props) => {
    const {userData} = props;
    const [lessons, setLessons] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [week, setWeek] = useState(0);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_replacement.php?clue=${userData.clue}&user_id=${userData.user_id}&week=${week}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setLessons(res.replacement_array);
                res.replacement_array.map(lesson => {
                    console.log(lesson.replacement);
                });
            })
            .catch(err => console.log(err));
    }, [week]);

    useEffect(() => {
        let monthStart;
        let monthEnd;
        if (lessons.length > 0) {
            let monthStartNumber = lessons[0].currentData.substring(5).split('-').reverse()[1];
            if (monthStartNumber[0] === '0') {
                monthStartNumber = monthStartNumber.substring(1);
            }
            let monthEndNumber = lessons[lessons.length - 1].currentData.substring(5).split('-').reverse()[1];
            if (monthEndNumber[0] === '0') {
                monthEndNumber = monthEndNumber.substring(1);
            }
            monthStart = getMonthDeclination(monthStartNumber - 1);
            monthEnd = getMonthDeclination(monthEndNumber - 1);
            setStart(lessons[0].currentData.substring(5).split('-').reverse()[0] + ' ' + monthStart);
            setEnd(lessons[lessons.length - 1].currentData.substring(5).split('-').reverse()[0] + ' ' + monthEnd);
        }
    }, [lessons]);

    const Header = () => (
        <ScrollView contentContainerStyle={styles.adsScreen}>
            <Button
                onPress={() => setWeek(week + 1)}
            >
                <Icon
                    name='chevron-back-outline'
                    size={25}
                    color='#000'
                />
            </Button>
            <Text style={{ fontSize: 20 }}>
                {start} - {end}
            </Text>
            <Button
                onPress={() => setWeek(week - 1)}
            >
                <Icon
                    name='chevron-forward-outline'
                    size={25}
                    color='#000'
                />
            </Button>
        </ScrollView>
    );

    return (
        <SafeAreaView style={replStyles.container}>
            {
                lessons ?
                <ScrollView>
                    <Header />
                    {
                        lessons.map(lesson => (
                            lesson.replacement.map(repl => (
                                repl.type === 1 ?
                                <View style={journalLessonsStyle.listItem}>
                                    <View>
                                        <Text style={{ paddingVertical: 10 }}>date</Text>
                                    </View>
                                    <View style={replStyles.replInfoContainer}>
                                        <Text style={replStyles.lessonInfo}>
                                            {repl.sub_name}, 
                                            {repl.class_name}/{repl.group_id}, 
                                            {repl.number_lesson} урок, 
                                            {repl.reason}
                                        </Text>
                                        <Text style={replStyles.replInfo}>
                                            {repl.user_replacement ? repl.user_replacement : ''}, 
                                            {repl.sub_replacement}
                                        </Text>
                                    </View>
                                </View> :
                                <View style={journalLessonsStyle.listItem}>
                                <View>
                                    <Text style={{ paddingVertical: 10 }}>date</Text>
                                </View>
                                    <View style={replStyles.replInfoContainer}>
                                        <Text style={replStyles.lessonInfo}>
                                            {repl.class_name}, 
                                            {repl.reason}
                                        </Text>
                                        <Text style={replStyles.replInfo}>
                                            {repl.user_replacement}, 
                                            {repl.add_field}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        ))
                    }
                </ScrollView>
                : <Text>Нет замен</Text>
            }
        </SafeAreaView>
    );
};

const replStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    lessonInfo: {
        fontSize: 18,
        lineHeight: 30
    },
    replInfo: {
        fontSize: 18,
        lineHeight: 30,
        fontStyle: 'italic'
    },
    replInfoContainer: {
        paddingLeft: 15
    }
});

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        month: state.date.month
    }
};

export default connect(mapStateToProps)(Replacements);
