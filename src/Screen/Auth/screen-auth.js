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

let token = "";

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

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
            const user = await GoogleSignin.signIn();
            console.log(user)
        } catch (error) {
            if (error.code === 'CANCELED') {
            } else {
            }
            console.log("===>", error)
        }
    };

    async _getCurrentUser() {
        try {
            const user = await GoogleSignin.currentUserAsync();
            this.setState({user, error: null});
        } catch (error) {
            this.setState({
                error,
            });
        }
    };

    async _configureGoogleSignIn() {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            iosClientId: '', // only for iOS
            webClientId: 'AIzaSyBziBj2umJ0GQqVnZlk0kaKm2OsbwbuYGY', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '', // [Android] specifies an account name on the device that should be used
        }).then((re) => {
            console.log(re)
        });
    };

    onRegisterClick = () => {
        return () => {
            this.props.navigation.navigate('Register')
        }
    };

    onForgotClick = () => {
        return () => {
            this.props.navigation.navigate('ForgetPassword')
        }
    };

    onLoginFacebookClick = () => {
        FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));
        FCM.getFCMToken().then(token_ => {
            token = token_;
        })
        return () => {

            FBLoginManager.loginWithPermissions(["email"], (error, data) => {
                if (!error) {
                    let profil = JSON.parse(data.profile)
                    let data_ = {
                        name: profil.name,
                        photo: "https://graph.facebook.com/" + profil.id + "/picture?type=large"
                    }
                    let params = {
                        par_user_email: profil.email,
                        par_user_name: profil.name,
                        par_user_id: profil.id,
                        par_token: token,
                        par_user_photo: profil.picture.data.url
                    }
                    this.props.dispatch(actLoginFacebook(params, data_));

                } else {
                    console.log("Error: ", data);
                }
            })
        }
    };

    async componentDidMount() {
        await this._configureGoogleSignIn();
        await this._getCurrentUser();
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
                <View style={{height: 50, paddingLeft: 20, justifyContent: 'center'}}>
                    <Button transparent light style={{width: 50}} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color={'#013976'}/>
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
                    <View style={{marginTop: 120}}>
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
                                    onPress={this.onLoginFacebookClick()}>
                                <Icon name="facebook" size={hp('3%')} color={'#FFF'}/>
                            </Button>
                            <Button full info
                                    style={styles.btnGmail}
                                    onPress={this.signIn}
                            >
                                <Icon name="google-plus" size={hp('3%')} color={'#FFF'}/>
                            </Button>
                        </View>
                        <View style={styles.vwRegister}>
                            <View
                                style={styles.vwOnRegister}>
                                <Text style={styles.txtFirstTime}>First time here?</Text>
                                <TouchableWithoutFeedback onPress={this.onRegisterClick()}>
                                    <Text style={styles.txtSignUp}> Sign up</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.vwOnForget}>
                                <TouchableWithoutFeedback onPress={this.onForgotClick()}>
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
        color: '#BDBDBD',
        marginHorizontal: 8,
        fontSize: hp('1.9%')
    },
    vwRegister: {
        flexDirection: 'row', marginTop: 10, alignItems: 'center'
    },
    vwOnRegister: {
        flexDirection: 'row', flex: 1, alignItems: 'center',
    },
    vwOnForget: {
        flex: 1
    },
    txtFirstTime: {
        color: '#013976', fontSize: hp('1.9%')
    },
    txtSignUp: {color: '#013976', fontWeight: 'bold', fontSize: hp('2%')},
    txtForgetPass: {
        color: '#013976',
        fontWeight: 'bold',
        fontSize: hp('2%'),
        alignSelf: 'flex-end'
    },
    vwBtnLogin:{
        flexDirection: 'row', marginTop: 10, alignItems: 'center', width: '100%'
    },
    btnFacebook:{
        width: '50%', backgroundColor: '#3B5998'
    },
    btnGmail:{
        width: '50%', backgroundColor: '#c71610'
    },
    veInputFrame:{
        flexDirection: 'row', alignItems: 'center'
    },
    vwInput:{
        width: '80%'
    },
    vwBtn:{
        width: '20%'
    },
    itmEmail:{
        backgroundColor: '#FFF',
        borderColor: '#013976',
        borderWidth: 2,
        height: hp('7%')
    },
    itmPass:{
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        borderWidth: 2,
        height: hp('7%')
    },
    vwIcon:{
        width: 30, justifyContent: 'center', alignItems: 'center'
    },
    txtInput:{
        fontSize: hp('2.2%'), color: '#013976'
    }
};

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth
    };
}

export default connect(
    mapStateToProps,
)(ScreenAuth);
