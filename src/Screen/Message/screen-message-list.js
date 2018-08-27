import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, List, ListItem, Thumbnail, Left, Body, Right, Text} from 'native-base'
import {StatusBar, View, FlatList} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";
import {sqlToJsISO} from "../../Utils/func";
import Api from "../../Utils/Api";
import TimeAgo from 'react-native-timeago';

const email = [
    {
        id: 6,
        email: 'sinatriohappy.triaji@gmail.com',
        name: 'Happy'
    },
    {
        id: 2,
        email: 'yosafatbama.arintoko@gmail.com',
        name: 'Bama'
    },
    {
        id: 3,
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
    constructor(props) {
        super(props);
        this.state = {
            data_message: [],
            resp_message: "",
            resp_kode: "",
        }
    }

    componentDidMount() {
        let params = {
            par_user_id: this.props.redAuth.data.profile.user_id
        }

        Api._POST('message/get_messages', params)
            .then((response) => {
                console.log(response)
                this.setState({
                    data_message: response.data.data,
                    resp_kode: response.data.kode,
                    resp_message: response.data.message
                })
            }).catch((err) => {
            this.setState({
                data_message: [],
                resp_kode: err.response.status.toString(),
                resp_message: err.message
            })
        })
        // console.log("===>",this.props.redAuth.data.profile.user_id)
    }

    onPressConversation = (email, name, id) => {
        return () => {
            this.props.navigation.navigate('Conversation', {
                email: email,
                id: id,
                name: name
            })
        }
    }

    render() {
        console.log(this.state.resp_kode)
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
                {
                    this.state.resp_kode === "00"
                        ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={this.state.data_message}
                            keyExtractor={(item, index) => '' + index}
                            renderItem={({item}) =>
                                item.user.user_email !== this.props.redAuth.data.profile.user_email
                                    ?
                                    <List>
                                        <ListItem avatar
                                                  onPress={this.onPressConversation(item.user.user_email, item.user.user_name, item.user.user_id)}>
                                            <Left>
                                                <Thumbnail
                                                    source={{uri: item.user.user_photo}}/>
                                            </Left>
                                            <Body>
                                            <Text>{item.user.user_name}</Text>
                                            <Text note>{item.reply.reply}</Text>
                                            </Body>
                                            <Right>
                                                <TimeAgo style={{fontSize: 12}}
                                                         time={sqlToJsISO(item.reply.create_date)}/>
                                            </Right>
                                        </ListItem>
                                    </List>
                                    :
                                    <List>
                                        <ListItem avatar
                                                  onPress={this.onPressConversation(item.from.user_email, item.from.user_name, item.from.user_id)}>
                                            <Left>
                                                <Thumbnail
                                                    source={{uri: item.from.user_photo}}/>
                                            </Left>
                                            <Body>
                                            <Text>{item.from.user_name}</Text>
                                            <Text note>{item.reply.reply}</Text>
                                            </Body>
                                            <Right>
                                                <TimeAgo style={{fontSize: 12}}
                                                         time={sqlToJsISO(item.reply.create_date)}/>
                                            </Right>
                                        </ListItem>
                                    </List>

                            }
                        />
                        :
                        <Text>{this.state.resp_message}</Text>
                }


            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenMessageList);