import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Schedule from './ui/Schedule/Schedule'

const ClassSchedule = ({userData, class_id}) => {
    const [schedule, setSchedule] = useState(null)

    useEffect(() => {
        setSchedule(null)
        getScheduleForClass()
    }, [class_id])

    const getScheduleForClass = () => {
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_schedule_class.php?clue=${userData.clue}&user_id=${userData.user_id}&class_id=${class_id}`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setSchedule(res.schedule)
            })
            .catch(err => console.log(err))
    }

    return (
        <Schedule schedule={schedule} />
    )
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
        day: state.jlr.day,
    }
}

export default connect(mapStateToProps)(ClassSchedule)
