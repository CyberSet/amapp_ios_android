import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { Card } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { fetchContent } from '../../store/asyncActions/getContent'
import UserPanel from './UserPanel'
import { ip } from './RegForm'

const Home = (props) => {
    const data = useSelector(state => state.gym.data)
    const cl = useSelector(state => state.gym.catList)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoadig] = useState(false)

    const dispatch = useDispatch()

    const loadList = (payload) => dispatch({type: 'LOAD_CATEGORY_LIST', payload})

    useEffect(() => {
        setIsLoadig(true)
        loadList('')
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        dispatch(fetchContent())
        setIsLoadig(false)
    }

    const clickedItem = (title) => {
        props.navigation.navigate("Details", {title: title})
    }

    // const loadMore = () => {
    //     setPage(page + 1)
    //     dispatch(fetchContent())
    // }

    const renderData = ({item}) => {

        return (
            <Card style={styles.cardStyle} onPress = {() => clickedItem(item.title)}>
                <Text style={{color: 'gray', fontSize: 15}}>{item.category.toUpperCase()}</Text>
                <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold'}}>{item.title}</Text>
                <Text style={{color: '#000', fontSize: 16, fontStyle: 'italic'}}>{item.author}</Text>
                {
                    item.imgPath ?
                    <View>
                        <Image
                            style={{flex: 1, alignSelf: 'center', margin: 10, width: 360, height: 360}}
                            resizeMode='contain'
                            source={{
                                uri: `${item.imgPath.split(',')[0]}`,
                            }}
                        />
                    </View> :
                    <Text style={{paddingVertical: 3}}></Text>
                }
                <Text style={{color: '#000', fontSize: 18}}>{item.description}</Text>
                <UserPanel 
                    ip={ip}  
                    title={item.id}
                    name={item.title}
                    description={item.description}
                    content={item.content}
                    uri={item.web_uri}
                    datetime={item.published} 
                    comment={() => clickedItem(item)}
                />
            </Card>
        )
    }

    return (
            <View style={{flex: 1}}>
                <FlatList 
                    refreshing={isLoading}
                    onRefresh={fetchData}
                    data = {cl.length > 0 ? cl : data}
                    renderItem = {renderData}
                    keyExtractor = {item => item.id}
                    // onEndReached={loadMore}
                />
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
        fontSize: 18,
    }
})

export default Home
