import React, { useEffect, useState } from 'react'
import { Text, Alert, View } from 'react-native'
import CanteenOptionsCard from './CanteenOptionsCard';

import ListItem from './ui/ListItem'

const CanteenStudentCard = ({student, saveChange, day, timeBorder}) => {
    const [isBreakfast, setIsBreakfast] = useState(false)
    const [isDinner, setIsDinner] = useState(false)
    const options = [
        {title: 'Завтрак', option: isBreakfast, func: () => save(1)},
        {title: 'Обед', option: isDinner, func: () => save(2)}
    ]

    useEffect(() => {
        setIsBreakfast(Boolean(Number(student.menu_array[0])))
        setIsDinner(Boolean(Number(student.menu_array[1])))
    }, [student])

    const save = (type) => {
        if (
                new Date().getHours() < 14 
                && new Date().getDate() !== new Date(day).getDate()
                && new Date().getDay() !== 0
                && new Date().getDay() !== 6
            ) {
            saveChange(student.student_id, type)
            type === 1
            ? setIsBreakfast(!isBreakfast)
            : setIsDinner(!isDinner)
        } else {
            Alert.alert(`Можно редактировать только меню следующего дня, до ${timeBorder}`)
        }
    }

    return (
        <ListItem>
            <Text style={{ fontSize: 20, padding: 10, fontWeight: 'bold' }}>
                {student.surname} {student.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
            {options.map(option =>
                    <CanteenOptionsCard 
                        key={option.title} 
                        title={option.title} 
                        option={option.option} 
                        onPress={option.func} 
                    />    
                )}
            </View>
        </ListItem>
    )
}
export default CanteenStudentCard