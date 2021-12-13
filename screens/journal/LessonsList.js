import React, {Component} from 'react';
import { SafeAreaView, Text } from 'react-native';
import JournalButton from '../../components/Button';
import { styles } from '../../components/Style';

class LessonsList extends Component {
    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        ({lesson, classNumber} = this.props.route.params);
    };

    _handlePress = (screen) => {
        navigation.navigate(screen);
    };

    render() {
        return(
            <SafeAreaView style={styles.journalContainer}>
                <Text>{lesson}, {classNumber} класс</Text>
                <JournalButton 
                    title='Открыть журнал'
                    onPress={() => this._handlePress('Журнал')}
                />
                <JournalButton 
                    title='+ Добавить урок'
                    onPress={() => this._handlePress('Добавление урока')}
                />
            </SafeAreaView>
        );
    };
}

export default LessonsList;