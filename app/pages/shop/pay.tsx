import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { ShopStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';

export interface PayProps extends NavigationInjectedProps {
  user: any;
}

class Pay extends React.Component<PayProps> {
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="商品点购" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        
      </ImageBackground>
    )
  }
}

export default connect()(Pay);
