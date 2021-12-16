import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddLessonScreen from '../../screens/journal/AddLessonScreen';
import LessonsList from '../../screens/journal/LessonsList';
import JournalLessons from '../../screens/journal/JournalLessons';
import Journal from '../../screens/journal/Journal';

const Stack = createNativeStackNavigator();

export const LessonNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Lessons' component={JournalLessons} options={{ headerShown: false }} />
        <Stack.Screen name='Список уроков' component={LessonsList} />
        <Stack.Screen name='Добавление урока' component={AddLessonScreen} />
        <Stack.Screen name='Журнал' component={Journal} />
    </Stack.Navigator>
);
