import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title, Right } from 'native-base';
import { Link, useParams } from 'react-router-native'
import { View } from 'react-native'
import AppSettings from '../../AppSettings'
export default function FullBook() {
    const [specificBook, setSpecificBook] = useState({})
    const { id } = useParams();
    const getSpecificBookFromServer = (bookid) => {
        fetch(`${AppSettings.BACK_END_HOSTED_SERVER}/books/${bookid}`)
            .then(r => r.json())
            .then(books => {
                setSpecificBook(books.book)
            })
            .catch(err => {
                console.log("Someething went wrong ", err)
            })
    }
    useEffect(() => {
        getSpecificBookFromServer(id)
    }, [])
    return <>
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Link to='/books'>
                            <View>
                                <Icon name='arrow-back' />
                            </View>
                        </Link>
                    </Button>
                </Left>
                <Body>
                    {specificBook? <Title> {specificBook.title} </Title> : <></>}
                </Body>
            </Header>
            <Content>
                <Card style={{ flex: 0 }}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: `${specificBook.coverImageURL}`}} />
                            <Body>
                                <Text>Author | {specificBook.author} </Text>
                                <Text note>Uploaded Date | {specificBook.addedOn}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Image source={{uri: `${specificBook.coverImageURL}`}} style={{ height: 200, width: 460, flex: 1 }} />
                            <Text>
                               {specificBook.tagLine}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                        <Left>
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>12 Likes</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Icon name="download" />
                                <Text>Bownload Book</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    </>
}
