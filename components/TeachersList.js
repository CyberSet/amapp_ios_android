import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ListItem from './ui/ListItem'

const TeachersList = ({userData, onPress}) => {
    const [teachers, setTeachers] = useState([]) 

    useEffect(() => {
        getTeachers()
    }, [])

    const getTeachers = () => {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/get_users_list.php?clue=${userData.clue}&user_id=${userData.user_id}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setTeachers(res.users)
            })
            .catch(err => console.log(err))
    }

    return (
        teachers?.map(teacher => (
            <TouchableOpacity key={teacher.user_id} onPress={() => onPress(teacher)}>
                <ListItem key={teacher.middlename}>
                    <Text key={teacher.surname + teacher.name} style={{
                        fontSize: 18
                    }}>{teacher.surname} {teacher.name} {teacher.middlename}</Text>
                </ListItem>
            </TouchableOpacity>
        ))
    )
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
        day: state.jlr.day,
    }
}

export default connect(mapStateToProps)(TeachersList)
