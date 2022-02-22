import React from 'react'
import { SafeAreaView, ScrollView, Text, Linking } from 'react-native'
import { connect } from 'react-redux'
import IndFilesCart from './ui/IndFilesCart'

const IndFiles = (props) => {
    const { answers } = props.route.params
    
    const handleLink = async (url) => {
        await Linking.openURL(encodeURI(url.replace('https://', 'https://diary.')))
        console.log(encodeURI('diary.' + url))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                {answers?.map(answer => 
                    answer.answer_array.map(item => (
                        <IndFilesCart 
                            key={answer.student_id} 
                            answer={answer} 
                            item={item} 
                            handleLink={handleLink} 
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps)(IndFiles)
