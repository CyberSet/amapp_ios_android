import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ListItem from './ui/ListItem'

const ClassesList = ({userData, onPress}) => {
    const [classes, setClasses] = useState([]) 

    useEffect(() => {
        getClasses()
    }, [])

    const getClasses = () => {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/get_classes_list.php?clue=${userData.clue}&user_id=${userData.user_id}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setClasses(res.users)
            })
            .catch(err => console.log(err))
    }

    return (
        classes?.map(item => (
            <TouchableOpacity key={item.user_id} onPress={() => onPress(item)}>
                <ListItem>
                    <Text key={item.class_id}>{item.class_name}</Text>
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

export default connect(mapStateToProps)(ClassesList)
