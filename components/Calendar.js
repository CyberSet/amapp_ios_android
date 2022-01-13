import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import JournalButton from "./Button";
import { styles } from "../screens/journal/JournalLessons";
import { pickDay } from '../store/reducers/jLessonsReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
  today: "Сегодня"
};
LocaleConfig.defaultLocale = 'ru';

const ExpandedCalendar = (props) => {
    // const [day, setDay] = useState('');
    const {pickDay, day} = props;

    return (
        <View style={styles.listContaner}>
            <Calendar
                markedDates={{
                    [day]: {selected: true, marked: true, selectedColor: 'blue'},
                }}
                onDayPress={day => {
                    pickDay(day.dateString);
                }}
            />
            <JournalButton key={day} title={'Выбрать день'} onPress={props.onPress} />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        day: state.jlr.day
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        pickDay
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedCalendar);