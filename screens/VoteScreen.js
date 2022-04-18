import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { Card } from 'react-native-paper';
import { fetchTeams } from '../store/asyncActions/getTeams';
import { fetchParents } from '../store/asyncActions/getParents';
import { fetchVoters } from '../store/asyncActions/getVoters';


const VoteScreen = (props) => {

    [isVoted, setIsVoted] = useState(false)

    let parents = useSelector(state => state.vote.parents)
    let voters = useSelector(state => state.vote.voters)
    let teams = useSelector(state => state.vote.teams)

    const user = useSelector(state => state.auth.user);
    const userType = useSelector(state => state.auth.userType);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTeams());
        dispatch(fetchParents());
        dispatch(fetchVoters());
        if(voters.find((item) => {if(item.user_id === user.student_id) return 1;}) || Number(user.number) < 4) setIsVoted(true);
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

    async function handleUpdate(tempTeam) {
        if(userType === 1){
            await dispatch(fetchVoters());
            if(voters.find((item) => {if(item.user_id === user.student_id) return 1;})){
                alert(`${user.name} ${user.surname} уже проголосовал(а)`);
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
            dispatch(fetchParents());
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
                <Text style={{color: '#000', fontSize: 18, fontStyle: 'italic',  textAlign: 'center'}}>Команда {team.item.form === 12 ? 'экстерната' :  `${team.item.form} класса`}</Text>
            </Card>
        )
    }

    return (
        <View style={{flex: 1}}>
            {isVoted ? <Text style={{color: 'black', fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>Ваш голос учтен</Text> : <FlatList 
                    data = {teams}
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