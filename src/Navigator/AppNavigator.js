import React, {Component} from 'react';
import {
    BackHandler, View, StatusBar
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, NavigationActions} from "react-navigation";
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    reduxifyNavigator
} from "react-navigation-redux-helpers";
import { AsyncStorage} from 'react-native'
import {persistReducer, persistStore} from "redux-persist";
import ScreenHome from '../Screen/Home/screen-home'
import ScreenSetting from '../Screen/Setting/screen-setting'
import ScreenDetail from '../Screen/Home/screen-detail'
import ScreenProfile from '../Screen/Profile/screen-profile'
import ScreenChangePassword from '../Screen/Profile/screen-change-password'
import ScreenEditProfil from '../Screen/Profile/screen-edit-profil'
import ScreenMyReserveDetail from '../Screen/Profile/screen-detail-myreserve'
import ScreenNews from '../Screen/News/screen-news'
import ScreenEvent from '../Screen/Event/screen-event'
import ScreenAuth from '../Screen/Auth/screen-auth'
import SplashScreen from '../Screen/Splash/screen-splash'
import ScreenIntro from '../Screen/Splash/screen-intro'
import ScreenRegister from '../Screen/Auth/screen-register'
import ScreenForgetPassword from '../Screen/Auth/screen-forget-password'
import ScreenCreateReserve from '../Screen/CreateReserve/screen-create-reserve'
import ScreenConversation from '../Screen/Message/screen-conversation'
import ScreenMessageList from '../Screen/Message/screen-message-list'
import {connect} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {redGetColor} from "../Reducers/colorReducers";
import {redAuth, redRegister} from "../Reducers/authReducers";
import {redAddReserve, redGetListReserve, redGetListReserveUser, redUpdateReserve} from "../Reducers/reserveReducers";
import {redSetting} from "../Reducers/settingReducers";
import {redMessage} from "../Reducers/messageReducers";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    whitelist: ['redAuth','redSetting']
}
export const Home = createBottomTabNavigator({
    Home: {screen: ScreenHome},
    News: {screen: ScreenNews},
    Event: {screen: ScreenEvent},
    Reserve: {screen: ScreenProfile},
})

export const AppNavigator = createStackNavigator({
    Menu: {screen: Home},
    Auth: {screen: ScreenAuth},
    Splash: {screen: SplashScreen},
    Intro: {screen: ScreenIntro},
    Register: {screen: ScreenRegister},
    CreateReserve: {screen: ScreenCreateReserve},
    ForgetPassword: {screen: ScreenForgetPassword},
    MyDetailReserve: {screen: ScreenMyReserveDetail},
    ScreenDetail: {screen: ScreenDetail},
    Conversation: {screen: ScreenConversation},
    Message: {screen: ScreenMessageList},
    Setting: {screen: ScreenSetting},
    ChangePassword: {screen: ScreenChangePassword},
    EditProfil: {screen: ScreenEditProfil},

}, {
    headerMode: 'none',
    initialRouteName:'Register'
});
export const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
    redGetColor: redGetColor,
    redAuth: redAuth,
    redRegister: redRegister,
    redAddReserve: redAddReserve,
    redGetListReserve: redGetListReserve,
    redGetListReserveUser: redGetListReserveUser,
    redSetting: redSetting,
    redUpdateReserve: redUpdateReserve,
    redMessage: redMessage,
    nav: navReducer
})
export const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
const mapStateToProps = (state) => ({
    state: state.nav,
});
const App = reduxifyNavigator(AppNavigator, "root");
const AppWithNavigationState = connect(mapStateToProps)(App)
const persistedReducer = persistReducer(persistConfig, appReducer)
export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, middleware),
);
export const persistor = persistStore(store)
class Root extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            const {state} = this.props;
            console.log(this.props)
            if (state.index === 0) {

                BackHandler.exitApp()
                return false;
            }
            this.props.dispatch(NavigationActions.back());
            return true;
        }.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <AppWithNavigationState/>
        )
    }
};

// function mapStateToProps(state) {
//     return {
//         nav: state.nav,
//     };
// }


export default connect(mapStateToProps)(Root)