import React from 'react'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, H2, Container, Header, Right, Content } from 'native-base';
import { Image, View } from 'react-native'
export default function DeverloperProfile() {
    return <Container>
        <Content padder>
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={require("../../Images/myOwnPic.jpg")} />
                        <Body>
                            <Text>Israr Ansari (IA)</Text>
                            <Text note>2001</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={require("../../Images/myOwnPic.jpg")} style={{ height: 400, width: 400, flex: 1 }} />
                        <View>
                            <H2> Name: Israr Mehmood</H2>
                            <Text>
                                I am a professional full stack developer and I am also build a chat system. I also build a sms Site which is
                                STUDENT MANAGEMENT SYSTEM and the other one is BOlGING SITE
                        </Text>
                        </View>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent textStyle={{ color: '#87838B' }}>
                            <Text>Read More</Text>
                        </Button>
                    </Left>
                </CardItem>
                <CardItem>
                    <Icon name="logo-facebook" />
                    <Text>Facebook</Text>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </CardItem>
                <CardItem>
                    <Icon name="logo-instagram" />
                    <Text>Instagram</Text>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </CardItem>
            </Card>
        </Content>


    </Container>
};
