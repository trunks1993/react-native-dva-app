import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, GestureResponderEvent } from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { CallStyles } from 'styles/index.css'
import { NavigationInjectedProps } from 'react-navigation';

// 图片引入
import bgPage from 'assets/images/bg-page.png';

export interface HomeProps extends NavigationInjectedProps {
}

class Communicating extends React.Component<HomeProps> {

  state = {
    timer: null,
  }

  componentDidMount() {
    this.handleDebounce();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleDebounce = () => {
    this.timer = setTimeout(() => {
      const { navigation } = this.props;
      navigation.replace('Await');
    }, 10000);
  }


  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        
      </ImageBackground >
    )
  }
}

export default connect(({ home }: ConnectState) => {
  return {
    user: home.user,
  }
})(Communicating);
