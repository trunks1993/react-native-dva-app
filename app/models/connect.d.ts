import { HomeModelState } from './home';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    home?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  home: HomeModelState;
}
