import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Text, Thumbnail, View} from "native-base";
import {StatusBar, Dimensions} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from "../../Utils/Api";
import TimeAgo from 'react-native-timeago';
import Carousel from 'react-native-snap-carousel';
import Image from 'react-native-scalable-image';
import moment from 'moment';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

class ScreenDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_photo: '',
            user_name: '',
            create_date: '',
            title: '',
            description: '',
            img: [],
            address: '',
            location: '',
            data: [],
            endDonation:''
        }
    }

    componentDidMount() {
        let params = {
            par_reserve_id: this.props.navigation.getParam('reserve_id')
        }
        console.log(this.props.navigation.getParam('img'))
        this.setState({
            user_photo: this.props.navigation.getParam('img'),
            user_name: this.props.navigation.getParam('name'),
            create_date: this.props.navigation.getParam('cd'),
        })
        Api._POST('reserve/detail_reserve', params)
            .then((response) => {
                this.setState({
                    title: response.data.result.reserve.reserve_title,
                    description: response.data.result.reserve.reserve_description,
                    address: response.data.result.reserve.reserve_address,
                    img: response.data.result.image,
                    location: response.data.result.reserve.reserve_province + ", " + response.data.result.reserve.reserve_district + ", " + response.data.result.reserve.reserve_sub_district,
                    data: JSON.parse(response.data.result.reserve.reserve_category),
                    endDonation:moment(response.data.result.reserve.reserve_end_date).format('LL')
                })
                console.log(response)
            }).catch((err) => {
            console.log(err)
        })
    }

    _renderItem({item, index}) {
        return (
            <View style={{backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    style={{flex: 1}}
                    height={300}

                    source={{isStatic: true, uri: item.media_value}}/>
            </View>
        );
    }

    render() {
        console.log(this.state.data)
        return (
            <Container>
                <StatusBar backgroundColor="#013976"/>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    backgroundColor: '#FFF',
                    borderBottomColor: '#BDBDBD',
                    borderBottomWidth: 1
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button full transparent light onPress={() => this.props.navigation.goBack()}>
                            <Icon color={'#000000'} size={20}
                                  name="arrow-left"/>
                        </Button>
                    </View>
                    <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>

                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>


                    </View>
                </View>
                <Content style={{backgroundColor: '#FFF', padding: 5, paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <Thumbnail source={{uri: this.state.user_photo}}/>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize: 12}}>{this.state.user_name}</Text>
                            <TimeAgo style={{fontSize: 12}} time={this.state.create_date}/>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{this.state.title}</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Carousel
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            data={this.state.img}
                            renderItem={this._renderItem}
                            sliderWidth={itemWidth}
                            itemWidth={200}
                        />
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 14}}>{this.state.description}</Text>
                    </View>
                    <View style={{marginTop: 15, marginBottom: 10}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>What we need :</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width:'20%'}}>
                                <Text style={{fontSize:12, fontWeight:'bold'}}>Quantity</Text>
                            </View>
                            <View style={{width:'80%'}}>
                                <Text style={{fontSize:12, fontWeight:'bold'}}>Category</Text>
                            </View>
                        </View>
                        {
                            this.state.data.map((v, k) => {
                                return (
                                    <View key={k} style={{flexDirection: 'row'}}>
                                        <View style={{width:'20%'}}>
                                            <Text style={{fontSize: 12}}>{v.count}</Text>
                                        </View>
                                        <View style={{width:'80%'}}>
                                            <Text style={{fontSize: 12}}>{v.value}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Address :</Text>
                        <Text style={{fontSize: 12,}}>{this.state.address}</Text>
                        <Text style={{fontSize: 12,}}>{this.state.location}</Text>
                    </View>
                    <View style={{marginTop: 10, marginBottom: 10}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>End donation :</Text>
                        <Text style={{fontSize: 12,}}>{this.state.endDonation}</Text>
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
)(ScreenDetail);
