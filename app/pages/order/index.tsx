import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { produce, Draft } from 'immer';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { OrderStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import orderBgList from 'assets/images/order-bg-list.png';
import orderBgHead from 'assets/images/order-bg-head.png';

import orderBgBtn from 'assets/images/order-bg-btn.png';
import orderBgBtnActive from 'assets/images/order-bg-btn-active.png';

import orderIconBtn1 from 'assets/images/order-icon-btn1.png';
import orderIconBtn2 from 'assets/images/order-icon-btn2.png';
import orderIconBtn3 from 'assets/images/order-icon-btn3.png';
import orderIconBtn4 from 'assets/images/order-icon-btn4.png';

export interface OrderProps {
  user: any;
}

class Order extends React.Component<OrderProps> {
  state = {
    list: [
      { name: '张清晓明 警员警员' , key: 0},
      { name: '张清晓明 警员警员' , key: 1},
      { name: '张清晓明 警员警员' , key: 2},
      { name: '张清晓明 警员警员' , key: 3},
      { name: '张清晓明 警员警员' , key: 4},
      { name: '张清晓明 警员警员' , key: 5},
      { name: '张清晓明 警员警员' , key: 6},
      { name: '张清晓明 警员警员' , key: 7},
      { name: '张清晓明 警员警员' , key: 8},
      { name: '张清晓明 警员警员' , key: 9},
      { name: '张清晓明 警员警员' , key: 10},
    ],
    activeTab: 1,
  };

  handleSetActiveTab = (activeTab) => {
    this.setState(produce((draft: Draft<NoticeStates>, { }): void => {
      draft.activeTab = activeTab;
    }))
  };

  render() {
    const { navigation } = this.props;
    const { list, activeTab } = this.state;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header navigate={navigation.navigate} title="谈话预约" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <TouchableOpacity onPress={() => { }}>
          <View style={OrderStyles.myOrderBox}>
            <Text style={OrderStyles.myOrder}>我的预约</Text>
          </View>
        </TouchableOpacity>
        <View style={OrderStyles.content}>
          <View style={OrderStyles.btnBox}>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(1)}>
              <ImageBackground source={activeTab === 1 ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn1} />
                <Text style={OrderStyles.btnText}>监区领导</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(2)}>
              <ImageBackground source={activeTab === 2 ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn2} />
                <Text style={OrderStyles.btnText}>监区领导</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(3)}>
              <ImageBackground source={activeTab === 3 ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn3} />
                <Text style={OrderStyles.btnText}>监狱领导</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(4)}>
              <ImageBackground source={activeTab === 4 ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn4} />
                <Text style={OrderStyles.btnText}>监督机关</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <ImageBackground source={orderBgList} style={OrderStyles.list}>
            <FlatList horizontal={false} numColumns={5} data={list} renderItem={({ item, index }) => (
              <ImageBackground source={orderBgHead} style={[OrderStyles.headBox, (index % 5 != 0) && { marginLeft: 22 }]}>
                {/* <Image source={orderBgHead} style={OrderStyles.head} /> */}
                <View style={OrderStyles.head}></View>
                <Text style={OrderStyles.headText}>{item.name}</Text>
              </ImageBackground>
            )} />
          </ImageBackground>
        </View>
      </ImageBackground>
    )
  }
}

export default connect()(Order);
