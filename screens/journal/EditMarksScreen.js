import React, { useEffect, useState } from "react"
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, TextInput, Alert } from "react-native"
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
    const [isDisabled, setDisabled] = useState();
    let i = -1;
    const respond = { clue: '', user_id: '', lesson_id: '', marks: [] };


    useEffect(() => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/get_marks_lesson.php?clue=${userData.clue}&user_id=${userData.user_id}&lesson_id=${lesson_id}&class_id=${class_id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                console.log(userData.clue, userData.user_id, lesson_id, class_id, student_id);
                setIsDropedDown([false, false, false]);
                setCoefficients(res.coefficients);
                setDisabled(res.disabled);
                for (cur of res.students_marks) if (cur.student_id === student_id) { setIsAbsence(cur.absence); setIsDelay(cur.delay); setStudent(cur); }
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

    const convertJSONtoURL = (data) => {
        let temp = `clue=${data.clue}&user_id=${data.user_id}&lesson_id=${data.lesson_id}&`
        temp += `marks[0][absence]=${data.marks[0].absence}&`
        temp += `marks[0][delay]=${data.marks[0].delay}&`
        temp += `marks[0][student_id]=${data.marks[0].student_id}`
        for (let i = 0; i < data.marks[0].marks.length; i++)
            if (data.marks[0].marks[i] === 0) temp += `&marks[0][marks][${i}]=0`
            else temp += `&marks[0][marks][${i}][id]=${data.marks[0].marks[i].id}&marks[0][marks][${i}][value]=${data.marks[0].marks[i].value}`
        return temp
    }

    const sendToServer = async (respond) => {
        await fetch('https://diary.alma-mater-spb.ru/e-journal/api/save_marks_lesson_post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: respond
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const saveChanges = async () => {
        respond.clue = userData.clue;
        respond.user_id = userData.user_id;
        respond.lesson_id = lesson_id;
        respond.marks = [student];
        for (cur of respond.marks) {
            cur.absence = Number(isAbsence);
            cur.delay = Number(isDelay);
            temp = [];
            if (Array.isArray(student.marks))
                for (mark of student.marks) {
                    if (mark === 0 || mark.value === '' || mark.id === '') {
                        temp.push(0);
                        if(mark.value === '') Alert.alert("Не указана оценка");
                        else if (mark.id === '') Alert.alert("Не указан коэффициент");
                    }
                    else temp.push({ value: mark.value, id: mark.id })
                }
            else temp.push({ value: cur.marks.value, id: cur.marks.id })
            cur.marks = [...temp]
        }
        await sendToServer(convertJSONtoURL(respond))
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
                            if (Array.isArray(student.marks)) {
                                if (mark === 0) {
                                    mark = { value: '', id: coefficient.id };
                                    temp = [...student.marks];
                                    temp[itemIndex] = mark;
                                    setStudent({ ...student, marks: temp })
                                }
                                else mark.id = coefficient.id;
                                changeVisible(itemIndex);
                            }
                            else {
                                if (mark === 0) {
                                    mark = { value: '', id: coefficient.id };
                                    temp = mark;
                                    setStudent({ ...student, marks: temp })
                                }
                                else mark.id = coefficient.id;
                                changeVisible(itemIndex);
                            }
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
                onChangeText={e => {
                    if (Array.isArray(student.marks)) {
                        temp = [...student.marks];
                        if (mark === 0) {
                            mark = { value: e, id: '' };
                            temp[itemIndex] = mark;
                        }
                        else temp[itemIndex].value = e;
                        setStudent({ ...student, marks: temp })
                    }
                    else {
                        console.log(mark)
                        temp = { value: student.marks.value, id: student.marks.id }
                        if (mark === 0) {
                            mark = { value: e, id: '' };
                            temp = mark;
                        }
                        else temp.value = e;
                        setStudent({ ...student, marks: temp })
                    }

                }}
            ></TextInput>
        </View>
    )


    return (<SafeAreaView>
        <ScrollView>
            <ListItem>
                {student.marks || student.marks === 0 ? <ListContainer>
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
            {isDisabled === 0 ? <JournalButton
                title={"Сохранить изменения"}
                onPress={saveChanges} /> : <></>}
        </ScrollView>
    </SafeAreaView>)
}


function mapStateToProps(state) {
    return {
        userData: state.auth.userData,
    }
}

export default connect(mapStateToProps)(EditMarksScreen)