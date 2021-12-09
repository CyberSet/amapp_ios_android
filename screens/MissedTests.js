import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../components/Style';

const MissedTests = ({term, header}) => {
    const darkTheme = useSelector(state => state.theme.darkTheme);
    const userData = useSelector(state => state.auth.userData);
    const user = useSelector(state => state.auth.user);
    const [missed, setMissed] = useState('');

    const getMissedTests = () => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_missed_kr.php?clue=${userData.clue}&user_id=${userData.user_id}&student_id=${user.student_id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response.missedKR[term - 1]);
            setMissed(response.missedKR[term - 1]);
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        getMissedTests();
    }, [term]);

    const Item = ({title, date}) => (
        <View style={{ ...styles.listItemContainer, flexDirection: 'column', paddingRight: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: darkTheme ? '#fff' : '#000', fontSize: 16, paddingHorizontal: 15, fontWeight: 'bold' }}>
                    {title}
                </Text>
                <Text style={{ fontSize: 16 }}>
                    {date}
                </Text>
            </View>
        </View>
    );

    const renderItem = ({item}) => (
        <Item title={item.subject_name} date={item.data_lesson} />
    );

    return (
        <FlatList
            data={missed}
            renderItem={renderItem}
            keyExtractor={item => item.subject_name + item.data_lesson}
            ListHeaderComponent={header}
        />
    );
};

export default MissedTests