import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View, FlatList, StatusBar
} from 'react-native';
import { withNavigation } from "react-navigation"
import { Container, Content, Item, Input, Button } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
function mapStateToProps(state) {
    return {
        
    };
}

class ScreenHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRedGetColor: true,
            color: '#1565C0'
        }
    }
    render() {
        let firstQuery = ""
        return (
            <Container style={{ backgroundColor: this.state.color }}>
                <View>
                    <Text>aaa</Text>
                </View>
            </Container>
        );
    }
}
const screen = withNavigation(ScreenHome)
export default connect(
    mapStateToProps,
)(screen);