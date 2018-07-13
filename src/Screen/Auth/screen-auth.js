import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {Button, Container, Content, Input, Item, Text} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import {actLoginFacebook} from "./action";

class ScreenAuth extends Component {

    onRegisterClick = () => {
        return () => {
            this.props.navigation.navigate('Register')
        }
    }

    onLoginFacebookClick = () => {
        return () => {
            FBLoginManager.loginWithPermissions(["email"], (error, data) => {
                if (!error) {
                    let profil = JSON.parse(data.profile)
                    // console.log(profil)
                    let params = {
                        par_user_email: profil.email,
                        par_user_name: profil.name,
                        par_user_id: profil.id,
                        par_user_photo: profil.picture.data.url
                    }
                    this.props.dispatch(actLoginFacebook(params, data.profile));

                } else {
                    console.log("Error: ", data);
                }
            })
        }
    }
    onLogin = () => {
        return () => {

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
                                <Button transparent full onPress={this.onLogin()}>
                                    <Icon active name='sign-in' size={40} color={'#FFF'}/>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.separatorContainer}>
                            <View style={styles.separatorLine}/>
                            <Text style={styles.separatorOr}>Or Login With</Text>
                            <View style={styles.separatorLine}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', width: '100%'}}>
                            <Button full info style={{width: '100%', backgroundColor: '#3B5998'}}
                                    onPress={this.onLoginFacebookClick()}>
                                <Icon name="facebook" size={20} color={'#FFF'}/>
                            </Button>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                            <View
                                style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#FFF', fontSize: 12}}>First time here?</Text>
                                <TouchableWithoutFeedback onPress={this.onRegisterClick()}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 14}}> Sign up</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{flex: 1}}>
                                <TouchableWithoutFeedback onPress={this.onRegisterClick()}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        alignSelf: 'flex-end'
                                    }}> Forgot password</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

let styles = {
    wrapper: {},
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 8
    },
    separatorLine: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        height: StyleSheet.hairlineWidth,
        borderColor: '#FFFFFF'
    },
    separatorOr: {
        color: '#FFFFFF',
        marginHorizontal: 8,
        fontSize: 12
    },
};

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenAuth);
