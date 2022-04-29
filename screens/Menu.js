import React from 'react';
import { Text, FlatList, TouchableOpacity, SafeAreaView, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { styles } from '../components/Style';
import Links from "../components/Links";
import { Button } from 'react-native-paper';



const MenuScreen = ({navigation}) => {
    const userType = useSelector(state => state.auth.userType);

    const menu = [
        {name: 'Объявления', icon: 'mail-outline', type: [1, 2]},
        {name: 'Акты', icon: 'print-outline', type: [2]},
        // {name: 'Голосование', icon: 'list-outline', type:[1,2]},
        // {name: 'Настройки', icon: 'contrast', type: [1, 2]},
        {name: 'Профиль', icon: 'person-outline', type: [1, 2]},
        {name: 'Выход', icon: 'log-out-outline', type: [1, 2]}
    ];

    const Item = ({name, icon}) => (
        <TouchableOpacity
            style={styles.listItemContainer}
            onPress={() =>
                navigation.navigate({name})
            }>
            <Icon
                name={icon}
                size={25}
                color='#000'
            />
            <Text style={styles.listItem}>{name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        if (item.type.includes(userType)) {
            return <Item name={item.name} icon={item.icon} />
        }
    };

    return (
        <SafeAreaView>
            <FlatList
                style={styles.list}
                data={menu}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
            {/* <TouchableOpacity 
            style={styles.voteButton}
            onPress={() =>
                navigation.navigate("Голосование")
            }><View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                name='list-outline'
                size={30}
                color='#008080'
            />
                <Text
            style={{color: '#008080', fontSize: 22, fontWeight: 'bold', textAlign: 'center', margin: 5}}
            >Голосование </Text>
            </View></TouchableOpacity> */}
            <Links col='#000' navigation={navigation} />
            
        </SafeAreaView>
    );
};

export default MenuScreen;