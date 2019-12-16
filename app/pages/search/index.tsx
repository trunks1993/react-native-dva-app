import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { SearchStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';

export interface SearchProps {
  user: any;
}

class Search extends React.Component<SearchProps> {
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        {/* <Header navigate={navigation.navigate} title="谈话预约" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <View>
          <Text>我的预约</Text>
        </View>
        <ImageBackground>
          <View>
            <ImageBackground source={bgPage} style={GlobalStyles.container}>
            </ImageBackground>
            <ImageBackground source={bgPage} style={GlobalStyles.container}>
            </ImageBackground>
            <ImageBackground source={bgPage} style={GlobalStyles.container}>
            </ImageBackground>
            <ImageBackground source={bgPage} style={GlobalStyles.container}>
            </ImageBackground>
          </View>
          <ImageBackground source={bgPage}>

          </ImageBackground>
        </View> */}
      </ImageBackground>
    )
  }
}

export default connect()(Search);
