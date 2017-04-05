/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './js/App'

export default class RefreshListView extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('RefreshListView', () => RefreshListView);
