import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, View} from 'native-base'
import {StatusBar} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {GiftedChat} from 'react-native-gifted-chat'

function mapStateToProps(state) {
    return {};
}

class ScreenConversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: []
        }
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend = () => {
        return (messages = []) => {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }))
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
                        _id: 1,
                    }}
                />
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenConversation);