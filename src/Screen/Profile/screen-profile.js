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
        borderBottomColor: "#FB8C00",
        borderTopWidth: 50,
        borderTopColor: '#FB8C00',
        borderLeftWidth: 400,
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    TrapezoidStyle_: {

        width: '100%',
        height: 0,
        borderBottomColor: "#FFA726",
        borderTopWidth: 50,
        borderTopColor: '#FFA726',
        borderLeftWidth: 0,
        position: 'absolute',
        borderRightWidth: 400,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    dd: {

        width: '100%',
        height: 120,
        backgroundColor: '#FB8C00'
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
            console.log(JSON.parse(this.props.redAuth.data).picture.data.url)
            this.setState({
                isLogin: true,
                name: JSON.parse(this.props.redAuth.data).name,
                image: JSON.parse(this.props.redAuth.data).picture.data.url
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
                <StatusBar backgroundColor="#FFA726"/>

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
                {
                    !this.state.isLogin
                        ?
                        <View style={{
                            margin: 10
                        }}>
                            <Button full bordered warning onPress={this.onLoginClick()}>
                                <Text>Login</Text>
                            </Button>
                        </View>
                        :
                        <Button full bordered warning style={{margin: 10}} onPress={this.onCreareReserveClick()}>
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