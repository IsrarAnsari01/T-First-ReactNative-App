import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import AppSettings from '../../AppSettings'
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Spinner } from 'native-base';
export default function DeckSwiperForApp() {
    const [books, setAllBooks] = useState([])
    const getAllBooksFromServer = () => {
        fetch(`${AppSettings.BACK_END_HOSTED_SERVER}/books`)
            .then(r => r.json())
            .then(booksfromDb => {
                console.log(booksfromDb.books)
                setAllBooks(booksfromDb.books)
            })
            .catch(err => {
                console.log("Something went wrong ", err)
            })
    }   
    useEffect(() => {
        getAllBooksFromServer()
    }, [])
    return <>
        <Container>
            <Header>
                <Body>
                    <Text style={{ color: "white" }}> Total Number of Books {books.length}</Text>
                </Body>
            </Header>
            <View>
                {books.length ? <DeckSwiper
                    dataSource={books}
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: `${item.coverImageURL}` }} />
                                    <Body>
                                        <Text>{item.title}</Text>
                                        <Text note>{item.genre}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image style={{ height: 300, flex: 1 }} source={{ uri: `${item.coverImageURL}` }} />
                            </CardItem>
                            <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.tagLine}</Text>
                            </CardItem>
                        </Card>}
                /> : <Spinner color='red' />}
            </View>
        </Container>
    </>
}
