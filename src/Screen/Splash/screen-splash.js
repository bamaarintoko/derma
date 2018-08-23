import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, StatusBar} from 'react-native'
import {Container, Content, Text, View} from "native-base";
import {actGetSetting} from "./action";

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
        if (this.props.redSetting.status === prevState.initialRedSetting) {
            if (this.props.redSetting.data[0].maintenance !== "0") {
                setTimeout(() => {
                    this.props.redAuth.status_get
                        ?
                        this.props.navigation.dispatch({type: 'HOME'})
                        :
                        this.props.navigation.dispatch({type: 'INTRO'})

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
                        this.props.navigation.dispatch({type: 'HOME'})
                        :
                        this.props.navigation.dispatch({type: 'INTRO'})

                }, 3000)
            }

        }
    }

    componentDidMount() {
        this.props.dispatch(actGetSetting());
    }

    render() {
        console.log("====>",this.state.isMaintenance)
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
        redSetting: state.redSetting
    };
}

export default connect(
    mapStateToProps,
)(SplashScreen);
