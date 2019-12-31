import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";
import { NativeModules, NativeEventEmitter } from "react-native";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { FaceStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import faceImgCard from 'assets/images/face-img-card.png';
import faceIconOr from 'assets/images/face-icon-or.png';
import faceImgFinger from 'assets/images/face-img-finger.png';
const token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..szka4dUeNuD7o2tT.bvMp3KnOeWPBqUb1vysoJY2aDjYP_77A7DSdqjh_hzhQb_y8DzpW2MSTBkOoYqhuYDVha32CB7rhwsnHdI1ZiXsYFkm2AEzHuJhcqUC6T303NKdr2cXK_iIdb6msDWKrqAO9-FAlUO2IBqF6K7m4v0GPF4_MyyFFyWLTphgaum6nRQYXX-0sYTiJtQDgMhezpOcmCEk-OrxC4q-s6yQSlAs_2cL82rSy3K_V9rDLXX3iEbFQrmm-zqq4HcBHH_SaTYDdQnMkRaZB0WmKSCIDhReiIB9-U2fpPEMXsjjndKzS4BVB9Q_Ft58TXVmS5muf5hbRhOGZ9GCIkC_8FuhRiRKuTvatVGdliboocGHeo7q4fPLUgjLsQJi5R6dBjCy7.Mc0UF-h0mXIgLA-v0Q9wrw'

export async function addOrder(): Promise<any> {
  try {
    const response = await fetch(`http://192.168.0.110:8081/terminal/v1/order/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token,
      },
    });
    const data = await response.json();
    return [null, data];
  } catch (err) {
    return [err]
  }
}

export interface FaceProps extends NavigationInjectedProps {
}

class Face extends React.Component<FaceProps> {
  
  componentDidMount() {
    NativeModules.FingerModule.compare();
    const eventEmitter = new NativeEventEmitter(NativeModules.FingerModule);
    eventEmitter.addListener('finger', this.handleListenCallBack);
  }

  componentWillUnmount() {
    const eventEmitter = new NativeEventEmitter(NativeModules.FingerModule);
    eventEmitter.removeListener('finger', this.handleListenCallBack);
  }

  handleListenCallBack = async (event: any) => {
    const { navigation } = this.props;
    ToastAndroid.show("认证成功", ToastAndroid.SHORT);
    const data = await addOrder();
    navigation.replace('paySuccess');
  }

  render() {
    const { navigation } = this.props;
    const backPage = navigation.getParam('backPage');
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="认证" allowBack={true} backPage={backPage ? backPage : "Pay"} titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <View style={FaceStyles.content}>
          <Image source={faceImgCard}/>
          <Image source={faceIconOr}/>
          <Image source={faceImgFinger}/>
        </View>
      </ImageBackground>
    )
  }
}

export default connect()(Face);
