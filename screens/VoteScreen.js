import React, { useEffect, useReducer, useState } from 'react';
import { View, Image, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import { fetchTeams } from '../store/asyncActions/getTeams';
import { fetchParents } from '../store/asyncActions/getParents';
import { fetchVoters } from '../store/asyncActions/getVoters';


const VoteScreen = (props) => {

    const [isVoted, setIsVoted] = useState(false)
    const [membersVisible, setMemberVisible] = useState([])
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    let parents = useSelector(state => state.vote.parents)
    let voters = useSelector(state => state.vote.voters)
    let teams = useSelector(state => state.vote.teams)

    const user = useSelector(state => state.auth.user);
    const userType = useSelector(state => state.auth.userType);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTeams());
        callParents();
        callVoters();
        if(voters.find((item) => {if(item.user_id === user.student_id) return 1;})) setIsVoted(true);
        if(Number(user.number) < 4) setIsVoted(true);
    }, []);

    async function PostData(url='', data={}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const callVoters = async () => {
        dispatch(fetchVoters());
    }

    const callParents = async () => {
        dispatch(fetchParents());
    }

    async function handleUpdate(tempTeam) {
        if(userType === 1){
            await callVoters();
            if(voters.find((item) => {if(item.user_id === user.student_id) return 1;})){
                alert(`${user.name}, Вы уже проголосовали`);
                setIsVoted(true)
            }
            else if(tempTeam.form === Number(user.number)) {
                alert(`Вы не можете голосовать за свою параллель`);
            }
            else {
                PostData(`https://gimnazist.herokuapp.com/api/voters/`, 
                    {
                        'clue': `app`, 
                        'user_id': `${user.student_id}`,
                        'form': `${user.number}`,
                        'name': `${user.name}`,
                        'surname': `${user.surname}`,
                        'choice': `${tempTeam.name}`
                    })
                    setIsVoted(true)
                }
            dispatch(fetchVoters());
        }
        else if (userType === 2){
            await callParents();
            if(parents.find((item) => {if(item.user_id === user.student_id) return 1;})){
                setIsVoted(true)
                alert(`Вы уже проголосовали`);
            }
            else{
                PostData(`https://gimnazist.herokuapp.com/api/parents/`, 
                    {
                        'clue': `app`, 
                        'user_id': `${user.student_id}`,
                        'name': `${user.name}`,
                        'surname': `${user.surname}`,
                        'choice': `${tempTeam.name}`
                    })
                setIsVoted(true)
        }
        }
        else alert('Вы не учавствуете в голосовании')
    }

    const renderTeams = (team) => {
        return (
            <Card style={styles.cardStyle}>
                <Text style={{color: 'black', fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>{team.item.name}</Text>
                <Image style={{width: 200, height: 200, alignSelf:'center'}} source={{uri:team.item.image}}/>
                <Button style={styles.submitButton} onPress={() => handleUpdate(team.item)} title='Голосовать за команду!'/>
                <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', textAlign: 'center', margin: 5}}>Капитан: {team.item.leader}</Text>
                <TouchableOpacity style={{display: 'flex', flexDirection:'row', alignSelf: 'center'}} onPress={() => {
                    setMemberVisible(() => {
                        const newArr = membersVisible;
                        newArr[team.index] = !newArr[team.index]
                        return newArr
                    })
                    forceUpdate();
                }}>
                    <Text style={{color: '#000', fontSize: 18, fontStyle: 'italic',  textAlign: 'center'}}>Команда {team.item.form === 12 ? 'экстерната ' :  `${team.item.form} класса `}</Text>
                    <Icon name='information-circle-outline' size={22} color='#000'></Icon>
                </TouchableOpacity>
                {membersVisible[team.index] && 
                    <Text style={{marginTop:5, borderWidth:2, borderRadius: 15, borderColor:'#bdc3c7', color: '#000', fontSize: 18, fontStyle: 'italic',  textAlign: 'center'}}>{team.item.members}</Text>
                }
            </Card>
        )
    }

    return (
        <View style={{flex: 1}}>
            {isVoted ? <Text style={{color: 'black', fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>Ваш голос учтен</Text> : <FlatList 
                    data = {userType === 1 ? teams.filter(team => team.form !== Number(user.number)) : teams}
                    renderItem = {team => {
                        return renderTeams(team)
                    }}
                    keyExtractor = {team => `${team.name}`}
                />}
        </View>
    )
}

export const styles = StyleSheet.create({
    cardStyle: {
        padding: 10,
        margin: 5,
        borderRadius: 15,
    },
    fabStyle: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    listStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 25,
        marginBottom: 15,
        fontSize: 18
    },
    submitButton: {
        margin: 15,
        padding: 10,
        border: 1,
        borderRadius: 10,
        fontSize: 14
    }
})

export default VoteScreen;