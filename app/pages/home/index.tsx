import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, GestureResponderEvent } from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { HomeStyles } from 'styles/index.css'
import { NavigationInjectedProps } from 'react-navigation';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import bgTitle from 'assets/images/bg-title.png';

import homeBgBtn1 from 'assets/images/home-bg-btn1.png';
import homeBgBtn2 from 'assets/images/home-bg-btn2.png';
import homeBgBtn3 from 'assets/images/home-bg-btn3.png';
import homeBgBtn4 from 'assets/images/home-bg-btn4.png';
import homeBgBtn5 from 'assets/images/home-bg-btn5.png';
import homeBgBtn6 from 'assets/images/home-bg-btn6.png';
import homeBgBtn7 from 'assets/images/home-bg-btn7.png';

import produce from 'immer';

export interface HomeProps extends NavigationInjectedProps {
}

class Home extends React.Component<HomeProps> {

  state = {
    timer: null,
  }

  componentDidMount() {
    this.handleDebounce();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleDebounce = () => {
    this.timer = setTimeout(() => {
      const { navigation } = this.props;
      navigation.replace('Await');
    }, 10000);
  }

  handleResetDebouce: (e: GestureResponderEvent) => void = (e) => {
    this.timer && clearTimeout(this.timer);
    this.handleDebounce();
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <View onStartShouldSetResponder={this.handleResetDebouce}>
          <View style={HomeStyles.header}>
            <Image source={bgTitle} />
            <Text style={HomeStyles.headTitle}>首页</Text>
          </View>
          <View style={HomeStyles.clock}>
            <Text style={GlobalStyles.font_52}>15:20</Text>
            <Text style={GlobalStyles.font_20}>2019年12月3日 星期二</Text>
          </View>
          <ScrollView style={HomeStyles.scrollBox} horizontal={true}>
            <View style={HomeStyles.page}>
              <View style={HomeStyles.buttonBoxTop}>
                <ImageBackground source={homeBgBtn1} style={HomeStyles.backImg}>
                  <TouchableOpacity onPress={() => navigation.replace('Notice')}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn1.png')} />
                      <Text style={[{ fontSize: 28, color: '#70D6FC' }]}>通知通告</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={homeBgBtn2} style={[HomeStyles.backImg, HomeStyles.marginLR100]}>
                  <TouchableOpacity onPress={() => navigation.replace('Face', { redirctPage: 'Feeling' })}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn2.png')} />
                      <Text style={[{ fontSize: 28, color: '#F7D454' }]}>每日心情</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={homeBgBtn3} style={HomeStyles.backImg}>
                  <TouchableOpacity onPress={() => navigation.replace('WarmPrompt')}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn3.png')} />
                      <Text style={[{ fontSize: 28, color: '#68E3AF' }]}>温馨提示</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={HomeStyles.buttonBox}>
                <ImageBackground source={homeBgBtn4} style={HomeStyles.backImg}>
                  <TouchableOpacity onPress={() => navigation.replace('Face', { redirctPage: 'Order' })}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn4.png')} />
                      <Text style={[{ fontSize: 28, color: '#69DAD6' }]}>谈话预约</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={homeBgBtn5} style={[HomeStyles.backImg, HomeStyles.marginLR100]}>
                  <TouchableOpacity onPress={() => navigation.replace('Face', { redirctPage: 'Search' })}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn5.png')} />
                      <Text style={[{ fontSize: 28, color: '#CB99FA' }]}>信息查询</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={homeBgBtn7} style={HomeStyles.backImg}>
                  <TouchableOpacity onPress={() => navigation.replace('Shop')}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn7.png')} />
                      <Text style={[{ fontSize: 28, color: '#FBA163' }]}>商品点购</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>

            <View style={HomeStyles.page}>
              <View style={HomeStyles.buttonBoxTop}>
                <ImageBackground source={homeBgBtn6} style={HomeStyles.backImg}>
                  <TouchableOpacity onPress={() => navigation.replace('Living')}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn6.png')} />
                      <Text style={[{ fontSize: 28, color: '#FBA163' }]}>生活规范</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <View style={[HomeStyles.backImg, HomeStyles.marginLR100]}></View>
                <View style={HomeStyles.backImg}></View>
              </View>
              <View style={HomeStyles.buttonBoxTop}>
                <ImageBackground source={homeBgBtn6} style={HomeStyles.backImg}>
                  <TouchableOpacity onPress={() => navigation.replace('PaySuccess')}>
                    <View style={HomeStyles.btnView}>
                      <Image style={HomeStyles.btnImg} source={require('assets/images/home-icon-btn6.png')} />
                      <Text style={[{ fontSize: 28, color: '#FBA163' }]}>报警管理</Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <View style={[HomeStyles.backImg, HomeStyles.marginLR100]}></View>
                <View style={HomeStyles.backImg}></View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground >
    )
  }
}

export default connect(({ home }: ConnectState) => {
  return {
    user: home.user,
  }
})(Home);
