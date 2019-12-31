import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";
import produce, { Draft } from 'immer';

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import GlobalStyles, { ShopStyles } from 'styles/index.css';
import Header from 'components/Header';
import { GoodsItem, count, add } from './index';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import shopBgContent from 'assets/images/shop-bg-content.png';
import payBgOrderItem from 'assets/images/pay-bg-order-item.png';
import shopImgInstance from 'assets/images/shop-img-instance.png';
import StockCount from 'components/StockCount';
import await from 'pages/await';

const token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..szka4dUeNuD7o2tT.bvMp3KnOeWPBqUb1vysoJY2aDjYP_77A7DSdqjh_hzhQb_y8DzpW2MSTBkOoYqhuYDVha32CB7rhwsnHdI1ZiXsYFkm2AEzHuJhcqUC6T303NKdr2cXK_iIdb6msDWKrqAO9-FAlUO2IBqF6K7m4v0GPF4_MyyFFyWLTphgaum6nRQYXX-0sYTiJtQDgMhezpOcmCEk-OrxC4q-s6yQSlAs_2cL82rSy3K_V9rDLXX3iEbFQrmm-zqq4HcBHH_SaTYDdQnMkRaZB0WmKSCIDhReiIB9-U2fpPEMXsjjndKzS4BVB9Q_Ft58TXVmS5muf5hbRhOGZ9GCIkC_8FuhRiRKuTvatVGdliboocGHeo7q4fPLUgjLsQJi5R6dBjCy7.Mc0UF-h0mXIgLA-v0Q9wrw'

export async function getShoppingList(): Promise<any> {
  try {
    const response = await fetch(`http://192.168.0.110:8081/terminal/v1/shopping/list`, {
      method: 'GET',
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

export async function deleteCar(shoppingCartId: string): Promise<any> {
  try {
    const response = await fetch(`http://192.168.0.110:8081/terminal/v1/shopping/${shoppingCartId}`, {
      method: 'DELETE',
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

export interface PayProps extends NavigationInjectedProps {
  user: any;
}

export interface PayStates {
  shopList: GoodsItem[];
  totalPrice: number;
  carCount: number;
}

class Pay extends React.Component<PayProps, PayStates> {
  state: PayStates = {
    shopList: [],
    carCount: 0,
    totalPrice: 0,
  };

  componentDidMount() {
    this.getShoppingList();
    this.count();
  }

  getShoppingList = async () => {
    const [err, data] = await getShoppingList();
    if (!err) {
      this.setState(produce((draft: Draft<PayStates>, { }): void => {
        draft.shopList = data.data.rows;
      }));
    }
  }

  count = async () => {
    const [err, data] = await count();
    if (!err) {
      this.setState(produce((draft: Draft<PayStates>, { }): void => {
        draft.totalPrice = data.data.goodsPrice;
        draft.carCount = data.data.buyNums;
      }));
    }
  }

  handleDelete: (shoppingCartId: string) => void = async (shoppingCartId) => {
    const [err, data] = await deleteCar(shoppingCartId);
    this.getShoppingList();
    this.count();
  }
  
  handleItemTotalPriceChange: (preItemTotalPrice: number, itemTotalPrice: number, countVal: number, goodsId: number) => void = (preItemTotalPrice, itemTotalPrice, countVal, goodsId) => {
    const changePrice = itemTotalPrice - preItemTotalPrice;
    this.setState(produce((draft: Draft<PayStates>, { }): void => {
      draft.totalPrice += changePrice;
      draft.carCount += countVal;
    }), async () => {
      const { carCount } = this.state;
      const [err, data] = await add(goodsId, carCount);
    });
  };

  render() {
    const { navigation } = this.props;
    const { shopList, totalPrice } = this.state;
    const goodsItem: React.FC<GoodsItem> = (item) => {
      return (
        <ImageBackground source={payBgOrderItem} style={ShopStyles.orederItem}>
          <Image source={shopImgInstance} style={ShopStyles.orderItemImg} />
          <View style={ShopStyles.orderItemContent}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={ShopStyles.itemTitleBox}>
                <Text style={ShopStyles.itemTitle} numberOfLines={2}>{item.goodsName}</Text>
              </View>
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginLeft: 134, marginRight: 180 }}>¥{item.goodsPrice}</Text>
              <StockCount initCount={item.buyNum} goodsId={item.goodsId} price={item.goodsPrice} totalStock={item.goodsStock} minCount={1} onChange={this.handleItemTotalPriceChange} />
              <TouchableOpacity onPress={() => this.handleDelete(item.shoppingCartId)}>
                <Text style={{ fontSize: 18, color: '#00CCFF', marginLeft: 160 }}>删除</Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 18 }}>
                库存：{item.goodsStock}份
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
            <FlatList data={shopList} keyExtractor={item => item.goodsId + ''}
              renderItem={({ item, index }) => goodsItem(item)} />
          </View>
        </ImageBackground>
        <View style={ShopStyles.footer}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#ffffff', marginLeft: 20 }}>合计金额:</Text>
            <Text style={{ fontSize: 18, color: '#FF4400', marginLeft: 10 }}>￥</Text>
            <Text style={{ fontSize: 30, color: '#FF4400' }}>{totalPrice}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.replace('Finger')}>
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
