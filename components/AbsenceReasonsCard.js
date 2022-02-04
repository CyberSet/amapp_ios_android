import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const AbsenceReasonsCard = ({saveChange, student_id, reason, absenceReason, setAbsenceReason, setDropdownExpanded}) => {

    return (
        <>
            {reason.title === absenceReason ?
                <TouchableOpacity key={reason.reason_id} style={{ flexDirection: 'row', padding: 10, alignItems: 'flex-start', backgroundColor: '#EAEAEA' }}>
                    <Icon
                        key={reason.id + 'icon'}
                        name='checkmark'
                        size={30}
                    /> 
                    <Text key={reason.title} style={{ fontSize: 18, paddingLeft: 5 }}>{reason.title}</Text>
                </TouchableOpacity> : 
                <TouchableOpacity key={reason.reason_id + 'touchable'} onPress={() => {
                    setAbsenceReason(reason.title)
                    setDropdownExpanded(false)
                    saveChange(1, reason.reason_id, student_id)
                }}>
                    <Text key={reason.title} style={{ fontSize: 18, padding: 10 }}>{reason.title}</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default AbsenceReasonsCard
