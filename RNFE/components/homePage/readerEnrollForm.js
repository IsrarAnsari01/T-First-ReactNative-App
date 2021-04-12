import React, { useState } from 'react'
import { Container, Content, Form, Item, Input, Label, Picker, Button, Icon, Text, List, ListItem, Card, CardItem, H1, Right, Badge, Spinner, Left, View } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import { useHistory } from 'react-router-native'
import AppSettings from '../../AppSettings'
export default function ReaderEnrollForm() {
    let option = ["Male", "Female", "Shemale"]
    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyyioljla/image/upload";
    const [isFileSelected, setIsFileSelected] = useState(false)
    const [getResponseFromServer, setGetResponseFromServer] = useState(false)
    const [base64Image, setBase64Image] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState(undefined)
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [email, setEmail] = useState("")
    const [userAvatar, setUserAvatar] = useState("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png")
    const history = useHistory();
    function saveNewUser() {
        if (password !== rePassword) {
            alert("Password and Repeat Password does not match try again")
            return
        }
        setGetResponseFromServer(true);
        let base64Img = `data:image/jpg;base64,${base64Image}`;
        let data = {
            "file": base64Img,
            "upload_preset": "wcdlvs5y",
        }
        fetch(CLOUDINARY_URL, { body: JSON.stringify(data), headers: { 'content-type': 'application/json' }, method: 'POST', })
            .then(r => r.json())
            .then(imageInfo => {
                let readersDetails = { name, gender, email, password, age: age.toString(), userAvatar: imageInfo.url, isBlackListed: false }
                fetch(`${AppSettings.BACK_END_HOSTED_SERVER}/readers/add-new`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(readersDetails) })
                    .then(success => {
                        if (success.status) {
                            alert("User Added successfully")
                            history.push("/books", { status: true })
                            cleanFields();
                        }
                    })
            }).catch(err => console.log("Something Went Wrong" + err))
            .finally(() => setGetResponseFromServer(false))
    }
    const cleanFields = () => {
        setName("")
        setGender(undefined)
        setAge("")
        setPassword("")
        setRePassword("")
        setEmail("")
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
            setBase64Image(res.base64)
            setIsFileSelected(true)
        })
    }
    return <Container>
        <Content>
            <Card>
                <CardItem header>
                    <H1> Enroll yourSelf</H1>
                </CardItem>
                <CardItem>
                    <Form >
                        <Item floatingLabel>
                            <Label> Enter your Name </Label>
                            <Input onChangeText={(userName) => setName(userName)} value={name} />
                        </Item>
                        <Item floatingLabel>
                            <Label> Enter your Email </Label>
                            <Input onChangeText={(userEmail) => setEmail(userEmail)} value={email} />
                        </Item>
                        <Item floatingLabel >
                            <Label>Age</Label>
                            <Input onChangeText={(userAge) => setAge(userAge)} value={age} />
                        </Item>
                        <Item floatingLabel >
                            <Label>Password</Label>
                            <Input type="password" onChangeText={(userPass) => setPassword(userPass)} value={password} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Repaet Password</Label>
                            <Input type="password" onChangeText={(userRePass) => setRePassword(userRePass)} value={rePassword} />
                        </Item>
                        <Item picker style={{ padding: 10 }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your Gender"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={gender}
                                onValueChange={(val) => setGender(val)}
                            >
                                <Picker.Item label="Chose Any one" value="null" />
                                {option ? option.map(op => <Picker.Item label={op} value={op} />) : <></>}
                            </Picker>
                        </Item>
                        <Button style={{ marginTop: 10, backgroundColor: "#49bf9a" }} transparent info onPress={() => selectOneFile()}>
                            <Left>
                                <Text style={{ color: "white" }}> Select Your    </Text>
                            </Left>
                            {isFileSelected ? <Right>
                                <Badge><Text>FILE SELECTED</Text></Badge>
                            </Right> : <></>}
                        </Button>
                        <View style={{ margin: 10, display: 'flex', alignItems: 'center' }}>
                            <Button iconLeft block onPress={saveNewUser} block>
                                <Icon name='send' />
                                <Text> Save your information </Text>
                            </Button>
                        </View>
                    </Form>
                </CardItem>
                <List>
                    <ListItem itemDivider>
                        <Text style={{ flex: 1, justifyContent: 'center' }}> OR </Text>
                    </ListItem>
                </List>
                <CardItem footer>
                    <Button block>
                        <Text> Sign in with Google</Text>
                    </Button>
                </CardItem>
                {getResponseFromServer ? <Spinner color='red' /> : <></>}
            </Card>
        </Content>
    </Container>
}
