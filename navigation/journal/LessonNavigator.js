import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonsList from '../../screens/journal/LessonsList';
import JournalLessons from '../../screens/journal/JournalLessons';
import Journal from '../../screens/journal/Journal';
import EditLesson from '../../screens/journal/EditLessonScreen';

const Stack = createNativeStackNavigator();

export const LessonNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Lessons' component={JournalLessons} options={{ headerShown: false }} />
        <Stack.Screen name='Список уроков' component={LessonsList} />
        <Stack.Screen name='Журнал' component={Journal} />
        <Stack.Screen name='Редактирование урока' component={EditLesson} />
    </Stack.Navigator>
);
