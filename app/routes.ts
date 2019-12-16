import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from 'pages/home';
import Test from 'pages/test';
import Face from 'pages/face';
import Notice from 'pages/notice';
import NoticeDetail from 'pages/notice/noticeDetail';
import WarmPrompt from 'pages/warmPrompt'
import Feeling from 'pages/feeling'
import Living from 'pages/living'
import Order from 'pages/order'
import Search from 'pages/search'

const Stack = createStackNavigator({
  Home,
  Notice,
  NoticeDetail,
  WarmPrompt,
  Feeling,
  Living,
  Order,
  Search,
  // Test,
  // Face,
}, {
  defaultNavigationOptions: {
    header: null,
  }
});

export default createAppContainer(Stack);
