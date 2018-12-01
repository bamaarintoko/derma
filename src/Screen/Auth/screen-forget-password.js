import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text} from "native-base";
import {View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modalbox';
import Api from "../../Utils/Api";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {styles} from './style'

class ScreenForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            isAuthLoading: false
        }
    }

    onChangeText = (key) => {
        return (e) => {
            let state = {}
            state[key] = e
            this.setState(state);
        }
    }
    onSendPress = () => {
        return () => {
            this.setState({
                isAuthLoading: true
            })
            if (this.state.user_email.length > 0) {

                let params = {
                    par_user_email: this.state.user_email
                }
                Api._POST('auth/forget_password', params)
                    .then((response) => {
                        this.setState({
                            isAuthLoading: false,
                            user_email: ''
                        })
                        Snackbar.show({
                            title: response.data.message,
                            duration: Snackbar.LENGTH_LONG,
                        });
                    }).catch((err) => {
                    this.setState({
                        isAuthLoading: false
                    })
                    Snackbar.show({
                        title: err.message,
                        duration: Snackbar.LENGTH_LONG,
                    });
                })
            }
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <View style={styles.header}>
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
                        <Spinner type={'ChasingDots'} color={"#013976"}/>
                        <Text>Please wait</Text>
                    </View>
                </Modal>
                <Content style={{padding: 20}}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: hp('4%'), color: '#013976'}}>Recovery
                            Password</Text>
                    </View>
                    <View style={{marginTop: hp('20%')}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: '100%'}}>
                                <Item style={{
                                    backgroundColor: '#FFF',
                                    borderColor: '#013976',
                                    borderWidth: 2,
                                    height: hp('7%')
                                }}>
                                    <View style={{width: 30, justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon active name='envelope' size={hp('3%')}/>
                                    </View>
                                    <Input value={this.state.user_email} onChangeText={this.onChangeText('user_email')}
                                           style={styles.txtInput} autoCapitalize={"none"}
                                           keyboardType={'email-address'} placeholder='email'/>
                                </Item>
                            </View>
                        </View>
                        <Button onPress={this.onSendPress()} full bordered style={styles.btn}>
                            <Text style={{color: '#FFF',fontSize: hp('2%')}}>Send Email</Text>
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
)(ScreenForgetPassword);
