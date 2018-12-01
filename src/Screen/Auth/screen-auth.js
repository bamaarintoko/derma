import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {Button, Container, Content, Input, Item, Text} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import {actLogin, actLoginFacebook} from "./action";
import md5 from 'crypto-js/md5';
import FCM from "react-native-fcm";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {GoogleSignin} from 'react-native-google-signin';
import {styles} from './style'

let token = "";
import {
    signIn,
    _getCurrentUser,
    _configureGoogleSignIn,
    onRegisterClick,
    onForgotClick,
    onLoginFacebookClick, onLogin
} from './presenter'

class ScreenAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: "",
            user_password: "",
            initialRedAuth: true,
            isAuthLoading: false
        }
    }


    // onLoginFacebookClick = () => {
    //     FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));
    //     FCM.getFCMToken().then(token_ => {
    //         token = token_;
    //     })
    //     return () => {
    //
    //         FBLoginManager.loginWithPermissions(["email"], (error, data) => {
    //             if (!error) {
    //                 let profil = JSON.parse(data.profile)
    //                 let data_ = {
    //                     name: profil.name,
    //                     photo: "https://graph.facebook.com/" + profil.id + "/picture?type=large"
    //                 }
    //                 let params = {
    //                     par_user_email: profil.email,
    //                     par_user_name: profil.name,
    //                     par_user_id: profil.id,
    //                     par_token: token,
    //                     par_user_photo: profil.picture.data.url
    //                 }
    //                 this.props.dispatch(actLoginFacebook(params, data_));
    //
    //             } else {
    //                 console.log("Error: ", data);
    //             }
    //         })
    //     }
    // };

    async componentDidMount() {
        await _configureGoogleSignIn();
        await _getCurrentUser();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedAuth === this.props.redAuth.status) {
            if (this.props.redAuth.status_get) {
                this.props.dispatch({type: 'RESET'})
            } else {
                Snackbar.show({
                    title: this.props.redAuth.message,
                    duration: Snackbar.LENGTH_LONG,
                });
                this.setState({
                    isAuthLoading: false
                })
                this.props.dispatch({type: 'LOGIN_RESET'})
            }
        }
    };

    onChangeText = (key) => {
        return (e) => {
            let state = {}
            state[key] = e
            this.setState(state);
        }
    };

    onLogin = () => {
        // FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));
        FCM.getFCMToken().then(token_ => {
            token = token_
        })
        return () => {
            if (this.state.user_password !== "" && this.state.user_email !== "") {
                let params = {
                    par_user_password: md5(this.state.user_password).toString(),
                    par_user_email: this.state.user_email,
                    par_token: token
                }
                this.setState({
                    isAuthLoading: true
                })
                this.props.dispatch(actLogin(params))
            }
        }
    };

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <View style={{height: hp('8%'), paddingLeft: 20, justifyContent: 'center'}}>
                    <Button transparent light style={{width: 50}} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={hp('3%')} color={'#013976'}/>
                    </Button>
                </View>
                <Modal position={"center"}
                       style={{width: 300, height: 100, justifyContent: 'center', alignItems: 'center'}}
                       swipeToClose={false}
                       isOpen={this.state.isAuthLoading}
                       backdropPressToClose={false}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner type={'ChasingDots'} color={"#FFF"}/>
                        <Text>Please wait</Text>
                    </View>
                </Modal>
                <Content style={{padding: 20}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: hp('4%'), color: '#013976'}}>Log In</Text>
                    </View>
                    <View style={{marginTop: hp('20%')}}>
                        <View style={styles.veInputFrame}>
                            <View style={styles.vwInput}>
                                <Item style={styles.itmEmail}>
                                    <View style={styles.vwIcon}>
                                        <Icon active name='envelope' size={hp('3%')}/>
                                    </View>
                                    <Input onChangeText={this.onChangeText('user_email')}
                                           style={styles.txtInput} autoCapitalize={"none"}
                                           keyboardType={'email-address'} placeholder='email'/>
                                </Item>
                                <Item style={styles.itmPass}>
                                    <View style={styles.vwIcon}>
                                        <Icon active name='lock' size={hp('3%')}/>
                                    </View>
                                    <Input onChangeText={this.onChangeText('user_password')}
                                           style={styles.txtInput} autoCapitalize={"none"}
                                           secureTextEntry={true} placeholder='password'/>
                                </Item>
                            </View>
                            <View style={styles.vwBtn}>
                                <Button transparent full onPress={this.onLogin()}>
                                    <Icon active name='sign-in' size={40} color={'#013976'}/>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.separatorContainer}>
                            <View style={styles.separatorLine}/>
                            <Text style={styles.separatorOr}>Or Login With</Text>
                            <View style={styles.separatorLine}/>
                        </View>
                        <View style={styles.vwBtnLogin}>
                            <Button full info style={styles.btnFacebook}
                                    onPress={onLoginFacebookClick(this.props)}>
                                <Icon name="facebook" size={hp('3%')} color={'#FFF'}/>
                            </Button>
                            <Button full info
                                    style={styles.btnGmail}
                                    onPress={signIn}
                            >
                                <Icon name="google-plus" size={hp('3%')} color={'#FFF'}/>
                            </Button>
                        </View>
                        <View style={styles.vwRegister}>
                            <View
                                style={styles.vwOnRegister}>
                                <Text style={styles.txtFirstTime}>First time here?</Text>
                                <TouchableWithoutFeedback onPress={onRegisterClick(this.props)}>
                                    <Text style={styles.txtSignUp}> Sign up</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.vwOnForget}>
                                <TouchableWithoutFeedback onPress={onForgotClick(this.props)}>
                                    <Text style={styles.txtForgetPass}> Forgot password</Text>
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
    return {
        redAuth: state.redAuth
    };
}

export default connect(
    mapStateToProps,
)(ScreenAuth);
