import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Educator from '../../screens/journal/Educator';
import Visit from '../../screens/journal/Visit';
import Canteen from '../../screens/journal/Canteen';

const Stack = createNativeStackNavigator();

export const EducatorNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Educator" component={Educator} />
        <Stack.Screen name="Посещение" component={Visit} />
        <Stack.Screen name="Столовая" component={Canteen} />
    </Stack.Navigator>
);
