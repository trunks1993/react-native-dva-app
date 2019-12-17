import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { produce, Draft } from 'immer';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import { NavigationInjectedProps } from 'react-navigation';

import GlobalStyles, { SearchStyles } from 'styles/index.css';
import Header from 'components/Header';

import LinearGradient from 'react-native-linear-gradient';
import BaseTable from './BaseTable';
import ServingTable from './ServingTable';
import ExamineTable from './ExamineTable';

import { TAB_BASE_INFO, TAB_SERVING_INFO, TAB_EXAMINE_INFO } from 'const';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import systemImgHead from 'assets/images/system-img-head.png';
import baseInfo from 'assets/images/baseInfo.png';
import baseInfoActive from 'assets/images/baseInfo-active.png';
import xqInfo from 'assets/images/xqInfo.png';
import xqInfoActive from 'assets/images/xqInfo-active.png';
import scoreInfo from 'assets/images/scoreInfo.png';
import scoreInfoActive from 'assets/images/scoreInfo-active.png';
export interface SearchProps extends NavigationInjectedProps {
}

export interface SearchStates {
  activeTab: string,
  tabMap: { [key: string]: React.ReactNode }
}

class Search extends React.Component<SearchProps, SearchStates> {
  state: SearchStates = {
    activeTab: TAB_BASE_INFO,
    tabMap: {
      [TAB_BASE_INFO]: <BaseTable />,
      [TAB_SERVING_INFO]: <ServingTable />,
      [TAB_EXAMINE_INFO]: <ExamineTable />,
    }
  };
  
  handleSetActiveTab: (activeTab: string) => void = (activeTab) => {
    this.setState(produce((draft: Draft<SearchStates>, { }): void => {
      draft.activeTab = activeTab;
    }))
  };

  render() {
    const { navigation } = this.props;
    const { activeTab, tabMap } = this.state;
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
                  source={systemImgHead}
                />
              </View>
            </LinearGradient>
            <View
              style={{
                height: 425,
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_BASE_INFO)}>
                <View
                  style={
                    activeTab === TAB_BASE_INFO
                      ? SearchStyles.tabBtnActive
                      : SearchStyles.tabBtn
                  }>
                  <Image
                    style={{ width: 24, height: 18 }}
                    source={activeTab === TAB_BASE_INFO ? baseInfoActive : baseInfo}
                  />
                  <Text
                    style={
                      activeTab === TAB_BASE_INFO
                        ? SearchStyles.btnActiveText
                        : SearchStyles.btnText
                    }>
                    基本信息
                    </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_SERVING_INFO)}>
                <View
                  style={
                    activeTab === TAB_SERVING_INFO
                      ? SearchStyles.tabBtnActive
                      : SearchStyles.tabBtn
                  }>
                  <Image
                    style={{ width: 24, height: 18 }}
                    source={activeTab === TAB_SERVING_INFO ? xqInfoActive : xqInfo}
                  />
                  <Text
                    style={
                      activeTab === TAB_SERVING_INFO
                        ? SearchStyles.btnActiveText
                        : SearchStyles.btnText
                    }>
                    刑期信息
                    </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_EXAMINE_INFO)}>
                <View
                  style={
                    activeTab === TAB_EXAMINE_INFO
                      ? SearchStyles.tabBtnActive
                      : SearchStyles.tabBtn
                  }>
                  <Image
                    style={{ width: 24, height: 18 }}
                    source={activeTab === TAB_EXAMINE_INFO ? scoreInfoActive : scoreInfo}
                  />
                  <Text
                    style={
                      activeTab === TAB_EXAMINE_INFO
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
            {tabMap[activeTab]}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(Search);
