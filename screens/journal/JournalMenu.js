import React from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
// import { useSelector } from 'react-redux';
import Links from "../../components/Links";
import MenuItem from '../../components/ui/MenuItem';
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
        <MenuItem title={name} iconName={icon} onPress={() => console.log('button')} />
    );

    const renderItem = ({item}) => {
        // if (item.type.includes(userType)) {
            return <Item name={item.name} icon={item.icon} />
        // }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/AM-app.png')} resizeMode="cover" style={styles.image}>
                <View style={{ flex: .8, justifyContent: 'space-between' }}>
                    <Links col='#000' navigation={navigation} />
                    <View style={styles.container}>
                        {
                            menu.map(item => (
                                <MenuItem 
                                    key={item.name} 
                                    title={item.name} 
                                    iconName={item.icon} 
                                    onPress={() => navigation.navigate(item.name)} 
                                />
                            ))
                        }
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        flex: 1,
        backgroundColor: '#00656D',
        padding: 10
    }
});

export default JournalMenu;
