import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles, theme } from '../components/Style';

const LogOutScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const log_out = () => dispatch({type: 'LOG_OUT'});
    const userData = useSelector(state => state.auth.userData);
    // const setDate = (date) => dispatch({type: 'SET_DATE', date});

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value);
        } catch (e) {
            console.log(e);
        }
    };

    const _sendLogoutRequest = async (clue, id) => {
        await fetch(`https://diary.alma-mater-spb.ru/e-journal/api/logout.php?clue=${clue}&user_id=${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    const logMeOut = () => {
        console.log(userData.clue, userData.user_id);
        _sendLogoutRequest(userData.clue, userData.user_id);
        storeData('');
        log_out();
    };

    return (
        <ScrollView  style={theme.light} contentContainerStyle={styles.container}>

            <Text
                style={{color: '#000', fontSize: 18}}
            >
                Вы уверены, что хотите выйти из профиля?
            </Text>

            <View style={styles.modalPanel}>
                <Button 
                    mode={'text'}
                    color='blue'
                    onPress={() => logMeOut()}
                >
                    ДА
                </Button>

                <Button 
                    mode={'text'}
                    color='red'
                    onPress={
                        () => navigation.navigate('Меню')
                    }
                >
                    НЕТ
                </Button>
            </View>

        </ScrollView>
    );
};

export default LogOutScreen;