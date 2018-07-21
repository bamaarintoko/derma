import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native'
import {connect} from 'react-redux';
import {Container, Content, Text} from "native-base";
import AppIntro from 'react-native-app-intro';
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
class ScreenIntro extends Component {
    render() {
        return (
            <Container>
                    <AppIntro
                        onSkipBtnClick={()=>this.props.navigation.dispatch({type: 'HOME'})}
                        onDoneBtnClick={()=>this.props.navigation.dispatch({type: 'HOME'})}
                        doneBtnLabel={<Text style={{color:'#FFF', fontSize:25, paddingLeft:20}}>{'   '}Done</Text>}
                    >
                        <View style={[styles.slide,{ backgroundColor: '#013976' }]}>
                            <Image
                                style={{flex: 1}}
                                width={200}
                                source={require('../../Assets/Intro/Assets1.png')}
                                resizeMode={"contain"}
                            />
                        </View>
                        <View style={[styles.slide, { backgroundColor: '#013976' }]}>
                            <Image
                                style={{flex: 1}}
                                width={200}
                                source={require('../../Assets/Intro/Assets2.png')}
                                resizeMode={"contain"}
                            />
                        </View>
                        <View style={[styles.slide,{ backgroundColor: '#013976' }]}>
                            <Image
                                style={{flex: 1}}
                                width={200}
                                source={require('../../Assets/Intro/Assets3.png')}
                                resizeMode={"contain"}
                            />
                        </View>
                    </AppIntro>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenIntro);
