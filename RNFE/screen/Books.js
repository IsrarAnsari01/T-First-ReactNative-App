import React, { useState, useEffect } from 'react'
import { Button, Container, Footer, FooterTab, Header, Icon, Title, Card, CardItem, Text, Content, Left, Right, Subtitle, List, ListItem, Body, Thumbnail, Spinner } from 'native-base'
import AppSettings from '../AppSettings'
import { Link } from 'react-router-native'
import { View } from 'react-native'
export default function Books() {
    const [allBooks, setAllBooks] = useState([])
    const getAllBooksFromServer = () => {
        fetch(`${AppSettings.BACK_END_HOSTED_SERVER}/books`)
            .then(r => r.json())
            .then(books => {
                setAllBooks(books.books)
            })
            .catch(err => {
                console.log("Someething went wrong ", err)
            })
    }
    useEffect(() => {
        getAllBooksFromServer()
    }, [])
    return <Container>
        <Header style={{ backgroundColor: "#c25fc9" }}>
            <Left>
                <Button transparent>
                    <Link to='/'>
                        <View>
                            <Icon name='arrow-back' />
                        </View>
                    </Link>
                </Button>
            </Left>
            <Body>
                <Title>Books in Our LMS</Title>
                <Subtitle> D&D By IA </Subtitle>
            </Body>
        </Header>
        <Content padder>
            <Card>
                <CardItem header bordered style={{ backgroundColor: "#c25fc9" }}>
                    <Title>Total Number of Books {allBooks.length}</Title>
                </CardItem>
                <List>
                    {allBooks.length ? allBooks.map(oneBook => <>
                        <ListItem thumbnail key = {oneBook._id}>
                            <Left>
                                <Thumbnail square source={{ uri: `${oneBook.coverImageURL}` }} />
                            </Left>
                            <Body>
                                <Text>{oneBook.title}</Text>
                                <Text note>{oneBook.tagLine}</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Link to={"/fullBook/" + oneBook._id}>
                                        <View>
                                            <Text>View</Text>
                                        </View>
                                    </Link>
                                </Button>
                            </Right>
                        </ListItem>
                    </>) : <Spinner color = 'red'/>}
                </List>
                <CardItem footer bordered>
                    <Text>Some thing more to Comes </Text>
                </CardItem>
            </Card>
            <Button style={{ backgroundColor: "#c25fc9", paddingTop: 10, marginTop: 10 }} block>
                <Link to='/newBook'>
                    <View>
                        <Text> Add new Books </Text>
                    </View>
                </Link>
            </Button>
        </Content>
        <Footer>
            <FooterTab style={{ backgroundColor: "#c25fc9" }}>
                <Button>
                    <Link to='/newBook'>
                        <View>
                            <Icon name='bookmarks' />
                            <Text style={{ color: "white" }}> And New Book</Text>
                        </View>
                    </Link>
                </Button>
            </FooterTab>
        </Footer>
    </Container>
}
