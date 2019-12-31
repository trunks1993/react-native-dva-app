import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from 'pages/home';
import Test from 'pages/test';
import Face from 'pages/face';
import Notice from 'pages/notice';
import NoticeDetail from 'pages/notice/noticeDetail';
import WarmPrompt from 'pages/warmPrompt';
import Feeling from 'pages/feeling';
import Living from 'pages/living';
import Order from 'pages/order';
import Search from 'pages/search';
import MyOrder from 'pages/order/mine';
import Await from 'pages/await';

import Shop from 'pages/shop';
import Account from 'pages/shop/account';
import Pay from 'pages/shop/pay';
import PaySuccess from 'pages/shop/paySuccess';
import StartCommunicate from 'pages/call/startCommunicate';
import Communicating from 'pages/call/Communicating';
import Finger from 'pages/shop/finger';

const Stack = createStackNavigator({
  Home,
  Pay,
  Face,
  Shop,
  Notice,
  NoticeDetail,
  WarmPrompt,
  Feeling,
  Living,
  Order,
  Search,
  MyOrder,
  Await,
  Account,
  PaySuccess,
  StartCommunicate,
  Communicating,
  Finger,
}, {
  defaultNavigationOptions: {
    header: null,
  }
});

export default createAppContainer(Stack);
