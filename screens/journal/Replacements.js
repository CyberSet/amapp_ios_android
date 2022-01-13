import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ScrollView } from "react-native";
import { Button } from 'react-native-paper';
import { connect } from "react-redux";
import { styles } from "../../components/Style";
import { get_month_declination } from "../../components/Date";
import Icon from 'react-native-vector-icons/Ionicons';

const Replacements = (props) => {
    const {userData, month} = props;
    const [lessons, setLessons] = useState('');
    // const [currentMonth, setCurrentMonth] = useState(month);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_replacement.php?clue=${userData.clue}&user_id=${userData.user_id}&week=2`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setLessons(res.replacement_array);
        })
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        let monthStart;
        let monthEnd;
        if (lessons) {
            let monthStartNumber = lessons[0].currentData.substring(5).split('-').reverse()[1];
            if (monthStartNumber[0] === '0') {
                monthStartNumber = monthStartNumber.substring(1);
            }
            let monthEndNumber = lessons[lessons.length - 1].currentData.substring(5).split('-').reverse()[1];
            if (monthEndNumber[0] === '0') {
                monthEndNumber = monthEndNumber.substring(1);
            }
            monthStart = get_month_declination(monthStartNumber - 1);
            monthEnd = get_month_declination(monthEndNumber - 1);
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
    )

    return(
        <SafeAreaView>
            {
                lessons ?
                <Header /> :
                <Text>no lessons yet</Text>
            }
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        month: state.date.month
    }
};

export default connect(mapStateToProps)(Replacements);
