import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View, FlatList, StatusBar, Dimensions, Image
} from 'react-native';
import { withNavigation } from "react-navigation"
import { Container, Content, Item, Input, Button } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
function mapStateToProps(state) {
    return {

    };
}
const styles = {
    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width,
        flex: 1,
        backgroundColor: 'transparent'
    },

    loadingView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    loadingImage: {
        width: 60,
        height: 60
    }
}

const Slide = props => {
    return (<View style={styles.slide}>
        <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{ uri: props.uri }} />
        {
            !props.loaded && <View style={styles.loadingView}>
            </View>
        }
    </View>)
}
class ScreenHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRedGetColor: true,
            color: '#FFFFFF',
            imgList: [
                'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
                'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
                'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
                'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
            ],
            loadQueue: [0, 0, 0, 0]
        }
        this.loadHandle = this.loadHandle.bind(this)
    }
    loadHandle(i) {
        let loadQueue = this.state.loadQueue
        loadQueue[i] = 1
        this.setState({
            loadQueue
        })
    }
    onBarClick = () => {
        return () => {

            console.log("aaa")
        }
    }
    render() {
        let firstQuery = ""
        return (
            <Container style={{ backgroundColor: this.state.color }}>
                <View style={{ height: 140 }}>
                    <Swiper autoplayTimeout={4} autoplay={true} loadMinimal loadMinimalSize={1} style={styles.wrapper} loop={true}>
                        {
                            this.state.imgList.map((item, i) => <Slide
                                loadHandle={this.loadHandle}
                                loaded={!!this.state.loadQueue[i]}
                                uri={item}
                                i={i}
                                key={i} />)
                        }
                    </Swiper>
                </View>
                <View style={{ height: 50, position: 'absolute', justifyContent: 'center', width: width }}>
                    <Button transparent light style={{ padding: 15 }} onPress={this.onBarClick()}>
                        <Icon name="bars" size={20} color="#FF6F00" />
                    </Button>
                </View>
            </Container>
        );
    }
}
const screen = withNavigation(ScreenHome)
export default connect(
    mapStateToProps,
)(screen);