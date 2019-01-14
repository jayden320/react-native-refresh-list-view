/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Demo from './src/Demo'

export default class App extends Component {
  render() {
    return (
      <Demo />
    );
  }
}

AppRegistry.registerComponent('App', () => App);
