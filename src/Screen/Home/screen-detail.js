import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Text, Thumbnail, View} from "native-base";
import {StatusBar} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from "../../Utils/Api";
import TimeAgo from 'react-native-timeago';

class ScreenDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_photo: '',
            user_name: '',
            create_date: '',
            title : '',
            description:'',
            img : []
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
                    title:response.data.result.reserve.reserve_title,
                    description:response.data.result.reserve.reserve_description,
                    img : response.data.result.image
                })
                console.log(response)
            }).catch((err) => {
            console.log(err)
        })
    }

    render() {
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
                <Content style={{backgroundColor: '#FFF', padding: 5}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <Thumbnail source={{uri: this.state.user_photo}}/>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize: 12}}>{this.state.user_name}</Text>
                            <TimeAgo style={{fontSize: 12}} time={this.state.create_date}/>
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:14, fontWeight:'bold'}}>{this.state.title}</Text>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={{fontSize:14}}>{this.state.description}</Text>
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
