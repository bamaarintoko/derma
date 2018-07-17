import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    View, StatusBar, Dimensions, Image, FlatList
} from 'react-native';
import {withNavigation} from "react-navigation"
import {Container, Content} from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper'
import {Donate} from '../../Components/Donate'
import {actGetListReserve} from "./action";
import {sqlToJsISO} from "../../Utils/func";
import moment from 'moment';
import "moment/locale/en-au";
const {width} = Dimensions.get('window')

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth,
        redGetListReserve: state.redGetListReserve,
    };
}

const styles = {
    wrapper: {},

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
        <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri: props.uri}}/>
        {
            !props.loaded && <View style={styles.loadingView}>
            </View>
        }
    </View>)
}

class ScreenHome extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({tintColor}) => {
            return <Icon name="home" size={20} color={tintColor}/>;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            initialRedGetListReserve: true,
            color: '#FFFFFF',
            imgList: [
                'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
                'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
                'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
                'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
            ],
            loadQueue: [0, 0, 0, 0],
            data: []
        }
        // this.loadHandle = this.loadHandle.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(actGetListReserve());
        console.log(sqlToJsISO("2018-07-16 20:17:35"))
        // console.log(JSON.parse(this.props.redAuth.data).picture)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedGetListReserve === this.props.redGetListReserve.status) {
        console.log(this.props.redGetListReserve)
            this.setState({
                data: this.props.redGetListReserve.data
            })
            this.props.dispatch({type: "RESET_RESERVE"})
        }
    }

    loadHandle = (i) => {
        return () => {

            let loadQueue = this.state.loadQueue
            loadQueue[i] = 1
            this.setState({
                loadQueue
            })
        }
    }

    onBarClick = () => {
        return () => {
            this.props.navigation.openDrawer()
        }
    }

    render() {
        // console.log(this.state.data)
        let firstQuery = ""
        return (
            <Container style={{backgroundColor: this.state.color}}>
                <StatusBar backgroundColor="#013976"/>
                <View>
                    <View style={{height: 120}}>
                        <Swiper activeDotColor={"#FFB300"} autoplayTimeout={4} autoplay={true} loadMinimal
                                loadMinimalSize={1} style={styles.wrapper} loop={true}>
                            {
                                this.state.imgList.map((item, i) => <Slide
                                    loadHandle={this.loadHandle()}
                                    loaded={!!this.state.loadQueue[i]}
                                    uri={item}
                                    i={i}
                                    key={i}/>)
                            }
                        </Swiper>
                    </View>
                    <View style={{height: 70, backgroundColor: '#013976', margin: 5, borderRadius: 5}}>

                    </View>
                </View>
                <Content style={{marginBottom: 10}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={(item, index) => '' + index}
                        renderItem={({item}) =>

                            <Donate uri={item.user_photo}
                                    name={item.user_name}
                                    reserve_title={item.reserve_title}
                                    reserve_description={item.reserve_description}
                                    reserve_end_date={item.reserve_end_date}
                                    create_date={sqlToJsISO(item.reserve_create_date)}/>
                        }
                    />

                </Content>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenHome);