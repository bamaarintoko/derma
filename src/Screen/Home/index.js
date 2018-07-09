import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";
import ScreenHome from './screen-home'
import ScreenReserve from '../Reserve/screen-reserve'
import ScreenNews from '../News/screen-news'
import ScreenEvent from '../Event/screen-event'
const MyApp = createBottomTabNavigator({
    Home: { screen: ScreenHome },
    Reserve: { screen: ScreenReserve },
    News: { screen: ScreenNews },
    Event: { screen: ScreenEvent },
})