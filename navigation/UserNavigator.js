import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';

import { MainNavigator } from './MainNavigator';
import AdsScreen from '../screens/Ads';
// import SettingsScreen from '../screens/Settings';
import AccountScreen from '../screens/Account';
import LogOutScreen from '../screens/LogOut';
import AuthScreen from '../screens/AuthScreen';
import ActsScreen from "../screens/Acts";
import { HomeToDetailsNav } from './Navs';
import { ip } from '../screens/gimnazist/RegForm';

const Stack = createNativeStackNavigator();

export const UserNavigator = () => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loadData = (payload) => dispatch({type: 'LOAD_DATA', payload});
    const setToken = (payload) => dispatch({type: 'SET_TOKEN', payload});

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
    };

    const sendToken = async (token) => {
        const data = {
            'push_token': token,
            'owner': ''
        }
    
        await fetch(`https://${ip}/tokens/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
    };

    const handleNotifiaction = (message) => {
        console.log(message);

        if (message.data.nav === 'Гимназист') {
            fetch(`https://${ip}/articles/`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(response =>
                loadData(response)
            )
            .then(() => {
                navigation.navigate(message.data.nav, {
                    screen: message.data.screen,
                    params: { title: message.notification.title },
                });
            })
            .catch(error => console.log(error));
        }
        
        navigation.navigate('Меню', {
            screen: 'Дневник',
        });
    };

    useEffect(() => {
        requestUserPermission();
    });

    useEffect(() => {
        messaging().getToken().then(token => {
            console.log(token);
            setToken(token);
            sendToken(token);
        });
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert(
              'Новое уведомление:', 
              `${remoteMessage.notification.title}\n\n${remoteMessage.notification.body}`, 
              [{text: 'ПОСМОТРЕТЬ', onPress: () => handleNotifiaction(remoteMessage)}, {text: 'ВЕРНУТЬСЯ'}]
          );
        });
    
        return unsubscribe;
      }, []);

    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
           handleNotifiaction(remoteMessage);
        });

        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                handleNotifiaction(remoteMessage);
            }
        });
    }, []);
    
    const Nav = () => (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#002e2f',
            },
            headerTintColor: '#fff',
            headerShown: false
        }}>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='Меню'
                    component={MainNavigator}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name='Объявления'
                    component={AdsScreen}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Акты'
                    component={ActsScreen}
                    options={{
                        headerShown: true
                    }}
                />
                {/* <Stack.Screen
                    name='Настройки'
                    component={SettingsScreen}
                /> */}
                <Stack.Screen
                    name='Профиль'
                    component={AccountScreen}
                    options={{
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name='Выход'
                    component={LogOutScreen}
                />
                <Stack.Screen
                    name='Гимназист'
                    component={HomeToDetailsNav}
                />
            </Stack.Group>
        </Stack.Navigator>
    );

    const NonAuthorized = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Авторизация'
                component={AuthScreen}
            />
            <Stack.Screen
                name='Гимназист'
                component={HomeToDetailsNav}
            />
        </Stack.Navigator>
    );

    return (
        isSignedIn ? (
            <Nav />
        ) : (
            <NonAuthorized />
        )
    )
}