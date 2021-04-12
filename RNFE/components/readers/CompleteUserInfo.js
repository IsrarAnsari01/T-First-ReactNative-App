import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title} from 'native-base';
import { Link, useParams } from 'react-router-native'
import { View, StyleSheet } from 'react-native'
import AppSettings from '../../AppSettings'
export default function CompleteUserInfo() {
    const [specificUser, setSpecificUser] = useState({})
    const { id } = useParams();
    const getSpecificUserFromServer = (userid) => {
        fetch(`${AppSettings.BACK_END_HOSTED_SERVER}/readers/bio/${userid}`)
            .then(r => r.json())
            .then(reader => {
                setSpecificUser(reader.reader)
            })
            .catch(err => {
                console.log("Someething went wrong ", err)
            })
    }
    useEffect(() => {
        getSpecificUserFromServer(id)
    }, [])
    return <>
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Link to='/totalUser'>
                            <View>
                                <Icon name='arrow-back' />
                            </View>
                        </Link>
                    </Button>
                </Left>
                <Body>
                    {specificUser ? <Title> {specificUser.name} </Title> : <></>}
                </Body>
            </Header>
            <Content>
                <Card style={{ flex: 0 }}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: `${specificUser.userAvatar}` }} />
                            <Body>
                                <Text>{specificUser.name} </Text>
                                <Text note>Join Date | {specificUser.addedOn}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Image source={{ uri: `${specificUser.userAvatar}` }} style={{ height: 400, width: 460, flex: 1 }} />
                            <Text style  = {{padding: 12}}>
                                <View >
                                    <Text style = {styles.forText}> Age | {specificUser.age} </Text>
                                    <Text style = {styles.forText}> Email | {specificUser.email}</Text>
                                    <Text style = {styles.forText}> LH | </Text>
                                    {specificUser.isBlackListed ? <Text style={styles.forBlock}> User Block By Admin</Text> : <Text style={styles.forNonBlock}> {specificUser.name} have to rights to access books</Text>}
                                </View>
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    </>
}
const styles = StyleSheet.create({
    forBlock: {
        backgroundColor: "#db7273",
        color: "white",
    },
    forNonBlock: {
        backgroundColor: "#93de52",
        color: "white",
    },
    forText: {
        fontSize: 20,
        padding: 5
    }
})