import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { HomeStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';

export interface TestProps {
  user: any;
}

class Test extends React.Component<TestProps> {
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header navigate={navigation.navigate} title="测试" allowBack={true} backPage="Notice" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />

      </ImageBackground>
    )
  }
}

export default connect()(Test);
