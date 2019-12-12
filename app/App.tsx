import * as React from 'react';
import { Provider } from 'react-redux';
import createLoading from 'dva-loading';
import { create } from 'dva-core';

import { home, test } from './models/index';
import Navigation from './routes'; //    这个是react-navigation路由文件
import bgPage from 'assets/images/bg-page.png';

const models = [home, test];

const app = create(); // 创建dva实例，可传递配置参数。https://dvajs.com/api/#app-dva-opts

app.use(createLoading());

models.forEach(o => {
  // 装载models对象
  app.model(o);
});

app.start(); // 实例初始化

const store = app._store; // 获取redux的store对象供react-redux使用

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
