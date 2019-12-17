import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, BVLinearGradient, Button } from 'react-native';
import { produce, Draft } from 'immer';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import { FlatList } from 'react-native';
import Header from 'components/Header';

import LinearGradient from 'react-native-linear-gradient';

import { TAB_SHORT_NOTICE, TAB_IMPORTANT_SITUATION, TAB_VIOLATION_INFO, TAB_SURVEILANCE_EVALUTION } from 'const';

import GlobalStyles, { NoticeStyles } from 'styles/index.css';
// 图片引入
import bgPage from 'assets/images/bg-page.png';
import bgTitle from 'assets/images/bg-title.png';
import iconBack from 'assets/images/icon-back.png';

import noticeBgList from 'assets/images/notice-bg-list.png';
import noticeBgBtn from 'assets/images/notice-bg-btn.png';
import noticeBgBtnActive from 'assets/images/notice-bg-btn-active.png';

export interface NoticeProps extends NavigationInjectedProps {
  notice: any;
}

export interface NoticeStates {
  newsMap: any;
  activeTab: string;
}

class Notice extends React.Component<NoticeProps, NoticeStates> {

  state: NoticeStates = {
    newsMap: {
      [TAB_SHORT_NOTICE]: [{
        key: '0',
        title: '测试标题1',
        time: '2019-12-04 15:52',
        content: '12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理',
      }],
      [TAB_IMPORTANT_SITUATION]: [{
        key: '0',
        title: '监区地址搬迁通告',
        time: '2019-12-04 15:52',
        content: '本监区于下月中旬将搬迁到新的地址，请大家收拾好东西，做好搬迁准备，到时按照监区安排及指令安全有序完成搬迁。',
      }],
      [TAB_VIOLATION_INFO]: [{
        key: '0',
        title: '0301室聚众闹事通报',
        time: '2019-12-04 15:52',
        content: '0301室所有成员于2019年12月17日凌晨1点聚众闹事，损坏公物，影响极其恶劣，现予以通报所有成员关禁闭15日，每人扣除20分。',
      }],
      [TAB_SURVEILANCE_EVALUTION]: [{
        key: '0',
        title: '11月考评公布',
        time: '2019-12-04 15:52',
        content: '0301室90分，0302室89分，0303室95分，0304室92分，0305室80分，0306室59分，0307室88分，0308室90分，0309室100分。',
      }],
    },
    activeTab: TAB_SHORT_NOTICE,
  }

  handleSetActiveTab: (activeTab: string) => void = (activeTab) => {
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
          <TouchableOpacity onPress={() => navigation.navigate('NoticeDetail', { item })}>
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
    const { newsMap, activeTab } = this.state;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header navigate={navigation.navigate} title="通知通告" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <View style={NoticeStyles.btnTools}>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_SHORT_NOTICE)}>
            <ImageBackground source={activeTab === TAB_SHORT_NOTICE ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>临时通知</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_IMPORTANT_SITUATION)}>
            <ImageBackground source={activeTab === TAB_IMPORTANT_SITUATION ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>重大情况播报</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_VIOLATION_INFO)}>
            <ImageBackground source={activeTab === TAB_VIOLATION_INFO ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>违规信息</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_SURVEILANCE_EVALUTION)}>
            <ImageBackground source={activeTab === TAB_SURVEILANCE_EVALUTION ? noticeBgBtnActive : noticeBgBtn} style={NoticeStyles.btn}>
              <Text style={NoticeStyles.btnText}>监室考评</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <ImageBackground source={noticeBgList} imageStyle={{ resizeMode: 'stretch' }} style={NoticeStyles.content}>
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList data={newsMap[activeTab]} renderItem={this._renderList} />
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
