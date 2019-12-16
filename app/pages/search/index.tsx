import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { SearchStyles } from 'styles/index.css';
import Header from 'components/Header';

import LinearGradient from 'react-native-linear-gradient';
import BaseTable from './BaseTable';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import baseInfo from 'assets/images/baseInfo.png';
import baseInfoActive from 'assets/images/baseInfo-active.png';
import xqInfo from 'assets/images/xqInfo.png';
import xqInfoActive from 'assets/images/xqInfo-active.png';
import scoreInfo from 'assets/images/scoreInfo.png';
import scoreInfoActive from 'assets/images/scoreInfo-active.png';
export interface SearchProps {
  user: any;
}

class Search extends React.Component<SearchProps> {
  state = {
    activeTab: 1,
  };
  handleSetActiveTab = activeTab => {
    this.setState({ activeTab });
  };
  render() {
    const { navigation } = this.props;
    const { activeTab } = this.state;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header
          navigate={navigation.navigate}
          title="信息查询"
          allowBack={true}
          backPage="Home"
          titleRight="0502监室  |  2019年12月3日 星期二    15:20"
        />
        <View style={SearchStyles.content}>
          <View style={SearchStyles.tabArea}>
            <LinearGradient
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0, y: 0.9 }}
              colors={['rgba(190,223,255,0)', 'rgba(5,121,185,1)']}>
              <View style={SearchStyles.photoArea}>
                <Image
                  style={{ width: 130, height: 175 }}
                  source={require('../../assets/images/bg-page.png')}
                />
              </View>
            </LinearGradient>
            <View
              style={{
                width: '100%',
                height: '50%',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => this.handleSetActiveTab(1)}>
                <View
                  style={
                    activeTab === 1
                      ? SearchStyles.tabBtnActive
                      : SearchStyles.tabBtn
                  }>
                  <Image
                    style={{ width: 24, height: 18 }}
                    source={activeTab === 1 ? baseInfoActive : baseInfo}
                  />
                  <Text
                    style={
                      activeTab === 1
                        ? SearchStyles.btnActiveText
                        : SearchStyles.btnText
                    }>
                    基本信息
                    </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleSetActiveTab(2)}>
                <View
                  style={
                    activeTab === 2
                      ? SearchStyles.tabBtnActive
                      : SearchStyles.tabBtn
                  }>
                  <Image
                    style={{ width: 24, height: 18 }}
                    source={activeTab === 2 ? xqInfoActive : xqInfo}
                  />
                  <Text
                    style={
                      activeTab === 2
                        ? SearchStyles.btnActiveText
                        : SearchStyles.btnText
                    }>
                    刑期信息
                    </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleSetActiveTab(3)}>
                <View
                  style={
                    activeTab === 3
                      ? SearchStyles.tabBtnActive
                      : SearchStyles.tabBtn
                  }>
                  <Image
                    style={{ width: 24, height: 18 }}
                    source={activeTab === 3 ? scoreInfoActive : scoreInfo}
                  />
                  <Text
                    style={
                      activeTab === 3
                        ? SearchStyles.btnActiveText
                        : SearchStyles.btnText
                    }>
                    计分考核
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <BaseTable />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(Search);
