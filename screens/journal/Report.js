import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { get_month } from '../../components/Date'
import ListContainer from '../../components/ui/ListContainer'
import PeriodHeader from '../../components/PeriodHeader'

const Report = (props) => {
    const {month, userData} = props
    const [currentMonth, setCurrentMonth] = useState(month)
    const [students, setStudents] = useState(null)
    const [names, setNames] = useState([])
    const [classes, setClasses] = useState([])
    const [subjects, setSubjects] = useState([])
    const [fact, setFact] = useState([])

    const studentsColumn = {
        title: 'Ученик',
        rows: names
    }

    const classesColumn = {
        title: 'Класс',
        rows: classes
    }

    const subjectsColumn = {
        title: 'Предмет',
        rows: subjects
    }

    const factColumn = {
        title: 'Факт',
        rows: fact
    }
    
    const Column = ({column}) => (
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>{column.title}</Text>
            {
                column.rows ? column.rows.map((row, i) => (
                    <View key={i}>
                        <Text key={row} style={{ fontSize: 16, marginBottom: 6 }} key={i}>{row}</Text>
                    </View>
                )) : <></>
            }
        </View>
    )

    useEffect(() => {
        filterData()
    }, [students])

    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_report_ind.php?clue=${userData.clue}&user_id=${userData.user_id}&month_id=${currentMonth + 1}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setStudents(res.result_students)
        })
        .catch(err => console.log(err))
    }, [currentMonth])

    const filterData = () => {
        setNames('')
        setClasses('')
        setSubjects('')
        setFact('')
        let names = [], classes = [], subjects = [], fact = []
        if (students) {
            students.map((student, i) => {
                names.push(`${i + 1}. ${student.surname} ${student.name.substring(0, 1)}`)
                classes.push(student.class_name)
                subjects.push(student.subject_name)
                fact.push(student.fact)
                setNames(names)
                setClasses(classes)
                setSubjects(subjects)
                setFact(fact)
            })
        }
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ListContainer>
                <PeriodHeader
                    handleBackChevron={() => prevMonth()} 
                    handleForwardChevron={() => nextMonth()} 
                    period={get_month(currentMonth)}
                />
                    {
                        students ?
                        <>
                            <View style={{
                                justifyContent: 'space-between', 
                                flexDirection: 'row', 
                                padding: 15,
                                margin: 5,
                                backgroundColor: '#F8EEDF',
                                borderRadius: 15,
                                shadowOpacity: .4
                            }}>
                                <Column column={studentsColumn} />
                                <Column column={classesColumn} />
                                <Column column={subjectsColumn} />
                                <Column column={factColumn} />
                            </View> 
                            <View style={{
                                justifyContent: 'space-between', 
                                flexDirection: 'row', 
                                padding: 20,
                                margin: 5,
                                backgroundColor: '#F8EEDF',
                                borderRadius: 15,
                                shadowOpacity: .4
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Итого:</Text>
                                <Text style={{ fontSize: 18 }}>{students[0].fact_view}</Text>
                            </View>
                        </> :
                        <View style={{
                            justifyContent: 'space-between', 
                            flexDirection: 'row', 
                            padding: 15,
                            margin: 5,
                            backgroundColor: '#F8EEDF',
                            borderRadius: 15,
                            shadowOpacity: .4
                        }}>
                            <Text style={{ fontSize: 18 }}>Пока что нет уроков</Text>
                        </View>
                    }
                </ListContainer>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
        month: state.date.month
    }
}

export default connect(mapStateToProps)(Report)
