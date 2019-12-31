import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import _ from 'lodash';

import { ConnectState } from 'models/connect';
import GlobalStyles, { ShopStyles } from 'styles/index.css';
import Header from 'components/Header';
import StockCount from 'components/StockCount';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import shopBgContent from 'assets/images/shop-bg-content.png';
import shopBgItem from 'assets/images/shop-bg-item.png';
import shopImgInstance from 'assets/images/shop-img-instance.png';
import shopImgCar from 'assets/images/shop-img-car.png';

import { FlatList } from 'react-native-gesture-handler';
import produce, { Draft } from 'immer';
const token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..szka4dUeNuD7o2tT.bvMp3KnOeWPBqUb1vysoJY2aDjYP_77A7DSdqjh_hzhQb_y8DzpW2MSTBkOoYqhuYDVha32CB7rhwsnHdI1ZiXsYFkm2AEzHuJhcqUC6T303NKdr2cXK_iIdb6msDWKrqAO9-FAlUO2IBqF6K7m4v0GPF4_MyyFFyWLTphgaum6nRQYXX-0sYTiJtQDgMhezpOcmCEk-OrxC4q-s6yQSlAs_2cL82rSy3K_V9rDLXX3iEbFQrmm-zqq4HcBHH_SaTYDdQnMkRaZB0WmKSCIDhReiIB9-U2fpPEMXsjjndKzS4BVB9Q_Ft58TXVmS5muf5hbRhOGZ9GCIkC_8FuhRiRKuTvatVGdliboocGHeo7q4fPLUgjLsQJi5R6dBjCy7.Mc0UF-h0mXIgLA-v0Q9wrw'

export async function getGoods(goodsType: string): Promise<any> {
  try {
    const response = await fetch(`http://192.168.0.110:8081/terminal/v1/goods/list?goodsType=${goodsType}`, {
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

export async function getGoodTypes(): Promise<any> {
  try {
    const response = await fetch('http://192.168.0.110:8081/terminal/v1/dictionaries/dictData/selectByDictType?dictType=goods_type', {
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

export async function count(): Promise<any> {
  try {
    const response = await fetch('http://192.168.0.110:8081/terminal/v1/shopping/count', {
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

export async function add(goodsId: number, buyNum: number): Promise<any> {
  try {
    const response = await fetch(`http://192.168.0.110:8081/terminal/v1/shopping/add?goodsId=${goodsId}&buyNum=${buyNum}`, {
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


export interface ShopProps extends NavigationInjectedProps {
}

export interface GoodsItem {
  goodsId: number;
  goodsMainImg: string;
  goodsName: string;
  goodsPrice: number;
  goodsStock: number;
  goodsType: number;
  emptyView?: boolean;
  shoppingCartId: string;
  buyNum: number;
}

export interface CategoryItem {
  dictLabel: string;
  dictValue: string;
}

export interface ShopStates {
  Goods: GoodsItem[];
  totalPrice: number;
  carCount: number;
  selectCategory: string;
  categoryList: CategoryItem[];
}

class Shop extends React.Component<ShopProps, ShopStates> {
  state: ShopStates = {
    Goods: [],
    categoryList: [],
    totalPrice: 0,
    carCount: 0,
    selectCategory: '',
  }

  _flatList: React.ReactNode;

  _getRef = (flatList: React.ReactNode) => {
    this._flatList = flatList;
    const reObj = this._flatList;
    return reObj;
  }

  async componentDidMount() {
    let [err, data] = await getGoodTypes();
    if (!err) {
      this.setState(produce((draft: Draft<ShopStates>, { }): void => {
        draft.categoryList = data.data;
      }));
    }
    this.getGoodsList();
    [err, data] = await count();
    if (!err) {
      this.setState(produce((draft: Draft<ShopStates>, { }): void => {
        draft.totalPrice = data.data.goodsPrice;
        draft.carCount = data.data.buyNums;
      }));
    }
  }

  getGoodsList: () => void = async () => {
    const { selectCategory } = this.state;
    const [err, data] = await getGoods(selectCategory);
    if (!err) {
      this.setState(produce((draft: Draft<ShopStates>, { }): void => {
        draft.Goods = data.data.rows;
      }));
    }
  }

  handleItemTotalPriceChange: (preItemTotalPrice: number, itemTotalPrice: number, countVal: number, goodsId: number) => void = (preItemTotalPrice, itemTotalPrice, countVal, goodsId) => {
    const changePrice = itemTotalPrice - preItemTotalPrice;
    this.setState(produce((draft: Draft<ShopStates>, { }): void => {
      draft.totalPrice += changePrice;
      draft.carCount += countVal;
    }), async () => {
      const { carCount } = this.state;
      const [err, data] = await add(goodsId, carCount);
      console.log(data);
    });
  };

  handleSetSelectCategory: (categoryId: string) => void = (categoryId) => {
    this.setState(produce((draft: Draft<ShopStates>, { }): void => {
      draft.selectCategory = categoryId;
    }), () => this.getGoodsList());
  };


  render() {
    const { navigation } = this.props;
    const { Goods, totalPrice, carCount, categoryList, selectCategory } = this.state;

    const selectCate = _.find(categoryList, (item: CategoryItem) => item.dictValue === selectCategory);
    const title = selectCate ? selectCate.dictLabel : '全部';
    const isNextAdjoin: (index: number) => boolean = (index) => {
      const activeCategoryIndex = _.findIndex(categoryList, (item: CategoryItem) => selectCategory === item.dictValue);
      return index === activeCategoryIndex + 1;
    }

    const isPreAdjoin: (index: number) => boolean = (index) => {
      const activeCategoryIndex = _.findIndex(categoryList, (item: CategoryItem) => selectCategory === item.dictValue);
      return index === activeCategoryIndex - 1;
    }

    const product: React.FC<GoodsItem> = (item) => {
      if (item.emptyView) {
        return <View style={ShopStyles.productItem}></View>
      }
      return (
        <ImageBackground source={shopBgItem} style={ShopStyles.productItem}>
          <Image source={shopImgInstance} style={ShopStyles.productItemImg} />
          <View style={ShopStyles.productItemContent}>
            <View style={ShopStyles.itemTitleBox}>
              <Text style={ShopStyles.itemTitle} numberOfLines={2}>{item.goodsName}</Text>
            </View>
            <View style={ShopStyles.priceBox}>
              <Text style={{ fontSize: 18, color: '#FF4400' }}>￥</Text>
              <Text style={{ fontSize: 30, color: '#FF4400' }}>{item.goodsPrice}</Text>
            </View>
            <View style={ShopStyles.stockBox}>
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>库存:{item.goodsStock}份</Text>
              <StockCount initCount={item.buyNum} goodsId={item.goodsId} price={item.goodsPrice} totalStock={item.goodsStock} onChange={this.handleItemTotalPriceChange} />
            </View>
          </View>
        </ImageBackground>
      );
    }

    const VIEWABILITY_CONFIG = {
      minimumViewTime: 10,
      viewAreaCoveragePercentThreshold: 100,
      waitForInteraction: true,
    };

    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header replace={navigation.replace} title="商品点购" allowBack={true} backPage="Home" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />
        <TouchableOpacity onPress={() => navigation.replace('Face', { redirctPage: 'Account', backPage: 'Shop' })}>
          <View style={{ alignItems: 'flex-end', paddingRight: 96 }}>
            <Text style={{ color: '#37C5E6', fontSize: 18 }}>账户中心</Text>
          </View>
        </TouchableOpacity>
        <ImageBackground source={shopBgContent} style={[ShopStyles.content, { marginTop: 5 }]}>
          <View style={ShopStyles.categoryBox}>
            <FlatList data={categoryList} keyExtractor={item => item.dictValue}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => this.handleSetSelectCategory(item.dictValue)}>
                  <View style={[selectCategory === item.dictValue ? ShopStyles.categoryItemActive : ShopStyles.categoryItem, isNextAdjoin(index) && ShopStyles.categoryItemAdjoinActiveNext, isPreAdjoin(index) && ShopStyles.categoryItemAdjoinActivePre]}>
                    <Text style={{ color: '#ffffff', fontSize: 20 }}>{item.dictLabel}</Text>
                  </View>
                </TouchableOpacity>
              )} />
          </View>
          <View style={ShopStyles.productBox}>
            <View style={ShopStyles.titleBox}>
              <Text style={ShopStyles.title}>{title}</Text>
            </View>
            <View style={ShopStyles.product}>
              <FlatList ref={this._getRef} data={Goods} columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 30 }} numColumns={2} horizontal={false} keyExtractor={item => item.goodsId + ''} renderItem={({ item }) => product(item)} />
            </View>
          </View>
        </ImageBackground>
        <View style={ShopStyles.footer}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <ImageBackground source={shopImgCar} style={ShopStyles.shopImgCar}>
              <Text style={ShopStyles.shopCarCount}>{carCount}</Text>
            </ImageBackground>
            <Text style={{ fontSize: 18, color: '#ffffff', marginLeft: 20 }}>合计金额:</Text>
            <Text style={{ fontSize: 18, color: '#FF4400', marginLeft: 10 }}>￥</Text>
            <Text style={{ fontSize: 30, color: '#FF4400' }}>{totalPrice}</Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate('Pay') }}>
            <View style={ShopStyles.footBtn}>
              <Text style={{ color: '#ffffff', fontSize: 20 }}>去支付</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

export default connect()(Shop);
