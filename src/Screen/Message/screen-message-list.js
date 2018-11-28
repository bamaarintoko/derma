import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Badge, List, ListItem, Thumbnail, Left, Body, Right, Text} from 'native-base'
import {StatusBar, View, FlatList} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";
import {sqlToJsISO} from "../../Utils/func";
import Api from "../../Utils/Api";
import io from 'socket.io-client/dist/socket.io'
import TimeAgo from 'react-native-timeago';
import {RESET_MESSAGE} from "../../Utils/Constant";
import Spinner from "react-native-spinkit";
// let url = 'https://rocky-woodland-93586.herokuapp.com/';
// let url = 'http://192.168.43.72:3010/';
let url = 'http://192.168.100.77:3010/';
let data_ = [];


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth,
        redMessage: state.redMessage
    };
}

class ScreenMessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_message: [],
            resp_message: "",
            resp_kode: "",
            initialRedMessage: true,
            isConnecting: true,
            from: '',
            message: '',
            isUpdate: false
        };
        this.socket = io.connect(url, {
            transports: ['websocket'],
            reconnect: true
        });
        this.socket.on('send', (data) => {
            console.log("===============>", data.message.length)
            this.setState({
                message: data.message[0].text,
                from: data.from,
                isUpdate: true
            });
            for (let key in data_) {
                // console.log(data_[key]);
                if (data_[key].conversation_id === data.idx) {
                    console.log("data_", parseInt(data_[key].read_count));
                    console.log("length", data.message.length + parseInt(data_[key].read_count));
                    data_[key].reply.create_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    data_[key].read_count = parseInt(data_[key].read_count);
                    data_[key].read_count += 1;

                }
            }
            this.setState(this.state)
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("cdup",this.props.redMessage)
        data_.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.reply.create_date) - new Date(a.reply.create_date);
        });
        if (this.state.isUpdate) {
            if (this.props.redMessage.status_get) {
                this.setState({
                    data_message: this.props.redMessage.data,
                    resp_message: this.props.redMessage.message,
                    resp_kode: this.props.redMessage.kode,
                    isUpdate: false
                })
            }
            // console.log('asd', this.state.from)
        }
    }

    componentDidMount() {
        this.socket.emit('notif', {
            email_: this.props.redAuth.data.profile.user_email,
        });
        this.socket.on('connect', (socket) => {
            this.setState({
                isConnecting: false
            })
        });
        if (this.props.redMessage.status_get) {
            data_ = this.props.redMessage.data;
            this.setState({
                data_message: this.props.redMessage.data,
                resp_message: this.props.redMessage.message,
                resp_kode: this.props.redMessage.kode
            })
        }
    }

    onPressConversation = (email, name, id, conversation_id, idx, reg_id) => {
        return () => {

            this.props.navigation.navigate('Conversation', {
                email: email,
                id: id,
                name: this.props.redAuth.data.data.name,
                conversation_id: conversation_id,
                idx: idx,
                token:reg_id
            })
        }
    };

    render() {
        data_.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.reply.create_date) - new Date(a.reply.create_date);
        });
        console.log("=================>", data_)
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
                        {
                            this.state.isConnecting
                                ?
                                <Text>Connecting...</Text>
                                :
                                <Text>Messages</Text>
                        }
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                </View>
                {
                    this.state.resp_kode === "00"
                        ?
                        data_.map((item, k) => {
                            return (
                                <View key={k}>{
                                    item.user.user_email !== this.props.redAuth.data.profile.user_email
                                        ?
                                        <List>
                                            <ListItem avatar
                                                      onPress={this.onPressConversation(item.user.user_email, item.user.user_name, item.user.user_id, item.conversation_id, k,item.user.user_reg_id)}>
                                                <Left>
                                                    <Thumbnail
                                                        source={{uri: item.user.user_photo}}/>
                                                </Left>
                                                <Body>
                                                <Text>{item.user.user_name}</Text>
                                                <Text note>
                                                    {
                                                        this.state.from === item.user.user_email
                                                            ?
                                                            this.state.message
                                                            :
                                                            item.reply.reply
                                                    }
                                                    {/*{item.reply.reply}*/}
                                                </Text>

                                                </Body>
                                                <Right>
                                                    <TimeAgo style={{fontSize: 12}}
                                                             time={sqlToJsISO(item.reply.create_date)}/>
                                                    {
                                                        parseInt(item.read_count) > 0
                                                        &&
                                                        <Badge info>
                                                            <Text>{item.read_count}</Text>
                                                        </Badge>
                                                    }

                                                </Right>
                                            </ListItem>
                                        </List>
                                        :
                                        <List>
                                            <ListItem avatar
                                                      onPress={this.onPressConversation(item.from.user_email, item.from.user_name, item.from.user_id, item.conversation_id, k)}>
                                                <Left>
                                                    <Thumbnail
                                                        source={{uri: item.from.user_photo}}/>
                                                </Left>
                                                <Body>
                                                <Text>{item.from.user_name}</Text>
                                                <Text note>{
                                                    this.state.from === item.user.user_email
                                                        ?
                                                        this.state.message
                                                        :
                                                        item.reply.reply
                                                }</Text>

                                                </Body>
                                                <Right>
                                                    <TimeAgo style={{fontSize: 12}}
                                                             time={sqlToJsISO(item.reply.create_date)}/>
                                                    <View>
                                                        {
                                                            parseInt(item.read_count) > 0
                                                            &&
                                                            <Badge info style={{width: 23, height: 23}}>
                                                                <Text style={{fontSize: 13}}>{item.read_count}</Text>
                                                            </Badge>
                                                        }
                                                    </View>
                                                </Right>
                                            </ListItem>
                                        </List>
                                }</View>
                            )
                        })

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