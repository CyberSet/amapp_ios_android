import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { styles } from "./Style";

const CanteenOptionsCard = ({title, option, onPress}) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 }}>
            <TouchableOpacity 
                style={{
                    borderColor: '#F7AF48', 
                    width: 35, 
                    height: 35, 
                    borderRadius: 50,
                    backgroundColor: option ? '#F8EEDF' : '#fff'
                }}
                onPress={onPress}
            >
                {option ?
                    <Icon
                        name='checkmark'
                        size={30}
                        color='green'
                    /> : <></>
                }
            </TouchableOpacity>
            <Text style={{ ...styles.lessonInfo, paddingLeft: 15, paddingRight: 45}}>{title}</Text>
        </View>
    )
}

export default CanteenOptionsCard
