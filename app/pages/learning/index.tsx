import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { HomeStyles } from 'styles/index.css';
import LearningStyles from './index.css';

import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';

import iconBook from './images/icon-book.png';
import iconVideo from './images/icon-video.png';
import iconDoc from './images/icon-doc.png';

export interface LearnProps extends NavigationInjectedProps {
  user: any;
}

class Test extends React.Component<LearnProps> {
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="技能学习" allowBack={true} backPage="Notice" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <View style={LearningStyles.box1}>
          <TouchableOpacity onPress={() => navigation.replace('Book')}>
            <View style={{ alignItems: 'center' }}>
              <Image source={iconBook} />
              <Text style={{fontSize: 30, color: '#ffffff', marginTop: 30}}>借阅书籍</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Video')}>
            <View style={{ marginLeft: 113, marginRight: 113, alignItems: 'center' }}>
              <Image source={iconVideo} />
              <Text style={{fontSize: 30, color: '#ffffff', marginTop: 30}}>视频资料</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Doc')}>
            <View style={{ alignItems: 'center' }}>
              <Image source={iconDoc} />
              <Text style={{fontSize: 30, color: '#ffffff', marginTop: 30}}>文档资料</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

export default connect()(Test);
