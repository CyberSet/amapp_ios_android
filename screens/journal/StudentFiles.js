import React from "react";
import { SafeAreaView, View, ScrollView, Text, Linking } from "react-native";
import { connect } from "react-redux";
import JournalButton from "../../components/ui/Button";
import { styles } from "../../components/Style";
import { journalLessonsStyle } from './JournalLessons';

const StudentFiles = (props) => {
    const { objectLesson } = props;

    const handleLink = async (url) => {
        await Linking.openURL(encodeURI(url.replace('..', 'https://diary.alma-mater-spb.ru/e-journal')));
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
                {objectLesson?.list_of_files_students.map((item, i) => (
                        <View key={item} style={journalLessonsStyle.listItem}>
                            <Text key={item.student_id} style={{ fontSize: 20, fontWeight: 'bold' }}>
                                {item.surname} {item.name}
                            </Text>
                            <View key={i} style={{ paddingLeft: 15 }}>
                                {
                                    item.files_array.map(file => (
                                        <Text 
                                            key={file.filename}
                                            style={{ ...styles.lessonInfo, color: '#0080ff' }} 
                                            onPress={() => handleLink(file.file_path)}
                                        >
                                            {file.file_name}
                                        </Text>
                                    ))
                                }
                            </View>
                        </View>
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

export default connect(mapStateToProps)(StudentFiles);
