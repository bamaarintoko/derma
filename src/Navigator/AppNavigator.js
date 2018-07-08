import React, { Component } from 'react';
import {
    BackHandler, View, StatusBar
} from 'react-native';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import { initializeListeners } from 'react-navigation-redux-helpers'
import { navigationPropConstructor } from '../Utils/Redux'
import ScreenHome from '../Screen/Home/screen-home'
import ScreenReserve from '../Screen/Reserve/screen-reserve'
import ScreenNews from '../Screen/News/screen-news'
import ScreenEvent from '../Screen/Event/screen-event'

import { connect } from "react-redux";
import { addListener } from '../Utils/Redux';

export const Home = createBottomTabNavigator({
    Home : ScreenHome,
    Reserve : ScreenReserve,
    News : ScreenNews,
    Event : ScreenEvent,
})

export const AppNavigator = createStackNavigator({
    Menu: { screen: Home },

}, {
    headerMode: 'none',

    navigationOptions: {
        gesturesEnabled: true
    }
});

class AppWithNavigationState extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        initializeListeners('root', this.props.nav);
        BackHandler.addEventListener('hardwareBackPress', function () {
            const { dispatch, navigation, nav } = this.props;

            if (nav.routes.length === 1) {
                BackHandler.exitApp()
                return false;
            }
            dispatch({ type: 'Navigation/BACK' });
            return true;
        }.bind(this));
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log("aaa");
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        const { dispatch, nav } = this.props;
        const navigation = navigationPropConstructor(dispatch, nav);
        return (
            <AppNavigator navigation={navigation} />

        )
    }
};

function mapStateToProps(state) {
    return {
        nav: state.nav,
    };
}


export default connect(mapStateToProps)(AppWithNavigationState);