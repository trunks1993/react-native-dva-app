import { Effect } from 'dva-core';
import { Reducer } from 'redux';
export interface TestModelState {
}

export interface TestModelType {
  namespace?: string;
  state: TestModelState;
  effects: {};
  reducers: {};
}

const Model: TestModelType = {
  namespace: 'test',

  state: {},

  effects: {
  },

  reducers: {
  },
  
};

export default Model;
