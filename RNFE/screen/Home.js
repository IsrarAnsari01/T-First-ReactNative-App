import React, { useState } from 'react'
import { Container, Header, Left, Body, Segment, Title, Subtitle, Button, Icon, Text, Content, Fab, Footer, FooterTab, Badge } from 'native-base';
import { View } from 'react-native'
import { Row, Grid } from "react-native-easy-grid";
import { Link } from 'react-router-native'
import DeverloperProfile from '../components/homePage/deverloperProfile'
import DeckSwiperForApp from '../components/homePage/DeckSwiperForApp'
import ReaderEnrollForm from '../components/homePage/readerEnrollForm'
export default function Home() {
    const [active, setActive] = useState(true)
    const [active01, setActive01] = useState(false)
    const [active02, setActive02] = useState(false)
    const [numForComp, setNumForComp] = useState(1)
    const [forFabs, setForFabs] = useState(false)
    function selectComponents(num) {
        setNumForComp(num);
    }
    const _renderComponent = () => {
        if (numForComp == 1) {
            return <DeckSwiperForApp />
        } else if (numForComp == 2) {
            return <DeverloperProfile />
        } else if (numForComp == 3) {
            return <ReaderEnrollForm />
        }
    }
    return <>
        <Container>
            <Header style={{ height: 90 }} hasSegment>
                <Body style={{ padding: 20 }}>
                    <Title style={{ fontSize: 20 }}> LMS </Title>
                    <Subtitle style={{ fontSize: 15 }}>Design and Develop by IA</Subtitle>
                </Body>
                <Button transparent>
                    {/* <Icon name='md-more'/> */}
                </Button>
            </Header>
            <Segment style={{ padding: 10 }}>
                <Button first active={active} onPress={() => {
                    setActive(!active)
                    selectComponents(1)
                }}>
                    <View>
                        <Text> Total Books </Text>
                    </View>
                </Button>
                <Button active={active01} onPress={() => {
                    setActive01(!active01)
                    setNumForComp(2)
                }}>
                    <View>
                        <Text> About Developer </Text>
                    </View>
                </Button>
                <Button last active={active02} onPress={() => {
                    setActive02(!active02)
                    setNumForComp(3)
                }}>
                    <View>
                        <Text> Enroll yourSelf </Text>
                    </View>
                </Button>
            </Segment>
            <Grid>
                <Row size={95}>
                    <Content padder>
                        {_renderComponent()}
                    </Content>
                </Row>
                <Row size={5}>

                    <View style={{ flex: 1 }}>
                        <Fab
                            active={forFabs}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: '#5067FF' }}
                            position="bottomRight"
                            onPress={() => setForFabs(!forFabs)}>
                            <Icon name="share" />
                            <Button style={{ backgroundColor: '#34A34F' }}>
                                <Icon name="logo-whatsapp" />
                            </Button>
                            <Button style={{ backgroundColor: '#3B5998' }}>
                                <Icon name="logo-facebook" />
                            </Button>
                            <Button style={{ backgroundColor: '#E1306C' }}>
                                <Icon name="logo-instagram" />
                            </Button>
                        </Fab>
                    </View>
                </Row>
            </Grid>
            <Footer>
                <FooterTab>
                    <Button badge vertical>
                        <Link to='/books'>
                            <View>
                                <Badge><Text>2</Text></Badge>
                                <Icon name="bookmarks" />
                                <Text>Total Books</Text>
                            </View>
                        </Link>
                    </Button>
                    <Button vertical>
                        <Link to ='/totalUser'>
                            <View>
                                <Icon active name="people" />
                                <Text>Total Readers</Text>
                            </View>
                        </Link>
                    </Button>
                    <Button vertical>
                        <Icon name="send" />
                        <Text>Lenders</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    </>
}
