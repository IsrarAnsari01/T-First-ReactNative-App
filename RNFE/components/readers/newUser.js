import React from 'react'
import { Container, Header, Footer, Content, Body, Left, Button, Icon, Title, Text, FooterTab } from 'native-base'
import { Link } from 'react-router-native'
import { View } from 'react-native'
import ReaderEnrollForm from '../homePage/readerEnrollForm'
export default function NewUser() {
    return <Container>
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
                <Title> Enroll yourself </Title>
            </Body>
        </Header>
        <Content>
            <ReaderEnrollForm />
        </Content>
        <Footer>
            <FooterTab />
            <FooterTab>
                <Text style = {{color: "white" , marginTop: 20  }}> LMS Design by IA </Text>
            </FooterTab>
            <FooterTab />
        </Footer>
    </Container>
};
