import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, BVLinearGradient, Button } from 'react-native';
import { produce, Draft } from 'immer';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationInjectedProps } from 'react-navigation';

import GlobalStyles, { NoticeStyles } from 'styles/index.css';
// 图片引入
import bgPage from 'assets/images/bg-page.png';
import bgTitle from 'assets/images/bg-title.png';
import iconBack from 'assets/images/icon-back.png';

import noticeBgList from 'assets/images/notice-bg-list.png';
import noticeBgBtn from 'assets/images/notice-bg-btn.png';
import noticeBgBtnActive from 'assets/images/notice-bg-btn-active.png';
import Header from 'components/Header';

export interface NoticeDetailProps extends NavigationInjectedProps {
}

export interface NoticeDetailStates {
  noticeInfo: any;
}

class NoticeDetail extends React.Component<NoticeDetailProps, NoticeDetailStates> {

  state: NoticeDetailStates = {
    noticeInfo: {
      key: '2',
      title: '测试标题1',
      time: '2019-12-04 15:52',
      content: '12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点班级人员，上报管理警员:  就 近期内务整理',
    },
  }

  render() {
    const { navigation } = this.props;
    const noticeInfo = navigation.getParam('item');
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header navigate={navigation.navigate} title="通知通告" allowBack={true} backPage="Notice" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <ImageBackground source={noticeBgList} imageStyle={{ resizeMode: 'stretch' }} style={NoticeStyles.info}>
          <View style={NoticeStyles.detailTitleBox}>
            <Text style={NoticeStyles.detailTitle}>{noticeInfo.title}</Text>
            <Text style={NoticeStyles.detailTime}>{noticeInfo.time}</Text>
          </View>
          <View style={NoticeStyles.detailContentBox}>
            <ScrollView>
              <Text style={NoticeStyles.newsContentText}>{noticeInfo.content}</Text>
            </ScrollView>
          </View>
        </ImageBackground>
      </ImageBackground >
    )
  }
}

export default NoticeDetail;
// export default connect(({ notice }: ConnectState) => {
//   return {
//     news: notice.news,
//   }
// })(NoticeDetail);
