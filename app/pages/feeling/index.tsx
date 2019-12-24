import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  Alert,
} from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { NavigationInjectedProps } from 'react-navigation';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { FeelingStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import feelingBgCalendar from 'assets/images/feeling-bg-calendar.png';
import inputBg from 'assets/images/notice-bg-list.png';

// 图片表情
import feelingIconAngry from 'assets/images/feeling-icon-angry.png';
import feelingIconAngrySelect from 'assets/images/feeling-icon-angry-select.png';

import feelingIconHappy from 'assets/images/feeling-icon-happy.png';
import feelingIconHappySelect from 'assets/images/feeling-icon-happy-select.png';

import feelingIconFear from 'assets/images/feeling-icon-fear.png';
import feelingIconFearSelect from 'assets/images/feeling-icon-fear-select.png';

import feelingIconSad from 'assets/images/feeling-icon-sad.png';
import feelingIconSadSelect from 'assets/images/feeling-icon-sad-select.png';

import FeelingBgBtn from 'assets/images/warm-bg-btn.png';

// 日历组件 中文替换
LocaleConfig.locales['fr'] = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
};
LocaleConfig.defaultLocale = 'fr';

// 日历组件 标记点的颜色
const vacation = {
  key: 'vacation',
  color: '#33D9B5',
  selectedDotColor: '#33D9B5',
};

export interface FeelingProps extends NavigationInjectedProps { }
export interface FeelingStates {
  select: number;
}

class Feeling extends React.Component<FeelingProps, FeelingStates> {
  state: FeelingStates = {
    select: 0,
  };
  handleSubmit = () => {
    Alert.alert('提交成功')
  };
  handleSelect = (sel) => {
    this.setState({
      select: sel,
    })
  }

  render() {
    const themeConfig = {
      calendarBackground: 'rgba(255, 255, 255, 0)',
      monthTextColor: '#ffffff',
      todayTextColor: '#FF0000',
      dayTextColor: '#ffffff',
      textDisabledColor: 'rgba(255, 255, 255, 0)',
      textDayFontSize: 18,
      textMonthFontSize: 20,
      textSectionTitleColor: '#70D6FC',
    };

    const { navigation } = this.props;
    const { select } = this.state;

    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <ScrollView keyboardShouldPersistTaps='never' keyboardDismissMode="on-drag">
          <Header
            replace={navigation.replace}
            title="每日心情"
            allowBack={true}
            backPage="Home"
            titleRight="0502监室  |  2019年12月3日 星期二    15:20"
          />
          <View style={FeelingStyles.content}>
            <ImageBackground
              source={feelingBgCalendar}
              style={FeelingStyles.calendar}>
              <Calendar
                style={{
                  // borderWidth: 1,
                  // borderColor: 'gray',
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  height: 430,
                }}
                theme={themeConfig}
                monthFormat={'yyyy年MM月'}
                markedDates={{
                  '2019-03-10': { selected: true, selectedColor: '#FFC1B5' },
                  '2019-03-11': {
                    dots: [vacation],
                    selected: true,
                    selectedColor: '#FFC1B5',
                  },
                  '2019-03-12': { dots: [vacation] },
                  '2019-03-13': { dots: [vacation] },
                }}
                markingType={'multi-dot'}
              />
            </ImageBackground>
            <View style={FeelingStyles.textAreaBox}>
              <View style={FeelingStyles.faceBox}>
                <TouchableNativeFeedback onPress={() => this.handleSelect(1)}>
                  <Image source={select === 1 ? feelingIconHappySelect : feelingIconHappy} />
                </TouchableNativeFeedback>
                <Text style={FeelingStyles.faceText}>开心</Text>
                <TouchableNativeFeedback onPress={() => this.handleSelect(2)}>
                  <Image source={select === 2 ? feelingIconFearSelect : feelingIconFear} />
                </TouchableNativeFeedback>
                <Text style={FeelingStyles.faceText}>恐惧</Text>
                <TouchableNativeFeedback onPress={() => this.handleSelect(3)}>
                  <Image source={select === 3 ? feelingIconAngrySelect : feelingIconAngry} />
                </TouchableNativeFeedback>
                <Text style={FeelingStyles.faceText}>愤怒</Text>
                <TouchableNativeFeedback onPress={() => this.handleSelect(4)}>
                  <Image source={select === 4 ? feelingIconSadSelect : feelingIconSad} />
                </TouchableNativeFeedback>
                <Text style={FeelingStyles.faceText}>悲伤</Text>
              </View>
              <ImageBackground
                imageStyle={{ resizeMode: 'stretch' }}
                source={inputBg}
                style={FeelingStyles.textArea}>
                <TextInput
                  style={FeelingStyles.input}
                  multiline={true}
                  onBlur={() => {}}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={FeelingStyles.btnBox}>
            <TouchableOpacity onPress={this.handleSubmit}>
              <ImageBackground source={FeelingBgBtn} style={FeelingStyles.btn}>
                <Text style={FeelingStyles.btnText}>提交</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </ImageBackground>
    );
  }
}

export default connect()(Feeling);
