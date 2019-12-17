import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, BVLinearGradient, Button } from 'react-native';
import { produce, Draft } from 'immer';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from 'styles/index.css';
// 图片引入
import iconBack from 'assets/images/icon-back.png';
import bgTitle from 'assets/images/bg-title.png';

export interface HeaderProps {
  allowBack: boolean;
  backPage: string;
  title: string;
  titleRight: string;
  replace(
    routeNameOrOptions: string
  ): boolean;
}

export interface HeaderStates {
}

class Header extends React.Component<HeaderProps, HeaderStates> {

  state: HeaderStates = {
  }

  handleNavigate = () => {
    const { allowBack, backPage, replace } = this.props;
    allowBack && replace(backPage);
  }

  render() {
    const { allowBack, title, titleRight } = this.props;
    return (
      <View style={GlobalStyles.header}>
        <TouchableOpacity onPress={this.handleNavigate}>
          <ImageBackground source={bgTitle} style={GlobalStyles.headerLeft}>
            {allowBack && <Image style={GlobalStyles.iconBack} source={iconBack} />}
            <Text style={{ fontSize: 32, color: '#ffffff', marginLeft: !allowBack ? 50 : 0}}>{title}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={GlobalStyles.titleRight}>{titleRight}</Text>
      </View>
    )
  }
}

export default connect()(Header);
