import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import ListItem from './ListItem'

const StudentFilesCart = ({item, file, onPress}) => {

    return (
        <ListItem>
            <TouchableOpacity onPress={() => onPress(file.file_path)}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
                    {item.surname} {item.name}
                </Text>
                <View style={{ paddingLeft: 15 }}>
                    <Text 
                        key={file.filename}
                        style={{ fontSize: 16 }} 
                    >
                        {file.file_name}
                    </Text>
                </View>
            </TouchableOpacity>
        </ListItem>
    )
}

export default StudentFilesCart
