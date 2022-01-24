import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { setObjectLesson } from '../../store/actions/actions';
import { journalLessonsStyle } from "./JournalLessons";
import { styles } from "../../components/Style";
import JournalButton from "../../components/Button";
import InputField from "../../components/Input";

const CommentsScreen = (props) => {
    const { objectLesson, setObjectLesson } = props;
    const [type, setType] = useState('1');
    const [value, setValue] = useState('');

    const applyChange = () => {
        // setType(type === '1' ? '0' : '1');
        setObjectLesson({ ...objectLesson, ['type_of_lesson']: type });
    };

    return (
        <SafeAreaView style={{ ...journalLessonsStyle.listContaner, flex: 1 }}>
            <ScrollView>
                <JournalButton 
                    title={
                        objectLesson.data_lesson.substring(5).split('-').reverse().join('.') + ', ' +
                        objectLesson?.name_lesson
                    } 
                />
                {
                    objectLesson?.list_of_comments.map(item => (
                        item.comment ?
                        <View key={item.student_id} style={journalLessonsStyle.listItem}>
                            <Text key={item.surname} style={{ fontSize: 20, fontWeight: 'bold' }}>
                                {item.surname} {item.name}
                            </Text>
                            <View key={item.name} style={{ paddingLeft: 15 }}>
                                <InputField
                                    key={item.comment} 
                                    color={
                                        item.type === type ? 'green' : 'red'
                                    }
                                    title=''
                                    value={value ? value : item.comment}
                                    onChangeText={text => {
                                        setValue(text);
                                    }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <TouchableOpacity 
                                        style={{ borderWidth: 2, width: 40, height: 40 }}
                                        onPress={() => setType(type === '1' ? '0' : '1')}
                                    >
                                        {
                                            item.type === type ? 
                                            <Icon
                                                name='checkmark'
                                                size={36}
                                                color='green'
                                            /> : <></>
                                        }
                                    </TouchableOpacity>
                                    <Text style={{ ...styles.lessonInfo, paddingLeft: 15 }}>Похвала</Text>
                                </View>
                            </View>
                        </View> : <></>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    return {
        objectLesson: state.jlr.objectLesson
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setObjectLesson
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
