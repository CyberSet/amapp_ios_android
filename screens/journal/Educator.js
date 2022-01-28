import React from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native'
import ListContainer from '../../components/ui/ListContainer'
import ListItem from '../../components/ui/ListItem'

const Educator = ({navigation}) => {
    const educatorMenu = [
        {id: 1, title: 'Посещение', },
        {id: 2, title: 'Столовая'}
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ListContainer>
                    {educatorMenu.map(item => (
                        <TouchableOpacity key={item.id + item.title} onPress={() => navigation.navigate(item.title)}>
                            <ListItem key={item.id}>
                                <Text>{item.title}</Text>
                            </ListItem>
                        </TouchableOpacity>
                    ))}
                </ListContainer>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Educator
