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
          <View style={ShopStyles.productItemContent}>
            <View style={ShopStyles.stockBox}>
              <View style={ShopStyles.itemTitleBox}>
                <Text style={ShopStyles.itemTitle} numberOfLines={2}>{item.title}</Text>
              </View>
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>¥68.88</Text>
              <StockCount price={item.price} totalStock={item.stock} onChange={this.handleItemTotalPriceChange} />
            </View>
          </View>
        </ImageBackground>
      );
    }

    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="商品支付" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <ImageBackground source={shopBgContent} style={ShopStyles.payContent}>
          <View style={{height: 60}}>
            <Text>test</Text>
          </View>
          <View style={{height: 540, paddingTop: 20,}}>
          <FlatList data={orderList} keyExtractor={item => item.productId}
            renderItem={({ item, index }) => orderItem(item)} />
          </View>
        </ImageBackground>
      </ImageBackground>
    )
  }
}

export default connect()(Pay);
