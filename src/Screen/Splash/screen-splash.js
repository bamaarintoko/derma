import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, StatusBar} from 'react-native'
import {Container, Content, Text, View} from "native-base";
import {actGetMessage, actGetSetting} from "./action";
import FCM, {FCMEvent} from 'react-native-fcm'
import Api from "../../Utils/Api";
import {StackActions,NavigationActions} from 'react-navigation'

const resetHome = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Menu'})],
});
const resetIntro = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Intro'})],
});
class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRedSetting: true,
            isMaintenance: false,
            message: ''
        }
    }


    componentDidUpdate(prevProps, prevState) {

        console.log("===>",this.props.redAuth)
        if (this.props.redSetting.status === prevState.initialRedSetting) {
            if (this.props.redAuth.status_get){

                FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));
                FCM.getFCMToken().then(token => {
                    let params = {
                        par_user_id : this.props.redAuth.data.profile.user_id,
                        par_token:token
                    }
                    Api._POST('auth/update_token',params)
                        .then((response) => {
                            // console.log(response)
                        }).catch((err) => {
                        // console.log(err)
                    })
                    // store fcm token in your server
                });
            }
            if (this.props.redSetting.data[0].maintenance !== "0") {
                setTimeout(() => {
                    this.props.redAuth.status_get
                        ?
                        this.props.navigation.dispatch(resetHome)
                        :
                        this.props.navigation.dispatch(resetIntro)

                }, 3000)
                // this.setState({
                //     isMaintenance: true,
                //     message: "Sorry we are under maintenance :)"
                // })
                // this.props.dispatch({type: 'RESET_SETTING'})
            } else {
                setTimeout(() => {
                    this.props.redAuth.status_get
                        ?
                        this.props.navigation.dispatch(resetHome)
                        :
                        this.props.navigation.dispatch(resetIntro)

                }, 3000)
            }

        }
    }

    componentDidMount() {
        // console.log(this.props.redAuth)

        if (this.props.redAuth.status_get){
            let params = {
                par_user_id: this.props.redAuth.data.profile.user_id
            }
            this.props.dispatch(actGetMessage(params))
        }
        this.props.dispatch(actGetSetting());
    }

    render() {
        // console.log("====>",this.state.isMaintenance)
        return (
            <Container>
                <StatusBar backgroundColor="#013976"/>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'#FFF',
                    height: '100%',
                }}>
                    <Image
                        style={{flex: 1}}
                        width={200}
                        source={require('../../Assets/splash.png')}
                        resizeMode={"contain"}
                    />
                    {
                        this.state.isMaintenance
                        &&
                        <Text style={{color:'#013976'}}>{this.state.message}</Text>
                    }
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth,
        redSetting: state.redSetting,
        redMessage: state.redMessage
    };
}

export default connect(
    mapStateToProps,
)(SplashScreen);
