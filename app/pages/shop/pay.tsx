import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { ShopStyles } from 'styles/index.css';
import Header from 'components/Header';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import shopBgContent from 'assets/images/shop-bg-content.png';
import payBgOrderItem from 'assets/images/pay-bg-order-item.png';
import shopImgInstance from 'assets/images/shop-img-instance.png';
import StockCount from 'components/StockCount';

export interface OrderItem {
  imgUrl: string;
  title: string;
  stock: number;
  price: number;
  count: number;
  productId: string;
}

export interface PayProps extends NavigationInjectedProps {
  user: any;
}

export interface PayStates {
  orderList: OrderItem[];
}

class Pay extends React.Component<PayProps, PayStates> {
  state: PayStates = {
    orderList: [
      {
        imgUrl: '',
        title: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食',
        stock: 400,
        price: 68.88,
        count: 12,
        productId: '1',
      }, {
        imgUrl: '',
        title: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食',
        stock: 400,
        price: 68.88,
        count: 12,
        productId: '2',
      }, {
        imgUrl: '',
        title: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食',
        stock: 400,
        price: 68.88,
        count: 12,
        productId: '3',
      }, {
        imgUrl: '',
        title: '船歌鱼水饺，速冻纯手工 包制舌尖海鲜饺子速食',
        stock: 400,
        price: 68.88,
        count: 12,
        productId: '4',
      },
    ]
  };

  handleItemTotalPriceChange = () => {

  }

  render() {
    const { navigation } = this.props;
    const { orderList } = this.state;

    const orderItem: React.FC<OrderItem> = (item) => {
      return (
        <ImageBackground source={payBgOrderItem} style={ShopStyles.orederItem}>
          <Image source={shopImgInstance} style={ShopStyles.orderItemImg} />
          <View style={ShopStyles.orderItemContent}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={ShopStyles.itemTitleBox}>
                <Text style={ShopStyles.itemTitle} numberOfLines={2}>{item.title}</Text>
              </View>
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginLeft: 134, marginRight: 150 }}>¥68.88</Text>
              <StockCount price={item.price} totalStock={item.stock} minCount={1} onChange={this.handleItemTotalPriceChange} />
              <Text style={{ fontSize: 18, color: '#00CCFF', marginLeft: 160 }}>删除</Text>
            </View>
            <View style={{}}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 18 }}>
                库存：{item.stock}份
              </Text>
            </View>
          </View>
        </ImageBackground>
      );
    }

    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="去支付" allowBack={true} backPage="Shop" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <ImageBackground source={shopBgContent} style={ShopStyles.payContent}>
          <View style={{ height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', width: 1044, paddingLeft: 20, borderBottomColor: 'rgba(26, 196, 198, 0.2)', borderBottomWidth: 1, }}>
            <Text style={{ color: '#ffffff', fontSize: 20 }}>商品</Text>
            <Text style={{ color: '#ffffff', fontSize: 20, marginLeft: 415 }}>单价</Text>
            <Text style={{ color: '#ffffff', fontSize: 20, marginLeft: 183 }}>数量</Text>
            <Text style={{ color: '#ffffff', fontSize: 20, marginLeft: 182 }}>操作</Text>
          </View>
          <View style={{ height: 540, paddingTop: 20, }}>
            <FlatList data={orderList} keyExtractor={item => item.productId}
              renderItem={({ item, index }) => orderItem(item)} />
          </View>
        </ImageBackground>
        <View style={ShopStyles.footer}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#ffffff', marginLeft: 20 }}>合计金额:</Text>
            <Text style={{ fontSize: 18, color: '#FF4400', marginLeft: 10 }}>￥</Text>
            <Text style={{ fontSize: 30, color: '#FF4400' }}>2479</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.replace('Face', { redirctPage: 'PaySuccess' })}>
            <View style={ShopStyles.footBtn}>
              <Text style={{ color: '#ffffff', fontSize: 20 }}>支付</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

export default connect()(Pay);
