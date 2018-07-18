import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, StatusBar} from 'react-native'
import {Container, Content, View} from "native-base";

class SplashScreen extends Component {

    componentDidMount() {
        console.log(this.props.redAuth)
        setTimeout(() => {
            this.props.redAuth.status_get
                ?
                this.props.navigation.dispatch({type: 'HOME'})
                :
                this.props.navigation.dispatch({type: 'INTRO'})

        }, 3000)
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#013976"/>
                <Content style={{backgroundColor: '#013976'}}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}>
                        <Image
                            style={{flex: 1}}
                            width={200}
                            source={require('../../Assets/splash.png')}
                            resizeMode={"contain"}
                        />
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
)(SplashScreen);
