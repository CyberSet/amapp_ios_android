import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JournalMenu from '../../screens/journal/JournalMenu';
import JournalAds from '../../screens/journal/JournalAds';
import Educator from '../../screens/journal/Educator';

const Stack = createNativeStackNavigator();

export const JournalUserNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="JournalMenu" component={JournalMenu} />
        <Stack.Screen name="Объявления" component={JournalAds} />
        <Stack.Screen name="Воспитатель" component={Educator} />
    </Stack.Navigator>
);
