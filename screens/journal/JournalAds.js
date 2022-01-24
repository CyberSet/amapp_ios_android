import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Header } from './Replacements';
import { journalLessonsStyle } from "./JournalLessons";
import JournalButton from '../../components/Button';

const JournalAds = (props) => {
    const { userData } = props;
    const [week, setWeek] = useState(0);
    const [period, setPeriod] = useState('');
    const [ads, setAds] = useState(null);

    const handleFileLink = (url) => {
        let reversedArr = url.split('/').reverse();
        let str = reversedArr[0];
        let uri = 'https://diary.alma-mater-spb.ru/e-journal/teachers/ads_files/' + encodeURIComponent(str);
        // console.log(reversedArr, str);
        Linking.openURL(uri);
    };

    const handleAdLink = (url) => {
        Linking.openURL(encodeURI(url));
    };

    useEffect(() => {
        setAds(null);
        const url = `https://diary.alma-mater-spb.ru/e-journal/api/open_ad_teachers.php?clue=${userData.clue}&user_id=${userData.user_id}&week=${week}`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setAds(res.ads);
                setPeriod(res.stringData);
                res.ads.map(item => {
                    console.log(item.ad);
                })
            })
            .catch(err => console.log(err));

            console.log(url);
    }, [week]);

    return (
        <SafeAreaView style={{ ...journalLessonsStyle.listContaner, flex: 1 }}>
            <ScrollView>
                <Header week={week} setWeek={setWeek} period={period} />
                {
                    ads?.map((item, dayIndex) => (
                        <View key={dayIndex}>
                            <JournalButton 
                                key={item.dayLesson} 
                                title={
                                    item.dayLesson.startsWith('0') ? item.dayLesson.replace('0', '') 
                                    + ' ' +
                                    item.monthLesson +
                                    ' (' + item.dayOfWeek + ')'
                                    : item.dayLesson + ' ' +
                                    item.monthLesson +
                                    ' (' + item.dayOfWeek + ')'
                                } 
                            />
                            {
                                item.ad.map((ad, adIndex) => (
                                    <View key={adIndex} style={journalLessonsStyle.listItem}>
                                        <View style={{ borderBottomWidth: 1, paddingBottom: 15, marginBottom: 15 }}>
                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                {
                                                    ad.ad_text.split(' ').map(text => (
                                                        text.startsWith('http') ?
                                                            <Text 
                                                                key={text} 
                                                                style={{ fontSize: 21, marginRight: 5, color: 'blue' }}
                                                                onPress={() => handleAdLink(text)}
                                                            >
                                                                Ссылка
                                                            </Text> :
                                                            <Text key={text} style={{ fontSize: 21, marginRight: 5 }}>
                                                                {text.replace(/\r\n/, ' ')}
                                                            </Text>
                                                    ))
                                                }
                                            </View>
                                            {
                                                ad.url ?
                                                <Text 
                                                    style={{ fontSize: 18, color: 'blue', textAlign: 'center', marginVertical: 5 }}
                                                    onPress={() => handleFileLink(ad.url)}
                                                >
                                                    Скачать файл
                                                </Text> :
                                                <></>
                                            }
                                        </View>
                                        <Text style={{ fontSize: 18, fontStyle: 'italic' }}>
                                            {ad.name}, {ad.date_create}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
};

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
    }
};

export default connect(mapStateToProps)(JournalAds);