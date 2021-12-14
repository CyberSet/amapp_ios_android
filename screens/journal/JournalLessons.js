import React, { Component } from "react";
import { SafeAreaView, FlatList, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Title from '../../components/Title';
import { fetchLessonsList } from "../../store/asyncActions/fetchJLessons";

const Item = ({pk, lesson, groups, onPress}) => (
    <View  key={pk} style={styles.listItem}>
        <Title key={lesson} line={lesson} />
        {
            !groups ? <Text> - </Text> : groups.map(item => (
                <View key={item + pk} style={{ borderBottomWidth: 1 }}>
                    <Text style={styles.numclass}>{!item.numclass.includes('-') ?  item.numclass + ' класс' : item.numclass}</Text>
                    {
                        item.class_group_array.map(group => (
                            <TouchableOpacity onPress={onPress} style={{ borderBottomWidth: 1 }}>
                                <Text key={item} style={{ paddingLeft: 40, marginVertical: 5, fontSize: 16, }}>
                                    {group} группа
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            ))
        }
    </View>
);

class JournalLessons extends Component {
    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        userData = this.props.userData;
        // subjects = this.props.subjects;
        this.state = ({
            // loading: true,
            data: ''
        });
    };

    async componentDidMount() {
        // this.props.dispatch(fetchLessonsList());
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_class_group.php?clue=${userData.clue}&user_id=${userData.user_id}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            data: data.subject_class_group,
            // loading: false
        });
        // console.log(`subjects IS --  ${subjects.status}`);
        console.log(this.state.data)
    }

    _openNextTab = (lesson, classNumber) => {
        navigation.navigate(
            'Список уроков', 
            {
                lesson: lesson,
                classNumber: classNumber
            }
        );
    }

    _renderItem = ({item}) => (
        <Item 
            pk={item.subject_id} 
            lesson={item.subject_name} 
            groups={item.class_array} 
            onPress={() => this._openNextTab(item.lesson, item.classNumber)} 
        />
    );

    render() {
        return(
            <SafeAreaView style={styles.listContaner}>
                {
                    !this.state.data ?
                    <Text>Загрузка...</Text> :
                    <FlatList 
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.lesson}
                    />
                }
            </SafeAreaView>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        // subjects: state.jlr.subjects
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({setSubjects: setSubjects}, dispatch);
// };

const styles = ({
    listContaner: {
        flex: 1
    },
    listItem: {
        padding: 10
    },
    numclass: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default connect(mapStateToProps)(JournalLessons)