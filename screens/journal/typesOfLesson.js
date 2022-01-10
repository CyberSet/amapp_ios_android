import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import JournalButton from "../../components/Button";
import { styles } from "../../components/Style";
import { connect } from "react-redux";

const typesOfLesson = (props) => {
    const {navigation, userData} = props;
    const {lesson_id, class_id} = props.route.params;
    const [types, setTypes] = useState(null);
    
    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_types_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&class_id=${class_id}&subject_id=${lesson_id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setTypes(res.select_type_of_lesson);
        })
        .catch(err => console.log(err));
    }, []);

    return(
        <ScrollView style={styles.list}>
            {
                types ? types.map(type => (
                    <JournalButton key={type.id} title={type.title} onPress={() => navigation.goBack()} />
                )) : <View><Text>Loading...</Text></View>
            }
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        subjects: state.jlr.subjects,
        term: state.marks.term
    };
};

export default connect(mapStateToProps)(typesOfLesson);
