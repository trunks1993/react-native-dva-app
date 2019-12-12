import { Effect } from 'dva';
import { Reducer } from 'redux';
import { produce, Draft } from 'immer';

export interface UserType {
  name: string;
}

export interface HomeModelState {
  user: UserType;
}

export interface HomeModelType {
  namespace?: string;
  state: HomeModelState;
  effects: {
    testLoading: Effect;
  };
  reducers: {
    testLoading: Reducer;
  };
}

const Model: HomeModelType = {
  namespace: 'home',

  state: {
    user: {
      name: 'ff',
    }
  },

  effects: {
    *testLoading({}, { call, put }) {
      const [err, data] = yield call();
    },
  },

  reducers: {
    testLoading: produce((draft: Draft<HomeModelState>, {}): void => {
      draft.user.name = 'trunks';
    }),
  },

};

export default Model;
