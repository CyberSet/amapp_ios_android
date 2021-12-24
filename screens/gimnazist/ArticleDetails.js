import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { ip } from './RegForm';
import { useSelector, useDispatch } from 'react-redux';

import UserPanel from './UserPanel';
const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;
let header;

const ArticleDetails = (props) => {
    const { title } = props.route.params;
    const dataItem = useSelector(state => state.gym.dataItem);
    const dispatch = useDispatch();
    const loadDataItem = (title) => dispatch({type: 'LOAD_DATA_ITEM', title});
    const [images, setImages] = useState(null);
    const [active, setActive] = useState(0);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: title.length > 31 ? title.slice(0, 32) + '...' : title
        });
    }, []);

    useEffect(() => {
        loadDataItem(title);
    }, []);

    useEffect(() => {
        if (dataItem.imgPath) {
            setImages(dataItem.imgPath.split(','));
        }
    }, [dataItem]);

    const onchange = (nativeEvent) => {
        console.log(nativeEvent.contentOffset.x);
        console.log(nativeEvent.layoutMeasurement.width);
        const slide = Math.ceil((nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width) / 2);
        if (slide !== active) {
            setActive(slide);
        }
    }

    return (
        <ScrollView>
            <View style={styles.viewStyle}>
                <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>
                    {dataItem.title}
                </Text>

                <Text style={{color: '#000', fontSize: 18, fontStyle: 'italic'}}>
                    {dataItem.author}
                </Text>

                <View>
                    <ScrollView 
                        style={{marginVertical: 5,}}
                        decelerationRate="fast"
                        snapToInterval={WIDTH / .5}
                        onScroll={({nativeEvent}) => onchange(nativeEvent)}
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                    >
                        {images?.map((image, i) => (
                            <Image
                                style={styles.image}
                                resizeMode='contain'
                                key={i}
                                source={{
                                    uri: `${image}`,
                                }}
                            /> 
                            ))
                        }
                        </ScrollView>
                        <View style={styles.pagination}>
                            {images?.map((image, i) => (
                                <Text key={i} style={i == active ? styles.dotActive : styles.dot}>⬤</Text>
                            ))}
                        </View>
                    </View>

                <Text style={{color: '#000', fontSize: 16, fontStyle: 'italic'}}>
                    {dataItem.photographer}
                </Text>

                <Text style={{color: '#000', fontSize: 20, marginTop: 15, fontWeight: 'bold'}}>
                    {dataItem.description}
                </Text>

                <Text style={{color: '#000', fontSize: 20, marginTop: 15}}>
                    {dataItem.content}
                </Text>

                <Text style={{color: 'gray', fontSize: 18, fontStyle: 'italic'}}>
                    {dataItem.sign}
                </Text>
            </View>
            <UserPanel 
                ip={ip}
                title={dataItem.id}
                name={dataItem.title}
                description = {dataItem.description}
                content = {dataItem.content}
                uri = {dataItem.web_uri}
                color={dataItem.color}
                numOfLikes={dataItem.likes} 
                datetime={dataItem.published} 
                comment={() => console.log('comment')}
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create ({
    image: {
        height: 360,
        width: WIDTH,
    },
    viewStyle: {
        padding: 10,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    btnStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 15,
        padding: 10,
    },
    cardStyle: {
        padding: 10,
        margin: 10,
    },
    fabStyle: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    listStyle: {
        color: 'gray', 
        fontSize: 15, 
        marginBottom: 10, 
        padding: 18, 
        borderWidth: 1, 
        borderColor: "gray",
    },
    wrapper: {
        width: '100%',
    },
    pagination: {
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 0, 
        alignSelf: 'center',
    },
    dot: {
        color: '#888', 
        margin: 8,
    },
    dotActive: {
        color: '#fff', 
        margin: 8,
    },
});

export { header }
export default ArticleDetails;
