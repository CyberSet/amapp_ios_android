import React, { useEffect, useState } from 'react'
import { Text, Alert } from 'react-native'
import CanteenOptionsCard from './CanteenOptionsCard';

import ListItem from './ui/ListItem'

const CanteenStudentCard = ({student, saveChange, day, timeBorder}) => {
    const [isBreakfast, setIsBreakfast] = useState(false)
    const [isDinner, setIsDinner] = useState(false)
    const [isBoth, setIsBoth] = useState(false)
    const options = [
        {title: 'Завтрак', option: isBreakfast, func: () => save(1)},
        {title: 'Обед', option: isDinner, func: () => save(2)},
        {title: 'Завтрак и Обед', option: isBoth, func: () => save(3)}
    ]

    useEffect(() => {
        setIsBreakfast(Boolean(Number(student.menu_array[0])))
        setIsDinner(Boolean(Number(student.menu_array[1])))
        setIsBoth(Boolean(Number(student.menu_array[1])) && Boolean(Number(student.menu_array[0])))
    }, [student])

    const save = (type) => {
        if (
                new Date().getHours() < 14 
                && new Date().getDate() !== new Date(day).getDate()
                && new Date().getDay() !== 0
                && new Date().getDay() !== 6
            ) {
            switch(type) {
                case 1:
                    if(!isBreakfast && isDinner) setIsBoth(true)
                    else setIsBoth(false)
                    setIsBreakfast(!isBreakfast)
                    saveChange(student.student_id, type);
                    break;
                case 2:
                    if(isBreakfast && !isDinner) setIsBoth(true)
                    else setIsBoth(false)
                    setIsDinner(!isDinner)
                    saveChange(student.student_id, type);
                    break;
                case 3:
                    if(isBoth){
                        saveChange(student.student_id, 1);
                        saveChange(student.student_id, 2);
                        setIsBreakfast(false)
                        setIsDinner(false)
                        setIsBoth(false)
                    }
                    else{
                        if(!isBreakfast) saveChange(student.student_id, 1);
                        if(!isDinner) saveChange(student.student_id, 2);
                        setIsBreakfast(true)
                        setIsDinner(true)
                        setIsBoth(true)
                    }
                    break;
            }
        } else {
            Alert.alert(`Можно редактировать только меню следующего дня, до ${timeBorder}`)
        }
    }

    return (
        <ListItem>
            <Text style={{ fontSize: 20, padding: 10, fontWeight: 'bold' }}>
                {student.surname} {student.name}
            </Text>
                {options.map(option =>
                    <CanteenOptionsCard 
                        key={option.title} 
                        title={option.title} 
                        option={option.option} 
                        onPress={option.func} 
                    />    
                )}
        </ListItem>
    )
}

export default CanteenStudentCard
