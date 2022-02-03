import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { styles } from "../../components/Style";

const Checkbox = () => {
    return (
        <View style={{ paddingLeft: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TouchableOpacity 
                    style={{ borderWidth: 2, width: 40, height: 40 }}
                    onPress={() => setIsAll(isAll === '0' ? '1' : '0')}
                >
                    {
                        isAll === '0' ? 
                        <Icon
                            name='checkmark'
                            size={36}
                            color='green'
                        /> : <></>
                    }
                </TouchableOpacity>
                <Text style={{ ...styles.lessonInfo, paddingLeft: 15 }}>Присутствуют все</Text>
            </View>
        </View>
    )
}

export default Checkbox
