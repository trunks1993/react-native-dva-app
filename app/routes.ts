import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from 'pages/home/index';
import Test from 'pages/test/index';

let Stack = createStackNavigator({
  Home,
  Test,
});

export default createAppContainer(Stack);
