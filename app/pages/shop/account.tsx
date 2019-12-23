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
import {produce, Draft} from 'immer';

import {connect} from 'react-redux';
import {ConnectState} from 'models/connect';
import GlobalStyles, {ShopStyles} from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import Person from 'assets/images/system-img-head.png';
import itemBorderBg from 'assets/images/shop-item-borderbg.png';
import Cancel from 'assets/images/shop-order-cancel.png';
import Done from 'assets/images/shop-order-done.png';
import Topay from 'assets/images/shop-order-topay.png';
import btnTopay from 'assets/images/shop-pay-btn.png';
import orderItembg from 'assets/images/shop-myorder-item-bg.png';
import LikeBorder from 'assets/images/shop-order-likeborder.png';
import GoodsImage from 'assets/images/shop-img-instance.png';

export interface AccountProps {
  activeTab: string;
  isWaitPay: boolean;
  records: Array<any>;
}

class Account extends React.Component<AccountProps> {
  state: AccountProps = {
    activeTab: 'TAB_BUY_LIST',
    isWaitPay: true,
    records: [
      {
        orderNum: '49841165401321231',
        orderTime: '2019-09-18 08:00:00',
        goodsTotalCount: 2478.68,
        payTime: '2019-09-18 08:00:00',
        goodsImgList: [
          {src: Person},
          {src: Person},
          {src: Person},
          {src: Person},
          {src: Person},
        ],
        goodsTotal: 40,
        status: 0,
      },
      {
        orderNum: '49841165401321231',
        orderTime: '2019-09-18 08:00:00',
        goodsTotalCount: 2478.68,
        payTime: '2019-09-18 08:00:00',
        goodsImgList: [{src: Person}, {src: Person}],
        goodsTotal: 40,
        status: 2,
      },
      {
        orderNum: '49841165401321231',
        orderTime: '2019-09-18 08:00:00',
        goodsTotalCount: 2478.68,
        payTime: '2019-09-18 08:00:00',
        goodsImgList: [],
        goodsTotal: 40,
        status: 1,
      },
    ],
  };
  handleSetActiveTab: (activeTab: string) => void = activeTab => {
    this.setState(
      produce((draft: Draft<AccountProps>, {}): void => {
        draft.activeTab = activeTab;
      }),
    );
  };

  render() {
    const {navigation} = this.props;
    const statusMap = {
      0: Cancel,
      1: Done,
      2: Topay,
    };
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header
          replace={navigation.replace}
          title="账户中心"
          allowBack={true}
          backPage="Shop"
          titleRight="0502监室  |  2019年12月3日 星期二    15:20"
        />
        <View style={ShopStyles.accountArea}>
          <View style={ShopStyles.personInfoArea}>
            <View style={ShopStyles.AccountPersonLeftArea}>
              <Image
                style={{width: 114, height: 160,marginRight: 30 ,position: 'relative', top: -18}}
                source={Person}
              />
              <View style={ShopStyles.personInfo}>
                <Text style={ShopStyles.personName}>李四</Text>
                <Text style={ShopStyles.personPosition}>5050监室</Text>
              </View>
            </View>
            <View style={ShopStyles.AccountPersonRightArea}>
              <View style={ShopStyles.personMoney}>
                <Text style={{fontSize: 20, color: '#fff'}}>账户余额：</Text>
                <Text style={{fontSize: 20, color: 'red'}}>￥2000</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.handleSetActiveTab('TAB_BUY_LIST')}>
                <View
                  style={
                    this.state.activeTab === 'TAB_BUY_LIST'
                      ? ShopStyles.tabBtnActive
                      : ShopStyles.tabBtn
                  }>
                  <Text
                    style={
                      this.state.activeTab === 'TAB_BUY_LIST'
                        ? ShopStyles.textActive
                        : ShopStyles.text
                    }>
                    点购记录
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleSetActiveTab('TAB_MY_ORDER')}>
                <View
                  style={
                    this.state.activeTab === 'TAB_MY_ORDER'
                      ? ShopStyles.tabBtnActive
                      : ShopStyles.tabBtn
                  }>
                  <Text
                    style={
                      this.state.activeTab === 'TAB_MY_ORDER'
                        ? ShopStyles.textActive
                        : ShopStyles.text
                    }>
                    我的账单
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={ShopStyles.goodsInfoArea}>
            <View style={ShopStyles.goodsInfoWrap}>
              <ScrollView style={{height: 400}}>
                {this.state.activeTab === 'TAB_BUY_LIST' &&
                  this.state.records.map((e: any) => (
                    <View style={{marginBottom: e.status === 2  ? 0 : 25}}>
                      <View style={ShopStyles.goodsItem}>
                        <ImageBackground
                          source={itemBorderBg}
                          style={ShopStyles.itemLeftBox}>
                          {/* <View> */}
                          <View style={ShopStyles.orderInfo}>
                            <Text style={ShopStyles.orderInfoText}>
                              订单编号：{e.orderNum}
                            </Text>
                            <Text style={ShopStyles.orderInfoText}>
                              下单时间：{e.orderTime}
                            </Text>
                            <Text style={ShopStyles.orderInfoText}>
                              应付金额：
                              <Text style={{color: 'red'}}>
                                ￥ {e.goodsTotalCount}
                              </Text>
                            </Text>
                            <Text style={ShopStyles.orderInfoText}>
                              支付时间：{e.payTime}
                            </Text>
                          </View>
                          <View style={ShopStyles.imgListArea}>
                            {e.goodsImgList.map((e: any) => (
                              <Image
                                style={{
                                  width: 77.6,
                                  height: 77.6,
                                  marginRight: 15,
                                }}
                                source={GoodsImage}
                              />
                            ))}
                          </View>
                          <View style={ShopStyles.TotalBox}>
                            <Text style={{fontSize: 18, color: '#fff'}}>
                              ￥{e.goodsTotalCount}
                            </Text>
                            <Text style={{fontSize: 18, color: '#fff'}}>
                              共 {e.goodsTotal} 件
                            </Text>
                          </View>
                          {/* </View> */}
                        </ImageBackground>
                        <ImageBackground
                          source={itemBorderBg}
                          style={ShopStyles.itemRightBox}>
                          <View>
                            <Image
                              style={{width: 89, height: 89}}
                              source={statusMap[e.status]}
                            />
                          </View>
                        </ImageBackground>
                      </View>
                      {e.status === 2 && (
                        <View style={ShopStyles.waitStatusArea}>
                          <Text style={{color: '#fff', marginRight: 10}}>
                            支付剩余时间：<Text style={{color: 'red'}}>29</Text>
                            分<Text style={{color: 'red'}}>59</Text>秒
                          </Text>
                          <TouchableOpacity onPress={() => {}}>
                            <ImageBackground
                              source={btnTopay}
                              style={{
                                width: 110,
                                height: 38,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                              }}>
                              <Text style={{color: '#fff'}}>立即支付</Text>
                            </ImageBackground>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => {}}>
                            <ImageBackground
                              source={btnTopay}
                              style={{
                                width: 110,
                                height: 38,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                              }}>
                              <Text style={{color: '#ccc'}}>取消支付</Text>
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ))}
                {this.state.activeTab === 'TAB_MY_ORDER' && (
                  <ImageBackground
                    source={orderItembg}
                    style={ShopStyles.orderItem}>
                    <View>
                      <Text style={ShopStyles.orderInfoText}>
                        创建时间：2019-12-18 19:00:00
                      </Text>
                      <Text style={ShopStyles.orderInfoText}>
                        账单类型：购物
                      </Text>
                      <Text style={ShopStyles.orderInfoText}>
                        账单明细：统一方便面 * 10
                      </Text>
                      <Text style={ShopStyles.orderInfoText}>
                        账单流水：48549845121321321351
                      </Text>
                    </View>
                    <View style={ShopStyles.payMoneyBox}>
                      <ImageBackground
                        source={LikeBorder}
                        style={ShopStyles.likeBorder}></ImageBackground>
                      <View style={ShopStyles.payMoney}>
                        <Text style={{color: '#fff', fontSize: 18}}>
                          {' '}
                          - ￥80
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(Account);
