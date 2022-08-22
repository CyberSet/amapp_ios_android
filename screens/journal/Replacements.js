import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ScrollView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getMonthDeclination } from "../../components/Date";
import ListContainer from "../../components/ui/ListContainer";
import ListItem from "../../components/ui/ListItem";
import PeriodHeader from "../../components/PeriodHeader";

const Replacements = (props) => {
    const { userData } = props;
    const [lessons, setLessons] = useState([]);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [week, setWeek] = useState(0);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_replacement.php?clue=${userData.clue}&user_id=${userData.user_id}&week=${week}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                console.log(`https://diary.alma-mater-spb.ru/e-journal/api/open_replacement.php?clue=${userData.clue}&user_id=${userData.user_id}&week=${week}`);
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PeriodHeader
                handleBackChevron={() => setWeek(week + 1)}
                handleForwardChevron={() => setWeek(week - 1)}
                period={`${start} - ${end}`}
            />
            <ScrollView>
                <ListContainer>
                    {lessons.reduce((partialSum, a) => partialSum + a.replacement.length, 0) != 0 ?
                        lessons.map(lesson => (
                            lesson.replacement.map(repl => (
                                repl.type === 1 ?
                                    <ListItem>
                                        <View>
                                            <Text style={{ paddingVertical: 10 }}>{lesson.currentData}</Text>
                                        </View>
                                        <View style={replStyles.replInfoContainer}>
                                            <Text style={replStyles.lessonInfo}>
                                                {repl.number_lesson} урок
                                            </Text>
                                            <Text style={replStyles.lessonInfo}>
                                                {repl.sub_name},
                                                {' ' + repl.class_name}/{repl.group_id},
                                                {' ' + repl.reason}
                                            </Text>
                                            <Text style={replStyles.replInfo}>
                                                {repl.user_replacement ? repl.user_replacement + ', ' : ''}
                                                {repl.sub_replacement}
                                            </Text>
                                        </View>
                                    </ListItem> :
                                    <ListItem>
                                        <View>
                                            <Text style={{ paddingVertical: 10 }}>{lesson.currentData}</Text>
                                        </View>
                                        <View style={replStyles.replInfoContainer}>
                                            <Text style={replStyles.lessonInfo}>
                                                Замена воспитателя
                                                {' ' + repl.class_name},
                                                {' ' + repl.reason}
                                            </Text>
                                            <Text style={replStyles.replInfo}>
                                                {repl.user_replacement}
                                                {repl.add_field ? ', ' + repl.add_field : ''}
                                            </Text>
                                        </View>
                                    </ListItem>
                            ))
                        ))
                        : <Text style={{ textAlign: "center", ...replStyles.replInfo }} >Нет замен</Text>
                    }
                </ListContainer>
            </ScrollView>
        </SafeAreaView>
    );
};

const replStyles = StyleSheet.create({
    lessonInfo: {
        fontSize: 18,
        lineHeight: 30,
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
