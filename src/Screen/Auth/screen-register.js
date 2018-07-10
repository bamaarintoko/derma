import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text, View} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
class ScreenRegister extends Component {
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
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#FFF'}}>Create Account</Text>
                    </View>
                    <View style={{marginTop: 80, alignItems: 'center'}}>
                        <Item style={{backgroundColor: '#FFA726', borderColor: '#FFF', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='user' size={20}/>
                            </View>
                            <Input placeholder='name'/>
                        </Item>
                        <Item style={{backgroundColor: '#FFA726', borderColor: '#FFF', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='envelope' size={20}/>
                            </View>
                            <Input placeholder='email'/>
                        </Item>
                        <Item style={{backgroundColor: '#FFA726', borderColor: '#FFF', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='lock' size={20}/>
                            </View>
                            <Input placeholder='password'/>
                        </Item>
                        <Item style={{backgroundColor: '#FFA726', borderColor: '#FFF', borderWidth: 2}}>
                            <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon active name='lock' size={20}/>
                            </View>
                            <Input placeholder='confirm password'/>
                        </Item>
                        <Button full rounded info style={{marginTop: 10}}>
                            <Text>Create</Text>
                        </Button>
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
)(ScreenRegister);
