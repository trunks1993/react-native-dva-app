import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, BVLinearGradient, Button } from 'react-native';
import { produce, Draft } from 'immer';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import { FlatList } from 'react-native';
import Header from 'components/Header';

import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles, { NoticeStyles } from 'styles/index.css';
// 图片引入
import bgPage from 'assets/images/bg-page.png';
import bgTitle from 'assets/images/bg-title.png';
import iconBack from 'assets/images/icon-back.png';

import noticeBgList from 'assets/images/notice-bg-list.png';
import noticeBgBtn from 'assets/images/notice-bg-btn.png';
import noticeBgBtnActive from 'assets/images/notice-bg-btn-active.png';

export interface NoticeProps {
  notice: any;
}

export interface NoticeStates {
  news: any;
  activeTab: number;
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
    }],
    activeTab: 1,
  }

  handleSetActiveTab = (activeTab) => {
    this.setState(produce((draft: Draft<NoticeStates>, { }): void => {
      draft.activeTab = activeTab;
    }))
  };

  _renderList = ({ item }) => {
    const { navigation } = this.props;
    return (
      <View style={{ paddingBottom: 39 }}>
        <View style={NoticeStyles.newsTitleBox}>
          <Text style={NoticeStyles.newsTitle}>{item.title}</Text>
          <Text style={NoticeStyles.newsTitle}>{item.time}</Text>
        </View>
        <View style={NoticeStyles.newsContent}>
          <TouchableOpacity onPress={() => navigation.navigate('NoticeDetail')}>
            <Text style={NoticeStyles.newsContentText}>
              {item.content}
            </Text>
          </TouchableOpacity>
          <LinearGradient start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 0 }} colors={['rgba(255, 255, 255, 0)', '#37C5E6', 'rgba(255, 255, 255, 0)']} style={{ height: 1, marginTop: 39 }} />
        </View>
      </View>
    )
  };

  render() {
    const { navigation } = this.props;
    const { news, activeTab } = this.state;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header navigate={navigation.navigate} title="通知通告" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <View style={NoticeStyles.btnTools}>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(1)}>
            <ImageBackground source={activeTab === 1 ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>临时通知</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(2)}>
            <ImageBackground source={activeTab === 2 ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>重大情况播报</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(3)}>
            <ImageBackground source={activeTab === 3 ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>违规信息</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(4)}>
            <ImageBackground source={activeTab === 4 ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>监室考评</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <ImageBackground source={noticeBgList} imageStyle={{ resizeMode: 'stretch' }} style={NoticeStyles.content}>
          <View style={{ width: '100%', height: '100%' }}>
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
