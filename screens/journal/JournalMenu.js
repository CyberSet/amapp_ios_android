import React from 'react';
import { Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
import { styles } from '../../components/Style';
// import Links from "../components/Links";
import JournalButton from '../../components/Button';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const JournalMenu = ({navigation}) => {
    // const userType = useSelector(state => state.auth.userType);

    const menu = [
        {name: 'Объявления', icon: 'mail-outline', type: [1, 2]},
        {name: 'Воспитатель', icon: 'print-outline', type: [2]},
        // {name: 'Настройки', icon: 'contrast', type: [1, 2]},
        {name: 'Профиль', icon: 'person-outline', type: [1, 2]},
        {name: 'Выход', icon: 'log-out-outline', type: [1, 2]}
    ];

    const Item = ({name, icon}) => ( 
        <JournalButton title={name} iconName={icon} onPress={() => console.log('button')} />
    );

    const renderItem = ({item}) => {
        // if (item.type.includes(userType)) {
            return <Item name={item.name} icon={item.icon} />
        // }
    };

    return (
        <SafeAreaView>
            <FlatList
                style={styles.list}
                data={menu}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
            {/* <Links col='#000' navigation={navigation} /> */}
        </SafeAreaView>
    );
};

const menuStyle = StyleSheet.create({
    container: {
        // marginTop: windowHeight/4,
        padding: 20,
        margin: 5,
        backgroundColor: '#F8EEDF',
        borderRadius: 35,
        shadowOpacity: .2
    }
})

export default JournalMenu;