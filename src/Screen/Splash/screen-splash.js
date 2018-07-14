import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, StatusBar} from 'react-native'
import {Container, Content, View} from "native-base";

class SplashScreen extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch({type: 'HOME'});
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
    return {};
}

export default connect(
    mapStateToProps,
)(SplashScreen);
