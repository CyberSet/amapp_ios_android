import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import CanteenOptionsCard from './CanteenOptionsCard';

import ListItem from './ui/ListItem'

const CanteenStudentCard = ({student, saveChange}) => {
    const [isBreakfast, setIsBreakfast] = useState(false)
    const [isDinner, setIsDinner] = useState(false)

    const options = [
        {title: 'Завтрак', option: isBreakfast, func: () => setIsBreakfast(!isBreakfast)},
        {title: 'Обед', option: isDinner, func: () => setIsDinner(!isDinner)}
    ]

    // useEffect(() => {
    //     isDinner ? 
    //     saveChange(student.student_id, 2) :
    //     saveChange(student.student_id, 1)
    // }, [isDinner, isBreakfast])

    return (
        <ListItem>
            <Text style={{ fontSize: 20, padding: 10, fontWeight: 'bold' }}>{student.surname} {student.name}</Text>
                {options.map(option =>
                    <CanteenOptionsCard 
                        key={option.title} 
                        title={option.title} 
                        option={option.option} 
                        onPress={() => {
                            saveChange(student.student_id, 2)
                            option.func
                        }} 
                    />    
                )}
        </ListItem>
    )
}

export default CanteenStudentCard
