import React, { useState, useEffect } from 'react'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Card, CardItem, Title, Button, Footer, FooterTab, Icon, Subtitle, Spinner } from 'native-base';
import AppSettings from "../../AppSettings"
import { Link } from 'react-router-native'
import { View } from 'react-native'
export default function TotalReders() {
    const [allreaders, setAllReaders] = useState([])
    const getAllUserFromDB = () => {
        fetch(`${AppSettings.BACK_END_HOSTED_SERVER}/readers`)
            .then(res => res.json())
            .then(allreadersfromDB => {
                setAllReaders(allreadersfromDB.readers)
            })
            .catch(err => {
                console.log("Error in Fetching data ", err)
            })
    }
    useEffect(() => {
        getAllUserFromDB();
    }, [])

    return <>
        <Container>
            <Header>
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
                    <Title>Readers in Our LMS</Title>
                    <Subtitle> D&D By IA </Subtitle>
                </Body>
            </Header>
            <Content>
                <Card>
                    <CardItem header>
                        <Title style={{ color: 'black' }}>
                            Total number of readers is {allreaders.length}
                        </Title>
                    </CardItem>
                    <List>
                        {allreaders.length ? allreaders.map(reader => <>
                            <ListItem avatar key = {reader._id}>
                                <Left>
                                    <Thumbnail source={{ uri: `${reader.userAvatar}` }} />
                                </Left>
                                <Body>
                                    <Text>{reader.name}</Text>
                                    <Text note>{reader.email}</Text>
                                </Body>
                                <Right>
                                    <Button success>
                                        <Link to = {"/fullUserInfo/"+ reader._id}>
                                            <View>
                                                <Text note style  = {{color: "white"}}>Get Info</Text>
                                            </View>
                                        </Link>
                                    </Button>
                                </Right>
                            </ListItem>
                        </>)
                            : <Spinner color='red' />}
                    </List>
                    <CardItem footer>
                        <Button block>
                            <Link to='/addnewUser'>
                                <Text> Want to join us !Lets Click</Text>
                            </Link>
                        </Button>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button vertical>
                        <Link to='/addnewUser'>
                            <View>
                                <Icon name="color-filter" />
                                <Title> Enroll with us </Title>
                            </View>
                        </Link>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>




    </>
}
