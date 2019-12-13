import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { WarmPromptStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import warmBgModal from 'assets/images/warm-bg-modal.png';
import warmBgBtn from 'assets/images/warm-bg-btn.png';
import warmBgBtnDisabled from 'assets/images/warm-bg-btn-disabled.png';
import warmBgTitle from 'assets/images/warm-bg-title.png';

export interface WarmPromptProps {
  user: any;
}

class WarmPrompt extends React.Component<WarmPromptProps> {
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header navigate={navigation.navigate} title="温馨提示" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <ImageBackground source={warmBgModal} style={WarmPromptStyles.modal}>
            <ImageBackground source={warmBgTitle} style={WarmPromptStyles.titleBox}>
                <Text style={WarmPromptStyles.title}>温馨提示</Text>
            </ImageBackground>
            <Text style={WarmPromptStyles.content}>明日气温将会骤降，大家一定要注意添衣保暖，千万不要感冒了， 打针很疼的。</Text>
            <Text style={WarmPromptStyles.content}>2019-12-06  10:20:20</Text>
        </ImageBackground>
        <View style={WarmPromptStyles.btnBox}>
            <TouchableOpacity onPress={() => {}}>
                <ImageBackground source={warmBgBtn} style={WarmPromptStyles.btn}>
                    <Text style={WarmPromptStyles.btnText}>上一条</Text>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
                <ImageBackground source={warmBgBtn} style={[WarmPromptStyles.btn, {marginLeft: 150}]}>
                    <Text style={WarmPromptStyles.btnText}>下一条</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

export default connect()(WarmPrompt);
