import React, {Component} from 'react';
import { SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import JournalButton from '../../components/Button';
import { styles } from '../../components/Style';

class LessonsList extends Component {
    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        userData = this.props.userData;
        subjects = this.props.subjects;
        ({pk, group, numclass} = this.props.route.params);
        this.state = ({
            lesson: '',
            list: ''
        })
    };

    async componentDidMount() {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}subject_id=${pk}&class_id=22&class_group=1&period=1`;
        const response = await fetch(url);
        const data = await response.json();
        subjects.map(lesson => {
            if (lesson.subject_id === pk)

                this.setState({
                    lesson: lesson,
                    list: ''
                });
            
        });
    }

    _handlePress = (screen) => {
        navigation.navigate(screen);
    };

    render() {
        return(
            <SafeAreaView style={styles.journalContainer}>
                <Text>
                    {this.state.lesson.subject_name}, 
                    {' ' + numclass} класс,
                    {' ' + group}
                    </Text>
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

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        subjects: state.jlr.subjects
    };
};

export default connect(mapStateToProps)(LessonsList)