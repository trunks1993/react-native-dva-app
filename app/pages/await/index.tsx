import * as React from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { AwaitStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import awaitIconNotice from 'assets/images/await-icon-notice.png'

interface MsgItem {
  type: string;
  content: string;
  title: string;
  key: string;
}

export interface AwaitProps extends NavigationInjectedProps {
}

export interface AwaitStates {
  msgList: MsgItem[]
}

class Await extends React.Component<AwaitProps, AwaitStates> {
  state: AwaitStates = {
    msgList: [
      {
        key: '0',
        type: 'Notice',
        title: '通知通告',
        content: '12月4日下午3点全体操场集合,不得缺席或请假，提前20分钟进行队伍整体，班长清点 班级人员',
      },
      {
        key: '1',
        type: 'WarmPrompt',
        title: '温馨提示',
        content: '明日气温将会骤降，大家一定要注意添衣保暖，千万不要感冒了，打针很疼的',
      },
    ]
  };

  handleTo: (type: string) => void = (type) => {
    const { navigation } = this.props;
    navigation.navigate(type);
  }

  render() {
    const { navigation } = this.props;
    const { msgList } = this.state;

    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="0502监室" allowBack={false} backPage="Notice" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <TouchableNativeFeedback onPress={() => this.handleTo('Home')}>
          <View>
            <View style={AwaitStyles.timeBox}>
              <Text style={AwaitStyles.time}>15:20</Text>
              <Text style={AwaitStyles.date}>2019年12月3日 星期二</Text>
            </View>
            <View style={AwaitStyles.content}>
              <FlatList data={msgList} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.handleTo(item.type)}>
                  <View style={AwaitStyles.msgBox}>
                    <View style={AwaitStyles.titleBox}>
                      <Image source={awaitIconNotice} />
                      <Text style={AwaitStyles.msgTitle}>{item.title}</Text>
                    </View>
                    <Text style={AwaitStyles.msgContent}>{item.content}</Text>
                  </View>
                </TouchableOpacity>
              )} />
            </View>
          </View>

        </TouchableNativeFeedback>
      </ImageBackground>
    )
  }
}

export default connect()(Await);
