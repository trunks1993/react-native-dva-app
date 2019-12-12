import * as React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';

export interface HomeProps {
  user: any;
}

class Home extends React.Component<HomeProps> {
  render() {
  return <View><Text>{this.props.user.a}</Text></View>
  }
}

export default connect(({ home }: ConnectState) => {
  return {
    user: home.user,
  }
})(Home);
