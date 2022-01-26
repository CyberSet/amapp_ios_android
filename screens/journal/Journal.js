import React, { Component, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { connect } from 'react-redux'

function Journal({userData}) {

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_journal.php?clue=${userData.clue}&user_id=${userData.user_id}&subject_id=17&class_id=22&class_group=1&period=2`)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(res))
    }, [])

    return (
        <SafeAreaView>
            <Text>journal</Text>
        </SafeAreaView>
    )
}

function mapStateToProps(state) {
    return {
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps)(Journal)