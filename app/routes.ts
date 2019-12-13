import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from 'pages/home';
import Test from 'pages/test';
import Face from 'pages/face';
import Notice from 'pages/notice';
import NoticeDetail from 'pages/notice/noticeDetail';

let Stack = createStackNavigator({
  Home,
  Notice,
  NoticeDetail,
  // Test,
  // Face,
}, {
  defaultNavigationOptions: {
    header: null,
  }
});

export default createAppContainer(Stack);
