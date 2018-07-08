/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src//Store/configureStore'
import AppWithNavigationState from './src/Navigator/AppNavigator';


type Props = {};
export default class App extends Component<Props> {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AppWithNavigationState />
				</PersistGate>
			</Provider>
		);
	}
}

