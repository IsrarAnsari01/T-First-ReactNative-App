import React, { useState } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Card, CardItem, Button, Body, Title, Left, Icon, Picker, Text, Right, Badge, Textarea, Spinner } from 'native-base';
import { Link } from 'react-router-native'
import { View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import AppSettings from '../../AppSettings'
export default function BookForm() {
    let option = ["Comedy", "Entertainment", "Action", "Programing"]
    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyyioljla/image/upload";
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [genre, setGenre] = useState(undefined)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [coverImage, setFilePath] = useState('');
    const [tagLine, setTagLine] = useState('')
    function saveNewBook() {
        setGetResponseFromServer(true);
        let base64Img = `data:image/jpg;base64,${coverImage}`;
        let data = {
            "file": base64Img,
            "upload_preset": "wcdlvs5y",
        }
        fetch(CLOUDINARY_URL, { body: JSON.stringify(data), headers: { 'content-type': 'application/json' }, method: 'POST', })
            .then(r => r.json())
            .then(imageInfo => {
                let bookDetails = { title, author, tagLine, genre, coverImageURL: imageInfo.url }
                fetch(`${AppSettings.BACK_END_HOSTED_SERVER}/books`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(bookDetails) })
                    .then(success => {
                        if(success.status) {
                            alert("Book Added successfully")
                        }
                        cleanFields();
                    })
            }).catch(err => console.log("Something Went Wrong" + err))
            .finally(() => setGetResponseFromServer(false))
    }
    function cleanFields() {
        setGenre(undefined)
        setTitle('')
        setAuthor('')
        setIsFileSelected(false)
        setFilePath('')
        setTagLine('')
    }
    const selectOneFile = async () => {
        let options = {
            mediaType: "photo",
            includeBase64: true,
            maxWidth: 460,
            maxHeight: 200,
            quality: 1,
            saveToPhotos: true,
        };
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                alert("Something went Wrong in Picking Image");
                return
            }
            else if (res.errorMessage) {
                alert("Error In picking Image", + res.errorMessage)
            }
            setFilePath(res.base64)
            setIsFileSelected(true)
        })
    }
    return <>
        <Container>
            <Header style={{ backgroundColor: "#49bf9a" }}>
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
                    <Title>Add New Book</Title>
                </Body>
            </Header>
            <Content padder>
                <Card>
                    <CardItem header style={{ backgroundColor: "#49bf9a" }}>
                        <Title> Add New Book </Title>
                    </CardItem>
                    <Form>
                        <Item fixedLabel>
                            <Label>Title</Label>
                            <Input onChangeText={(text) => setTitle(text)} value={title} />
                        </Item>
                        <Item fixedLabel >
                            <Label>Author</Label>
                            <Input onChangeText={(text) => setAuthor(text)} value={author} />
                        </Item>
                        <Item picker style={{ padding: 10 }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select Book Genra"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={genre}
                                onValueChange={(val) => setGenre(val)}
                            >
                                <Picker.Item label="Chose Any one" value="null" />
                                {option? option.map(op => <Picker.Item label= {op} value= {op} />): <></>}
                            </Picker>
                        </Item>
                        <Button style={{ marginTop: 10, backgroundColor: "#49bf9a" }} transparent info onPress={() => selectOneFile()}>
                            <Text style={{ color: "white" }}> Select Cover Image </Text>
                            {isFileSelected ? <Right>
                                <Badge><Text>FILE SELECTED</Text></Badge>
                            </Right> : <></>}
                        </Button>
                        <Textarea rowSpan={5} bordered placeholder="Enter the Tag Line of the Book" value={tagLine} onChangeText={(text) => setTagLine(text)} />
                    </Form>
                    <CardItem footer>
                        <Button style={{ backgroundColor: "#5c706a" }} onPress={saveNewBook}>
                            <Text> Save new Book</Text>
                        </Button>
                    </CardItem>
                </Card>
                {getResponseFromServer ? <Spinner color='red' /> : <></>}
            </Content>
        </Container>
    </>
}
