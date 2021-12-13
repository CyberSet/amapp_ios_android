import React, { Component } from "react";
import { SafeAreaView, FlatList, Text, View, TouchableOpacity } from "react-native";

const Item = ({pk, lesson, groups, onPress}) => (
    <View  key={pk}style={styles.listItem}>
        <View style={{ borderBottomWidth: 1 }}>
            <Text key={lesson} style={{ fontSize: 18, fontWeight: 'bold' }}>{lesson}</Text>
        </View>
        {
            groups.map(item => (
                <TouchableOpacity key={item + pk} style={{ borderBottomWidth: 1 }} onPress={onPress}>
                    <Text key={item} style={{ paddingLeft: 40, marginVertical: 5, fontSize: 16 }}>{item}</Text>
                </TouchableOpacity>
            ))
        }
    </View>
);

class JournalLessons extends Component {
    constructor(props) {
        super(props);
        navigation = this.props.navigation;
    }

    data = [
        {
            pk: 1, lesson: 'Русский язык', classNumber: 10, groups: ['1 группа', '2 группа']
        }, 
        {
            pk: 2, lesson: 'Литература', classNumber: 10, groups: ['1 группа', '2 группа']
        }
    ]

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
            pk={item.pk} 
            lesson={item.lesson} 
            groups={item.groups} 
            onPress={() => this._openNextTab(item.lesson, item.classNumber)} 
        />
    );

    render() {
        return(
            <SafeAreaView style={styles.listContaner}>
                <FlatList 
                    data={this.data}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.lesson}
                />
            </SafeAreaView>
        );
    };
};

const styles = ({
    listContaner: {
        flex: 1
    },
    listItem: {
        padding: 10
    }
})

export default JournalLessons;