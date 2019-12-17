import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { produce, Draft } from 'immer';
import { NavigationInjectedProps } from 'react-navigation';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { OrderStyles } from 'styles/index.css';
import Header from 'components/Header';
import { TAB_POLICE_MAN, TAB_PRISON_AREA_LEADER, TAB_PRISON_LEADER, TAB_CONTROL_SYSTEM } from 'const';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import orderBgList from 'assets/images/order-bg-list.png';
import orderBgHead from 'assets/images/order-bg-head.png';
import systemImgHead from 'assets/images/system-img-head.png';

import orderBgBtn from 'assets/images/order-bg-btn.png';
import orderBgBtnActive from 'assets/images/order-bg-btn-active.png';

import orderIconBtn1 from 'assets/images/order-icon-btn1.png';
import orderIconBtn2 from 'assets/images/order-icon-btn2.png';
import orderIconBtn3 from 'assets/images/order-icon-btn3.png';
import orderIconBtn4 from 'assets/images/order-icon-btn4.png';

export interface OrderProps extends NavigationInjectedProps {
  user: any;
}

export interface OrderStates {
  dataMap: any;
  activeTab: string;
}

class Order extends React.Component<OrderProps, OrderStates> {
  state: OrderStates = {
    dataMap: {
      [TAB_POLICE_MAN]: [
        { name: '赵六 警员', key: 0 },
        { name: '张清 警员', key: 1 },
      ],
      [TAB_PRISON_AREA_LEADER]: [
        { name: '王五 监区长', key: 0 },
      ],
      [TAB_PRISON_LEADER]: [
        { name: '李四 监狱长', key: 0 },
      ],
      [TAB_CONTROL_SYSTEM]: [
        { name: '张三 督察长', key: 0 },
      ],
    },
    activeTab: TAB_POLICE_MAN,
  };

  handleSetActiveTab: (activeTab: string) => void = (activeTab) => {
    this.setState(produce((draft: Draft<OrderStates>, { }): void => {
      draft.activeTab = activeTab;
    }))
  };

  render() {
    const { navigation } = this.props;
    const { dataMap, activeTab } = this.state;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="谈话预约" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <TouchableOpacity onPress={() => { navigation.navigate('MyOrder') }}>
          <View style={OrderStyles.myOrderBox}>
            <Text style={OrderStyles.myOrder}>我的预约</Text>
          </View>
        </TouchableOpacity>
        <View style={OrderStyles.content}>
          <View style={OrderStyles.btnBox}>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_POLICE_MAN)}>
              <ImageBackground source={activeTab === TAB_POLICE_MAN ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn1} />
                <Text style={OrderStyles.btnText}>民警</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_PRISON_AREA_LEADER)}>
              <ImageBackground source={activeTab === TAB_PRISON_AREA_LEADER ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn2} />
                <Text style={OrderStyles.btnText}>监区领导</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_PRISON_LEADER)}>
              <ImageBackground source={activeTab === TAB_PRISON_LEADER ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn3} />
                <Text style={OrderStyles.btnText}>监狱领导</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleSetActiveTab(TAB_CONTROL_SYSTEM)}>
              <ImageBackground source={activeTab === TAB_CONTROL_SYSTEM ? orderBgBtnActive : orderBgBtn} style={OrderStyles.btn}>
                <Image style={{ width: 44, height: 44 }} source={orderIconBtn4} />
                <Text style={OrderStyles.btnText}>监督机关</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <ImageBackground source={orderBgList} style={OrderStyles.list}>
            <FlatList horizontal={false} numColumns={5} data={dataMap[activeTab]} renderItem={({ item, index }) => (
              <ImageBackground source={orderBgHead} style={[OrderStyles.headBox, (index % 5 != 0) && { marginLeft: 22 }]}>
                <Image source={systemImgHead} style={OrderStyles.head} />
                {/* <View style={OrderStyles.head}></View> */}
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
