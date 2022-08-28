import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import JournalButton from '../../components/ui/Button';
import { styles } from '../../components/Style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setObjectLesson } from '../../store/actions/actions';

const TypesOfLesson = (props) => {
    const {navigation, userData, setObjectLesson, objectLesson, lessonTypes} = props;
    const {class_id, pk, saveChanges} = props.route.params;

    const selectType = (type) => {
        setObjectLesson({ ...objectLesson, ['type_of_lesson']: type });
        console.log(type);
        navigation.goBack();
    };

    return(
        <ScrollView style={styles.list}>
            {
                lessonTypes ? lessonTypes.map(type => (
                    <JournalButton key={type.id} title={type.title} onPress={() => {selectType(type.id); saveChanges('type_of_lesson', type.id)}} />
                )) : 
                <View>
                    <Text>Loading...</Text>
                </View>
            }
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        subjects: state.jlr.subjects,
        term: state.marks.term,
        objectLesson: state.jlr.objectLesson,
        lessonTypes: state.jlr.lessonTypes
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setObjectLesson
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TypesOfLesson);
