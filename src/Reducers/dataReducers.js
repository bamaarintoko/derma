import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../Navigator/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Menu');

const initialNavState = AppNavigator.router.getStateForAction(
    firstAction,
);

export function nav(state = initialNavState, action) {
    let nextState;
    switch (action.type) {
        case 'HOME':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index:0,
                    actions : [
                        NavigationActions.navigate({routeName: 'Menu',params: { foo: 'bar' }})
                    ]}),
                state
            );
            break;
        case 'Login':

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index:0,
                    actions : [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]}),
                state
            );
            break;
        case 'LOG_OUT_SUCCESS':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index:0,
                    actions : [
                        NavigationActions.navigate({routeName: 'Splash'})
                    ]}),
                state
            );
            break;
        case 'EDIT_WAREHOUSE':

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'EditWarehouse' }),
                state
            );
            break;
        case 'NAV_DETAIL_PROD':

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'screenOne' }),
                state
            );
            break;
        case 'NAV_FILTER_RESPONSES':

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'screenFilterResponses' }),
                state
            );
            break;
        case 'three':

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'screenThree' }),
                state
            );
            break;
        case 'four':

            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'screenFour' }),
                state
            );
            break;


        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}