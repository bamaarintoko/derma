import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, List, ListItem, Thumbnail, Left, Body, Right, Text} from 'native-base'
import {StatusBar, View, FlatList} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";
import {sqlToJsISO} from "../../Utils/func";

const email = [
    {
        id:6,
        email: 'sinatriohappy.triaji@gmail.com',
        name: 'Happy'
    },
    {
        id:2,
        email: 'yosafatbama.arintoko@gmail.com',
        name: 'Bama'
    },
    {
        id:3,
        email: 'jonis8729@gmail.com',
        name: 'John Wick'
    }
]

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth
    };
}

class ScreenMessageList extends Component {
    componentDidMount() {
        console.log("===>",this.props.redAuth.data.profile.user_email)
    }

    onPressConversation = (email,name,id)=>{
        return ()=>{
            this.props.navigation.navigate('Conversation', {
                email: email,
                id: id,
                name:name
            })
        }
    }
    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <StatusBar backgroundColor="#013976"/>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    backgroundColor: '#FFF',
                    borderBottomColor: '#BDBDBD',
                    borderBottomWidth: 1
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button full transparent light onPress={() => this.props.navigation.goBack()}>
                            <Icon color={'#000000'} size={20}
                                  name="arrow-left"/>
                        </Button>
                    </View>
                    <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={email}
                    keyExtractor={(item, index) => '' + index}
                    renderItem={({item}) =>
                        item.email !== this.props.redAuth.data.profile.user_email
                        &&
                        <List>
                            <ListItem avatar onPress={this.onPressConversation(item.email, item.name, item.id)}>
                                <Left>
                                    <Thumbnail
                                        source={{uri: 'http://debu.mlskoding.com/public/user/4115-1532421046.jpeg'}}/>
                                </Left>
                                <Body>
                                <Text>{item.name}</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Text note>3:43 pm</Text>
                                </Right>
                            </ListItem>
                        </List>

                    }
                />

            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenMessageList);