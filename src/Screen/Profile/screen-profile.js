import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Thumbnail, Text, Container, Content, Button} from 'native-base';
import {StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function mapStateToProps(state) {
    return {
        redAuth: state.redAuth
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
            image: ''
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
            this.props.dispatch({type: 'HOME'})
        }
    }
    onCreareReserveClick = () => {
        return () => {
            this.props.navigation.navigate('CreateReserve')

        }
    }

    componentDidMount() {
        if (this.props.redAuth.status_get) {
            console.log(this.props.redAuth)
            this.setState({
                isLogin: true,
                name: JSON.parse(this.props.redAuth.data.data).name,
                image: JSON.parse(this.props.redAuth.data.data).picture.data.url
            })
        } else {
            this.setState({
                isLogin: false
            })
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <StatusBar backgroundColor="#013976"/>

                <View style={styles.MainContainer}>

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

                <Content style={{marginTop: 10}}>

                    {/*<View style={{padding:10}}>*/}
                    {/*<Text>Edit Profile</Text>*/}
                    {/*</View>*/}
                    {/*<View style={{padding:10}}>*/}
                    {/*<Text>Log Out</Text>*/}
                    {/*</View>*/}


                </Content>
                <Button full bordered info style={{margin: 10}} onPress={this.onCreareReserveClick()}>
                    <Text>Create Reserve</Text>
                </Button>
                {
                    !this.state.isLogin
                        ?
                        <View style={{
                            margin: 10
                        }}>
                            <Button style={{borderColor:'#013976'}} full bordered onPress={this.onLoginClick()}>
                                <Text style={{color:'#013976'}}>Login</Text>
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