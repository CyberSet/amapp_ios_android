import React from "react";
import { SafeAreaView, View, ScrollView, Text, Linking } from "react-native";
import { connect } from "react-redux";
import JournalButton from "../../components/ui/Button";
import { styles } from "../../components/Style";
import { journalLessonsStyle } from './JournalLessons';
import StudentFilesCart from "../../components/ui/StudentFilesCart";

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
                        item.files_array.map(file => (
                            <StudentFilesCart key={i} item={item} file={file} onPress={handleLink} />
                        ))
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
