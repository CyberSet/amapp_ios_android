import React, { Component, useState } from "react";
import { SafeAreaView, FlatList, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import JournalButton from "../../components/Button";
import { setSubjects } from "../../store/reducers/jLessonsReducer";

const Item = ({pk, lesson, groups, navigation}) => {
    const [expanded, setExpanded] = useState(false);

    const _openNextTab = (pk, class_id, group, numclass, ind) => {
        navigation.navigate(
            'Список уроков', 
            {
                pk: pk, 
                class_id: class_id, 
                group: group, 
                numclass: numclass,
                ind: ind ? ind : ''
            }
        );
    };

    const RenderGroups = ({item, onPress}) => (
        <TouchableOpacity onPress={onPress} style={{ borderBottomWidth: 1 }}>
            <Text key={item} style={styles.subItem}>
                {item}
            </Text>
        </TouchableOpacity>
    )

    return (
        <View key={pk} style={styles.listContaner}>
            <JournalButton key={lesson} title={lesson} onPress={() => setExpanded(!expanded)} />
            {
                expanded && !groups ? <Text> - </Text> : expanded && groups.map(item => (
                    <View style={styles.listItem} key={item.numclass + pk}>
                        <Text style={styles.numclass}>{!item.numclass.includes('-') ?  item.numclass + ' класс' : item.numclass}</Text>
                        {
                            item.class_group_array.map(group => (
                                group != '4' ?
                                <RenderGroups item={group} onPress={() => _openNextTab(pk, item.class_id, group, item.numclass)} /> :
                                <></>
                            ))
                        }
                        {
                            item.ind_array ?
                            item.ind_array.map(ind => (
                                <RenderGroups item={ind.nick} onPress={() => _openNextTab(pk, item.class_id, '4', item.numclass, ind.nick)} />
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