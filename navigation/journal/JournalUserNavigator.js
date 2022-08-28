import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JournalMenu from '../../screens/journal/JournalMenu';
import JournalAds from '../../screens/journal/JournalAds';
import { EducatorNavigator } from './EducatorNavigator';
import AccountScreen from '../../screens/Account';
import LogOutScreen from '../../screens/LogOut';
import { HomeToDetailsNav } from '../Navs';

const Stack = createNativeStackNavigator();

export const JournalUserNavigator = () => (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen options={{ headerShown: false }} name="JournalMenu" component={JournalMenu} />
            <Stack.Screen name="Объявления" component={JournalAds} />
            <Stack.Screen options={{ headerShown: true }} name="Профиль" component={AccountScreen} />
            <Stack.Screen /*options={{ headerShown: false }}*/ name="Воспитатель" component={EducatorNavigator} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name='Выход' component={LogOutScreen}/>    
            <Stack.Screen options={{ headerShown: false }} name='Гимназист' component={HomeToDetailsNav}/>
        </Stack.Group>       
    </Stack.Navigator>
);
