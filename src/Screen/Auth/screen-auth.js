import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableWithoutFeedback} from "react-native";
import {Button, Container, Content, Input, Item, Text} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';

class ScreenAuth extends Component {

    onRegisterClick = () => {
        return () => {
            this.props.navigation.navigate('Register')
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFA726'}}>
                <View style={{height: 50, paddingLeft: 20, justifyContent: 'center'}}>
                    <Button transparent light style={{width: 50}} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color={'#FFF'}/>
                    </Button>
                </View>
                <Content style={{padding: 20}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#FFF'}}>Log In</Text>
                    </View>
                    <View style={{marginTop: 120}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: '80%'}}>
                                <Item style={{
                                    backgroundColor: '#FFA726',
                                    borderColor: '#FFF',
                                    borderWidth: 2,
                                    height: 40
                                }}>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon active name='envelope' size={20}/>
                                    </View>
                                    <Input placeholder='email'/>
                                </Item>
                                <Item style={{
                                    backgroundColor: '#FFA726',
                                    borderColor: '#FFA726',
                                    borderWidth: 2,
                                    height: 40
                                }}>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon active name='lock' size={20}/>
                                    </View>
                                    <Input placeholder='password'/>
                                </Item>
                            </View>
                            <View style={{width: '20%'}}>
                                <Button transparent full>
                                    <Icon active name='sign-in' size={40} color={'#FFF'}/>
                                </Button>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row',flex: 1, justifyContent:'center', alignItems: 'center'}}>
                                <Text style={{color: '#FFF', fontSize: 12}}>First time here?</Text>
                                <TouchableWithoutFeedback onPress={this.onRegisterClick()}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 14}}> Sign up</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{flex:1}}>
                                <TouchableWithoutFeedback onPress={this.onRegisterClick()}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 14,alignSelf: 'flex-end'}}> Forgot password</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenAuth);
