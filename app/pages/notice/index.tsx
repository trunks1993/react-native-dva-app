import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, BVLinearGradient } from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import GlobalStyles, { NoticeStyles } from 'styles/index.css';
// 图片引入
import bgPage from 'assets/images/bg-page.png';
import bgTitle from 'assets/images/bg-title.png';
import iconBack from 'assets/images/icon-back.png';

import noticeBgList from 'assets/images/notice-bg-list.png';

export interface NoticeProps {
  notice: any;
}

export interface NoticeStates {
  news: any;
}

class Notice extends React.Component<NoticeProps, NoticeStates> {

  state: NoticeStates = {
    news: [{
      key: '0',
      title: '测试标题1',
      time: '2019-12-04 15:52',
      content: '12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理',
    }, {
      key: '1',
      title: '测试标题1',
      time: '2019-12-04 15:52',
      content: '12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理',
    }, {
      key: '2',
      title: '测试标题1',
      time: '2019-12-04 15:52',
      content: '12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理',
    }]
  }

  _renderList = ({ item }) => {
    return (
      <View style={{paddingBottom: 39}}>
        <View style={NoticeStyles.newsTitleBox}>
          <Text style={NoticeStyles.newsTitle}>{item.title}</Text>
          <Text style={NoticeStyles.newsTitle}>{item.time}</Text>
        </View>
        <View style={NoticeStyles.newsContent}>
          <Text style={NoticeStyles.newsContentText}>
            {item.content}
          </Text>
          <LinearGradient start={{x: 0.1, y: 0}} end={{x: 0.9, y: 0}} colors={['rgba(255, 255, 255, 0)', '#37C5E6', 'rgba(255, 255, 255, 0)']} style={{height: 1, marginTop: 39}} />
        </View>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const { news } = this.state;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <View style={NoticeStyles.header}>
          <View>
            <Image resizeMode="contain" source={bgTitle} />
            <View style={NoticeStyles.headTitle}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image style={NoticeStyles.iconBack} source={iconBack} />
              </TouchableOpacity>
              <Text style={{ fontSize: 32, color: '#ffffff' }}>通知通告</Text>
            </View>
          </View>
          <Text style={{ fontSize: 20, color: '#ffffff' }}>0502监室  |  2019年12月3日 星期二    15:20</Text>
        </View>
        <View style={NoticeStyles.btnTools}></View>
        <ImageBackground source={noticeBgList} imageStyle={{ resizeMode: 'stretch'}} style={NoticeStyles.content}>
          <View style={{width: '100%', height: '100%'}}>
            <FlatList data={news} renderItem={this._renderList} />
          </View>
        </ImageBackground>
      </ImageBackground >
    )
  }
}

export default Notice;
// export default connect(({ notice }: ConnectState) => {
//   return {
//     news: notice.news,
//   }
// })(Notice);
