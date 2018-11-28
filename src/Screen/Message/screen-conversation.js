import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Text, View} from 'native-base'
import {StatusBar} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {GiftedChat, Send} from 'react-native-gifted-chat'
import Spinner from 'react-native-spinkit'

window.navigator.userAgent = 'react-native';

import io from 'socket.io-client/dist/socket.io'
import Api from "../../Utils/Api";

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth
    };
}

// let url = 'http://192.168.43.72:3010/';
let url = 'http://192.168.100.77:3010/';
// let url = 'https://rocky-woodland-93586.herokuapp.com/';
const socket = io('http://localhost:3010/');

// let socket = io.connect();
class ScreenConversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            userId: null,
            isConnecting: true
        }
        this.socket = io.connect(url, {
            transports: ['websocket'],
            reconnect: true
        })
        this.socket.on('message', (message) => {
            console.log("==>", message)
            this.onSetMessage(message)
        });
        this.socket.on('send', (data) => {
            console.log("converation =====>", data)
            // this.onSetMessage(message)
        });

    }

    onSetMessage = (data) => {
        // console.log("onSetMessage===>", data)
        this._storeMessages(data.text)

    }

    _storeMessages = (data) => {
        // console.log("_storeMessages", data)
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, data),
            };
        });

    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state.messages)
    }

    componentDidMount() {
        // this.socket.on('connect', (socket) => {
        //     console.log("====>", this.socket)
        //     this.setState({
        //         isConnecting: false
        //     })
        this.socket.emit('notif', {
            email: this.props.navigation.getParam('email'),
            // email_receiver: this.props.navigation.getParam('email'),
            // email_sender: this.props.redAuth.data.profile.user_email,
            // email_sender: this.props.redAuth.data.profile.user_email
        })
        this.socket.emit('init', {
            senderId: this.props.redAuth.data.profile.user_id + this.props.navigation.getParam('email'),
            receiverId: this.props.navigation.getParam('id') + this.props.redAuth.data.profile.user_email,
            email: this.props.navigation.getParam('email')
        });

        // this.socket.emit('notif', {
        //     // senderId: this.props.redAuth.data.profile.user_id + this.props.navigation.getParam('email'),
        //     // receiverId: this.props.navigation.getParam('id') + this.props.redAuth.data.profile.user_email,
        //     email: this.props.navigation.getParam('email'),
        //     // email_sender: this.props.redAuth.data.profile.user_email,
        // });

        let params = {
            par_conversation_id: this.props.navigation.getParam('conversation_id')
        }
        console.log(params)
        Api._POST('message/get_conversation', params)
            .then((response) => {
                this.setState({
                    messages: response.data.data
                })
                console.log(response.data)
            }).catch((err) => {
            console.log(err)
        })
        // })
        this.socket.on('connect_error', (error) => {
            console.log("error===>", error)
        });
        // console.log(this.props.redAuth.data.profile.user_id + this.props.navigation.getParam('email'))
        // this.setState({
        //     messages: [
        //         {
        //             _id: 1,
        //             text: 'Hello developer',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //                 avatar: 'https://placeimg.com/140/140/any',
        //             },
        //         },
        //         {
        //             _id: 2,
        //             text: 'Hello developer',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //                 avatar: 'https://placeimg.com/140/140/any',
        //             },
        //         }
        //     ],
        // })

        // console.log(this.socket)
        // socket.on('connect',()=>{
        //     console.log(socket.connected)
        // })
        // socket.on('error',()=>{
        //     console.log(socket.error)
        // })

    }

    onSend = () => {
        return (messages = []) => {
            // console.log("-->",messages[0].text)
            // if (!this.state.isConnecting) {

            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }));
            this.socket.emit('message', {
                text: messages,
                senderId: this.props.redAuth.data.profile.user_id + this.props.navigation.getParam('email'),
                receiverId: this.props.navigation.getParam('id') + this.props.redAuth.data.profile.user_email
            })
            this.socket.emit('send', {
                email: this.props.navigation.getParam('email'),
                message : messages,
                from : this.props.redAuth.data.profile.user_email,
                from_name : this.props.navigation.getParam('name'),
                idx:this.props.navigation.getParam('conversation_id'),
                token : this.props.navigation.getParam('token')
                // email_receiver: this.props.navigation.getParam('email'),
                // email_sender: this.props.redAuth.data.profile.user_email,
            });
            let params = {
                par_sender_id: this.props.redAuth.data.profile.user_id,
                par_receiver_id: this.props.navigation.getParam('id'),
                par_text: messages[0].text
            }


            // Api._POST('message/send_message', params)
            //     .then((response) => {
            //         console.log(response)
            //     }).catch((err) => {
            //     console.log(err)
            // })
            // console.log("====>", params)
            // }
        }
    }

    render() {
        return (
            <Container>
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
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend()}
                    user={{
                        _id: this.props.redAuth.data.profile.user_id,
                    }}
                />
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenConversation);