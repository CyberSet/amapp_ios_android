import React, { Component, useState } from "react";
import { SafeAreaView, FlatList, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import JournalButton from "../../components/Button";
import { setSubjects } from "../../store/reducers/jLessonsReducer";

const Item = ({pk, lesson, groups, navigation}) => {
    const [expanded, setExpanded] = useState(false);

    function keyGenerator(key) {
        return Math.random() + key;
    }

    const openNextTab = (pk, class_id, group, numclass, ind, lesson) => {
        navigation.navigate(
            'Список уроков', 
            {
                pk: pk, 
                class_id: class_id, 
                group: group, 
                numclass: numclass,
                ind: ind ? ind : '',
                lesson: lesson
            }
        );
    };

    const RenderGroups = ({pk, item, onPress}) => (
        <TouchableOpacity key={() => keyGenerator(pk)} onPress={onPress} style={{ borderBottomWidth: 1 }}>
            <Text key={() => keyGenerator(pk)} style={styles.subItem}>
                {item}
            </Text>
        </TouchableOpacity>
    )

    return (
        <View key={() => keyGenerator(pk)} style={styles.listContaner}>
            <JournalButton key={() => keyGenerator(pk)} title={lesson} onPress={() => setExpanded(!expanded)} />
            {
                expanded && !groups ? <Text key={() => keyGenerator(pk)}> - </Text> : expanded && groups.map(item => (
                    <View key={() => keyGenerator(pk)} style={styles.listItem}>
                        <Text key={() => keyGenerator(pk)} style={styles.numclass}>{!item.numclass.includes('-') ?  item.numclass + ' класс' : item.numclass}</Text>
                        {
                            item.class_group_array.map(group => (
                                group != '4' ?
                                <RenderGroups pk={pk} item={group} onPress={() => openNextTab(pk, item.class_id, group, item.numclass, '', lesson)} /> :
                                <></>
                            ))
                        }
                        {
                            item.ind_array ?
                            item.ind_array.map(ind => (
                                <RenderGroups pk={pk} item={ind.nick} onPress={() => openNextTab(pk, item.class_id, '4', item.numclass, ind.nick, lesson)} />
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

    componentDidMount() {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_class_group.php?clue=${userData.clue}&user_id=${userData.user_id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({
                data: res.subject_class_group,
            });
            this.props.setSubjects(res.subject_class_group);
        })
        .catch(err => console.log(err));
    }

    renderItem = ({item}) => {

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
                        renderItem={this.renderItem}
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

export const styles = ({
    listContaner: {
        marginHorizontal: 5
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