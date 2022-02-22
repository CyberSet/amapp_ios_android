import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import ListItem from './ListItem'

const IndFilesCart = ({answer, item, handleLink}) => {
    return (
        <ListItem>
            <TouchableOpacity onPress={() => handleLink(item.file_url)}>
                <Text 
                    style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}
                >
                    {answer.surname} {answer.name}
                </Text>
                
                <Text 
                    style={{ fontSize: 16 }}
                >
                    {item.file_name}
                </Text>
            </TouchableOpacity>
        </ListItem>
    )
}

export default IndFilesCart
