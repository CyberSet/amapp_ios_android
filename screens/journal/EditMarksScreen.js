import React, { useEffect, useState } from "react"
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, TextInput } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import JournalButton from "../../components/ui/Button";
import ListContainer from "../../components/ui/ListContainer";
import ListItem from "../../components/ui/ListItem";

const EditMarksScreen = (props) => {
    const { navigation, userData } = props;
    const { lesson_id, student_id, class_id } = props.route.params;
    const [student, setStudent] = useState({});
    const [isAbsence, setIsAbsence] = useState();
    const [isDelay, setIsDelay] = useState();
    const [isDropedDown, setIsDropedDown] = useState([]);
    const [coefficients, setCoefficients] = useState([]);
    const [studentsMarks, setStudentMarks] = useState([]);
    let i = -1;
    const respond = { clue: '', user_id: '', lesson_id: '', marks: [] };


    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/get_marks_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}&class_id=${class_id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                console.log(userData.clue, userData.user_id, lesson_id, class_id, student_id);
                setStudentMarks([...res.students_marks]);
                setIsDropedDown([false, false, false]);
                setCoefficients(res.coefficients);
                for (cur of res.students_marks) if (cur.student_id === student_id) { setStudent(cur); setIsAbsence(cur.absence ? 1 : 0); setIsDelay(cur.delay ? 1 : 0); }
                // console.log(student.marks)
            })
            .catch(err => console.log(res))
    }, [])

    const getCoefficientTitle = (coefficient_id) => {
        for (cur of coefficients) if (cur.id === coefficient_id) return (cur.title + ' (' + cur.coefficient + ')')
    }

    const changeVisible = (itemIndex) => {
        temp = [...isDropedDown]
        temp[itemIndex] = !temp[itemIndex]
        setIsDropedDown(temp)
    }

    const saveChanges = () => {
        respond.clue = userData.clue;
        respond.user_id = userData.user_id;
        respond.lesson_id = lesson_id;
        respond.marks = [...studentsMarks];
        for (cur of respond.marks) {
            if (cur.student_id === student_id) {
                cur.absence = Number(isAbsence);
                cur.delay = Number(isDelay);
                temp = [];
                if (Array.isArray(student.marks))
                    for (mark of student.marks) {
                        if (mark === 0 || mark.value === '' || mark.id === '') temp.push(0);
                        else temp.push({ value: mark.value, id: mark.id })
                    }
                else temp.push({ value: cur.marks.value, id: cur.marks.id })
                cur.marks = [...temp]
                console.log(cur)
            }
            else {
                temp = []
                if (Array.isArray(cur.marks))
                    for (mark of cur.marks) if (mark === 0) temp.push(0); else temp.push({ value: mark.value, id: mark.id });
                else
                    temp.push({ value: cur.marks.value, id: cur.marks.id })
                cur.marks = [...temp]
            }
        }
        navigation.goBack()
    }

    const CheckedItem = ({ is, set, title }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity
                style={{
                    borderColor: '#F7AF48',
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                    backgroundColor: is ? '#ececec' : '#fff'
                }}
                onPress={() => {
                    set(!is)
                }}
            >
                {is ?
                    <Icon
                        name='checkmark'
                        size={30}
                        color='green'
                    /> : <></>
                }
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>{title}</Text>
        </View>
    )

    const DropDownCoefficientItem = ({ mark, itemIndex }) => (
        <View>
            <JournalButton title={mark === 0 || mark.id === '' ? "Выберите тип урока ↓" : getCoefficientTitle(mark.id)}
                onPress={() => {
                    changeVisible(itemIndex)
                }
                }></JournalButton>
            {isDropedDown[itemIndex] ? coefficients.map(
                coefficient =>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={e => {
                            if (mark === 0) {
                                mark = { value: '', id: coefficient.id, number: 1 };
                                temp = [...student.marks];
                                temp[itemIndex] = mark;
                                setStudent({ ...student, marks: temp })
                            }
                            else mark.id = coefficient.id;
                            changeVisible(itemIndex);
                        }}>
                            <ListItem>
                                <Text>{coefficient.title + ' (' + coefficient.coefficient + ')'}</Text>
                            </ListItem>
                        </TouchableOpacity>

                    </View>
            ) : <></>}
            <TextInput style={{ borderBottomWidth: 1, margin: 10, fontSize: 20 }}
                placeholder='Введите оценку'
                value={mark === 0 ? '' : mark.value}
                onChange={e => {
                    temp = [...student.marks];
                    if (mark === 0) {
                        mark = { value: e.nativeEvent.text, id: '', number: 1 };
                        temp[itemIndex] = mark;
                    }
                    else temp[itemIndex].value = e.nativeEvent.text;
                    setStudent({ ...student, marks: temp })
                }}
            ></TextInput>
        </View>
    )


    return (<SafeAreaView>
        <ScrollView>
            <ListItem>
                {student.marks ? <ListContainer>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{student.student_name}</Text>
                    <CheckedItem is={isAbsence} set={setIsAbsence} title='Отсутствовал' />
                    <CheckedItem is={isDelay} set={setIsDelay} title='Опоздал' />
                    {Array.isArray(student.marks) ? student.marks.map(
                        mark => {
                            i++;
                            return (<DropDownCoefficientItem mark={mark} itemIndex={i} />)
                        }
                    ) : <DropDownCoefficientItem mark={student.marks} itemIndex={0} />}
                </ListContainer>
                    :
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Загрузка...</Text>
                }
            </ListItem>
            <JournalButton
                title={"Сохранить изменения"}
                onPress={saveChanges} />
        </ScrollView>
    </SafeAreaView>)
}


function mapStateToProps(state) {
    return {
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps)(EditMarksScreen)