import React from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import MenuItem from '../../components/ui/MenuItem'

const Educator = ({navigation}) => {
    const educatorMenu = [
        {id: 1, title: 'Посещение', icon: 'checkmark-done-circle'},
        {id: 2, title: 'Столовая', icon: 'cafe-sharp'},
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {educatorMenu.map(item => (
                    <MenuItem 
                        key={item.id} 
                        title={item.title}
                        iconName={item.icon}
                        onPress={() => navigation.navigate(item.title)}
                    />
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})

export default Educator
