import React, { Component } from "react";
import { SafeAreaView, FlatList, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Title from '../../components/Title';
import { setSubjects } from "../../store/reducers/jLessonsReducer";

const Item = ({pk, lesson, groups, navigation}) => {
    const _openNextTab = (pk, group, numclass) => {
        navigation.navigate('Список уроков', {pk: pk, group: group, numclass: numclass});
    };

    return (
        <View  key={pk} style={styles.listItem}>
            <Title key={lesson} line={lesson} />
            {
                !groups ? <Text> - </Text> : groups.map(item => (
                    <View key={item.numclass + pk}>
                        <Text style={styles.numclass}>{!item.numclass.includes('-') ?  item.numclass + ' класс' : item.numclass}</Text>
                        {
                            item.class_group_array.map(group => (
                                group != '4' ?
                                <TouchableOpacity onPress={() => _openNextTab(pk, group + ' группа', item.numclass)} style={{ borderBottomWidth: 1 }}>
                                    <Text key={item} style={styles.subItem}>
                                        {group} группа
                                    </Text>
                                </TouchableOpacity> :
                                <></>
                            ))
                        }
                        {
                            item.ind_array ?
                            item.ind_array.map(ind => (
                                <TouchableOpacity onPress={() => _openNextTab(pk, ind.nick, item.numclass)} style={{ borderBottomWidth: 1 }}>
                                    <Text key={item} style={styles.subItem}>
                                        {ind.nick}
                                    </Text>
                                </TouchableOpacity>
                            )) : <></>
                        }
                    </View>
                ))
            }
        </View>
    );
};

class JournalLessons extends Component {
    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        userData = this.props.userData;
        this.state = ({
            data: '',
        });
    };

    async componentDidMount() {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_class_group.php?clue=${userData.clue}&user_id=${userData.user_id}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            data: data.subject_class_group,
        });
        this.props.setSubjects(data.subject_class_group);
        this.state.data.map(item => {
            item.class_array.map(i => {
                console.log(i.ind_array)
            })
        })
    }

    _renderItem = ({item}) => {

        return (
            <Item 
                pk={item.subject_id} 
                lesson={item.subject_name} 
                groups={item.class_array} 
                navigation={navigation} 
            />
        );
    };

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
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({setSubjects: setSubjects}, dispatch);
};

const styles = ({
    listContaner: {
        flex: 1
    },
    listItem: {
        padding: 20,
        margin: 5,
        backgroundColor: '#F8EEDF',
        borderRadius: 35,
        shadowOpacity: .2
    },
    subItem: { 
        paddingLeft: 40, 
        marginVertical: 5, 
        fontSize: 16, 
    },
    numclass: {
        marginVertical: 4,
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalLessons)