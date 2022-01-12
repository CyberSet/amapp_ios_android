import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView } from "react-native";
import { Button } from 'react-native-paper';
import { connect } from "react-redux";
import { get_month } from "../../components/Date";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './JournalLessons';

const Report = (props) => {
    const {month, userData} = props;
    const [currentMonth, setCurrentMonth] = useState(month);
    const [students, setStudents] = useState(null);
    const [names, setNames] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [fact, setFact] = useState([]);

    const studentsColumn = {
        title: 'Ученик',
        rows: names
    };

    const classesColumn = {
        title: 'Класс',
        rows: classes
    };

    const subjectsColumn = {
        title: 'Предмет',
        rows: subjects
    };

    const factColumn = {
        title: 'Факт',
        rows: fact
    };
    
    const Column = ({column}) => (
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>{column.title}</Text>
            {
                column.rows ? column.rows.map((row, i) => (
                    <View>
                        <Text style={{ fontSize: 16, marginBottom: 6 }} key={i}>{row}</Text>
                    </View>
                )) : <></>
            }
        </View>
    );

    useEffect(() => {
        filterData();
    }, [students]);

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_report_ind.php?clue=${userData.clue}&user_id=${userData.user_id}&month_id=${currentMonth + 1}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setStudents(res.result_students);
        })
        .catch(err => console.log(err));
    }, [currentMonth]);

    const filterData = () => {
        setNames('');
        setClasses('');
        setSubjects('');
        setFact('');
        let names = [], classes = [], subjects = [], fact = [];
        students ? students.map((student, i) => {
            names.push(`${i + 1}. ${student.surname} ${student.name.substring(0, 1)}`);
            classes.push(student.class_name);
            subjects.push(student.subject_name);
            fact.push(student.fact);
            setNames(names);
            setClasses(classes);
            setSubjects(subjects);
            setFact(fact);
        }) : console.log('no students');
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const Header = () => (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button
                onPress={() => prevMonth()}
            >
                <Icon
                    name='chevron-back-outline'
                    size={25}
                    color='#000'
                />
            </Button>
            <Text style={{ fontSize: 16 }}>{get_month(currentMonth)}</Text>
            <Button
                    onPress={() => nextMonth()}
                >
                    <Icon
                        name='chevron-forward-outline'
                        size={25}
                        color='#000'
                    />
            </Button>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView>
            {
                students ?
                <>
                    <View style={{ ...styles.listItem, justifyContent: 'space-between', flexDirection: 'row', padding: 15 }}>
                        <Column column={studentsColumn} />
                        <Column column={classesColumn} />
                        <Column column={subjectsColumn} />
                        <Column column={factColumn} />
                    </View> 
                    <View style={{ ...styles.listItem, justifyContent: 'space-between', flexDirection: 'row', padding: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Итого:</Text>
                        <Text style={{ fontSize: 18 }}>{students[0].fact_view}</Text>
                    </View>
                </> :
                <View style={{ ...styles.listItem, alignItems: 'center', padding: 25 }}>
                    <Text style={{ fontSize: 18 }}>Пока что нет уроков</Text>
                </View>
            }
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        month: state.date.month
    }
};

export default connect(mapStateToProps)(Report);