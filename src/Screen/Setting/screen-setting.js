import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StatusBar} from 'react-native'
import { Container, Content, List, ListItem, Text, Right, Radio, Left, View, Button } from 'native-base';
import { withNavigation } from "react-navigation"
import Icon from 'react-native-vector-icons/FontAwesome';
function mapStateToProps(state) {
    return {
        redGetColor : state.redGetColor
    };
}

class ScreenSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color : '#1565C0'
        }
    }
    _onRadioChange = (key) => {
        return (e) => {
            this.setState({
                color:key
            })
            this.props.dispatch({
                type : 'GET_COLOR',
                data : key,
                message : "asdf"
            })
        }
    }
    componentDidMount() {
        // console.log(this.props.redGetColor)
        this.setState(
            { color: this.props.redGetColor.data }
        )
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#FFF' }}>
            <StatusBar
                    backgroundColor={this.state.color}
                    barStyle="light-content"
                />
                <Content>
                    <View style={{ backgroundColor: this.state.color, height: 60, alignContent: 'center', justifyContent: 'center' }}>
                        <Button transparent light style={{ padding: 15 }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-left" size={20} color="#FFF" />
                        </Button>
                    </View>
                    <List>
                        <ListItem onPress={this._onRadioChange('#D50000')}>
                            <Left style={{ alignContent: 'center' }}>
                                <View style={{ height: 30, width: 30, backgroundColor: '#D50000' }}>

                                </View>
                                <Text>{" "}#D50000</Text>
                            </Left>
                            <Right style={{ justifyContent: 'flex-end' }}>
                                <Radio onPress={this._onRadioChange('#D50000')} selected={this.state.color=== '#D50000' && true} />
                            </Right>
                        </ListItem>
                        <ListItem onPress={this._onRadioChange('#C51162')}>
                            <Left>
                                <View style={{ height: 30, width: 30, backgroundColor: '#C51162' }}>
                                </View>
                                <Text>{" "}#C51162</Text>
                            </Left>
                            <Right>
                                <Radio onPress={this._onRadioChange('#C51162')} selected={this.state.color=== '#C51162' && true} />
                            </Right>
                        </ListItem>
                        <ListItem onPress={this._onRadioChange('#AA00FF')}>
                            <Left>
                                <View style={{ height: 30, width: 30, backgroundColor: '#AA00FF' }}>

                                </View>
                                <Text>{" "}#AA00FF</Text>
                            </Left>
                            <Right>
                                <Radio onPress={this._onRadioChange('#AA00FF')} selected={this.state.color=== '#AA00FF' && true} />
                            </Right>
                        </ListItem>
                        <ListItem onPress={this._onRadioChange('#BF360C')}>
                            <Left>
                                <View style={{ height: 30, width: 30, backgroundColor: '#BF360C' }}>

                                </View>
                                <Text>{" "}#BF360C</Text>
                            </Left>
                            <Right>
                                <Radio onPress={this._onRadioChange('#BF360C')} selected={this.state.color=== '#BF360C' && true} />
                            </Right>
                        </ListItem>
                        <ListItem onPress={this._onRadioChange('#3E2723')}>
                            <Left>
                                <View style={{ height: 30, width: 30, backgroundColor: '#3E2723' }}>

                                </View>
                                <Text>{" "}#3E2723</Text>
                            </Left>
                            <Right>
                                <Radio onPress={this._onRadioChange('#3E2723')} selected={this.state.color=== '#3E2723' && true} />
                            </Right>
                        </ListItem>
                        <ListItem onPress={this._onRadioChange('#76FF03')}>
                            <Left>
                                <View style={{ height: 30, width: 30, backgroundColor: '#76FF03' }}>

                                </View>
                                <Text>{" "}#76FF03</Text>
                            </Left>
                            <Right>
                                <Radio onPress={this._onRadioChange('#76FF03')} selected={this.state.color=== '#76FF03' && true} />
                            </Right>
                        </ListItem>
                        <ListItem onPress={this._onRadioChange('#1565C0')}>
                            <Left>
                                <View style={{ height: 30, width: 30, backgroundColor: '#1565C0' }}>

                                </View>
                                <Text>{" "}#1565C0</Text>
                            </Left>
                            <Right>
                                <Radio onPress={this._onRadioChange('#1565C0')} selected={this.state.color=== '#1565C0' && true } />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const screen = withNavigation(ScreenSetting)
export default connect(
    mapStateToProps,
)(screen);