import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';

import {connect} from 'react-redux';
import {ConnectState} from 'models/connect';
import GlobalStyles, {ShopStyles} from 'styles/index.css';
import Header from 'components/Header';
import contPage from 'assets/images/contBg.png';
import PaySuccessImg from 'assets/images/pay-success-img.png';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import ListBackground from 'assets/images/shop-list-bg.png';
export interface PaySuccessProps extends NavigationInjectedProps {
  user: any;
}

class PaySuccess extends React.Component<PaySuccessProps> {
  state = {
    orderList: [
      {
        goodsImg: ListBackground,
        goodsInfo: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食 ',
        goodsPrice: '￥ 27.88',
        goodTotal: '12',
      },
      {
        goodsImg: ListBackground,
        goodsInfo: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食 ',
        goodsPrice: '￥ 27.88',
        goodTotal: '12',
      },
      {
        goodsImg: ListBackground,
        goodsInfo: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食 ',
        goodsPrice: '￥ 27.88',
        goodTotal: '12',
      },
      {
        goodsImg: ListBackground,
        goodsInfo: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食 ',
        goodsPrice: '￥ 27.88',
        goodTotal: '12',
      },
      {
        goodsImg: ListBackground,
        goodsInfo: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食 ',
        goodsPrice: '￥ 27.88',
        goodTotal: '12',
      },
    ],
  };
  render() {
    const {navigation} = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header
          replace={navigation.replace}
          title="点购成功"
          allowBack={true}
          backPage="Shop"
          titleRight="0502监室  |  2019年12月3日 星期二    15:20"
        />
        <View style={ShopStyles.paySuccessArea}>
          <ImageBackground source={contPage} style={ShopStyles.payContainer}>
            <View style={ShopStyles.paySuccessInfo}>
              <View style={ShopStyles.paySuccessInfoArea}>
                <Image
                  style={{width: 114, height: 114}}
                  source={PaySuccessImg}
                />
              </View>
              <View style={ShopStyles.paySuccessInfoArea}>
                <Text style={ShopStyles.paySuccessText}>点购成功</Text>
              </View>
              <View style={ShopStyles.paySuccessDetailArea}>
                <Text style={ShopStyles.paySuccessDetailText}>
                  订单编号：13251200000000012
                </Text>
                <Text style={ShopStyles.paySuccessDetailText}>
                  下单时间：2019-09-09 09:00:00
                </Text>
                <Text style={ShopStyles.paySuccessDetailText}>
                  实付金额：￥ 2479.68
                </Text>
              </View>
            </View>
            <ImageBackground
              source={ListBackground}
              style={ShopStyles.paySuccessList}>
              <ScrollView style={{height: 300}}>
                {this.state.orderList.map(e => (
                  <View style={ShopStyles.listItem}>
                    <View style={ShopStyles.itemLeftArea}>
                      <Image
                        style={{width: 80, height: 80}}
                        source={PaySuccessImg}
                      />
                      <Text
                        style={{
                          width: 150,
                          flexWrap: 'wrap',
                          color: '#fff',
                          fontSize: 14,
                        }}>
                        {e.goodsInfo}
                      </Text>
                    </View>
                    <Text style={{color: '#fff', fontSize: 14}}>
                      {e.goodsPrice}
                    </Text>
                    <Text style={{color: '#fff', fontSize: 14}}>
                      *{e.goodTotal}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </ImageBackground>
          </ImageBackground>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(PaySuccess);
