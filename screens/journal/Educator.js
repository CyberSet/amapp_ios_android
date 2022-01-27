import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

import ListContainer from '../../components/ui/ListContainer'
import ListItem from '../../components/ui/ListItem'
import WeekHeader from '../../components/WeekHeader'

const Educator = ({userData}) => {
    const [isEducator, setIsEducator] = useState(true)
    const [week, setWeek] = useState(0);

    useEffect(() => {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_menu.php?clue=${userData.clue}&user_id=${userData.user_id}&week=${week}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status === 3) {
                    setIsEducator(false)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ListContainer>
                    <WeekHeader setWeek={setWeek} />
                    <ListItem>
                        {
                            isEducator
                            ? <Text>educator</Text>
                            : <Text>user is not educator</Text>
                        }
                    </ListItem>
                </ListContainer>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps)(Educator)
