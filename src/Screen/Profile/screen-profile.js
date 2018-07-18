import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Thumbnail, Text, Container, Content, Button} from 'native-base';
import {FlatList, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Reserve} from "../../Components/Content";
import {actGetListReserve} from "./action";
import {redGetListReserveUser} from "../../Reducers/reserveReducers";
import {sqlToJsISO} from "../../Utils/func";

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth,
        redGetListReserveUser: state.redGetListReserveUser
    };
}

const styles = StyleSheet.create({

    TrapezoidStyle: {

        width: '100%',
        height: 0,
        borderBottomColor: "#1565C0",
        borderTopWidth: 50,
        borderTopColor: '#1565C0',
        borderLeftWidth: 400,
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    TrapezoidStyle_: {

        width: '100%',
        height: 0,
        borderBottomColor: "#013976",
        borderTopWidth: 50,
        borderTopColor: '#013976',
        borderLeftWidth: 0,
        position: 'absolute',
        borderRightWidth: 400,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    dd: {

        width: '100%',
        height: 120,
        backgroundColor: '#1565C0'
    }
})

class ScreenProfile extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({tintColor}) => {
            return <Icon name="book" size={20} color={tintColor}/>;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            name: '',
            image: '',
            initialRedGetListReserveUser: true,
            data: [],
            isRefresh: false
        }
    }

    onLoginClick = () => {
        return () => {
            console.log("aaa")
            this.props.navigation.navigate('Auth')
        }
    }
    onLogOutClick = () => {
        return () => {
            this.props.dispatch({type: 'LOGOUT'})
            this.props.dispatch({type: 'RESET'})
        }
    }
    onCreareReserveClick = () => {
        return () => {
            this.props.navigation.navigate('CreateReserve')

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initialRedGetListReserveUser === this.props.redGetListReserveUser.status) {
            this.setState({
                data: this.props.redGetListReserveUser.data,
                isRefresh: false
            })
            this.props.dispatch({type: 'RESET_RESERVE_USER'})
        }
    }

    componentDidMount() {
        let params = {
            par_user_id: this.props.redAuth.data.profile.user_id
        }
        this.props.dispatch(actGetListReserve(params));
        if (this.props.redAuth.status_get) {
            this.setState({
                isLogin: true,
                name: this.props.redAuth.data.data.name,
                image: this.props.redAuth.data.data.photo
            })
        } else {
            this.setState({
                isLogin: false
            })
        }
    }

    onRefresh = () => {
        return () => {
            let params = {
                par_user_id: this.props.redAuth.data.profile.user_id
            }
            this.props.dispatch(actGetListReserve(params));
            this.setState({
                isRefresh: true
            })
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <StatusBar backgroundColor="#013976"/>

                <View>

                    <View style={styles.dd}/>
                    <View style={styles.TrapezoidStyle}/>
                    <View style={styles.TrapezoidStyle_}/>
                    {
                        this.state.isLogin
                        &&
                        <View style={{
                            height: 50,
                            position: 'absolute',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Button transparent light style={{width: 50, justifyContent: 'center'}}
                                    onPress={this.onLogOutClick()}>
                                <Icon name="sign-out" size={20} color={'#FFF'}/>
                            </Button>
                        </View>
                    }

                    <View style={{position: 'absolute', top: 40, right: 10}}>
                        {
                            this.state.isLogin
                            &&
                            <Thumbnail large
                                       source={{uri: this.state.image}}/>
                        }
                    </View>
                    <View style={{position: 'absolute', top: 120, right: 10}}>
                        <Text style={{color: '#FFF'}}>{this.state.name}</Text>
                    </View>

                </View>
                {
                    this.state.isLogin
                    &&
                    <View style={{marginLeft: 10}}>
                        <Text>Your reserve</Text>
                    </View>
                }
                {
                    !this.state.isLogin
                        ?
                        <Content>
                            <Text>Heloo</Text>
                        </Content>
                        :
                        this.state.data.length > 0
                            ?
                            <FlatList
                                style={{marginLeft: 10, marginRight: 10}}
                                onRefresh={this.onRefresh()}
                                refreshing={this.state.isRefresh}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.data}
                                keyExtractor={(item, index) => '' + index}
                                renderItem={({item}) =>

                                    <Reserve
                                        title={item.reserve_title}
                                        status={item.reserve_status}
                                        cd={sqlToJsISO(item.reserve_create_date)}
                                        ed={item.reserve_end_date}
                                    />
                                }
                            />
                            : <Text>No data</Text>


                }
                {/*<View style={{padding:10}}>*/}
                {/*<Text>Edit Profile</Text>*/}
                {/*</View>*/}
                {/*<View style={{padding:10}}>*/}
                {/*<Text>Log Out</Text>*/}
                {/*</View>*/}


                {/*<Button full bordered info style={{margin: 10}} onPress={this.onCreareReserveClick()}>*/}
                {/*<Text>Create Reserve</Text>*/}
                {/*</Button>*/}
                {
                    !this.state.isLogin
                        ?
                        <View style={{
                            margin: 10
                        }}>
                            <Button style={{borderColor: '#013976'}} full bordered onPress={this.onLoginClick()}>
                                <Text style={{color: '#013976'}}>Login</Text>
                            </Button>
                        </View>
                        :
                        <Button full bordered info style={{margin: 10}} onPress={this.onCreareReserveClick()}>
                            <Text>Create Reserve</Text>
                        </Button>
                }

            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenProfile);