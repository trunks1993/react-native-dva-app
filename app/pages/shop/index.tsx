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

export interface ShopProps extends NavigationInjectedProps {
}

export interface ProductItem {
  title: string;
  price: number;
  stock: number;
  productId: string;
  imgUrl: string;
  categoryId: string;
}

export interface CategoryItem {
  categoryId: string;
  categoryName: string;
}

export interface ShopStates {
  productList: ProductItem[];
  totalPrice: number;
  carCount: number;
  selectCategory: string;
  categoryList: CategoryItem[];
}


class Shop extends React.Component<ShopProps, ShopStates> {
  state: ShopStates = {
    productList: [
      {
        categoryId: '1',
        title: '热销商品',
        price: 68.88,
        stock: 4,
        productId: '1',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '2',
        title: '休闲食品',
        price: 68.88,
        stock: 400,
        productId: '2',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '1',
        title: '热销商品',
        price: 68.88,
        stock: 400,
        productId: '3',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '1',
        title: '热销商品',
        price: 68.88,
        stock: 400,
        productId: '4',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '2',
        title: '休闲食品',
        price: 68.88,
        stock: 400,
        productId: '5',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '2',
        title: '休闲食品',
        price: 68.88,
        stock: 400,
        productId: '6',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '3',
        title: '冷冻冷藏',
        price: 68.88,
        stock: 400,
        productId: '7',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '3',
        title: '冷冻冷藏',
        price: 68.88,
        stock: 400,
        productId: '8',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '4',
        title: '洗化用品',
        price: 68.88,
        stock: 400,
        productId: '9',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '5',
        title: '纸类商品',
        price: 68.88,
        stock: 400,
        productId: '10',
        imgUrl: 'ttt.png',
      }, {
        categoryId: '6',
        title: '生活用品',
        price: 68.88,
        stock: 400,
        productId: '10',
        imgUrl: 'ttt.png',
      },
    ],
    categoryList: [
      {
        categoryId: '1',
        categoryName: '热销商品',
      }, {
        categoryId: '2',
        categoryName: '休闲食品',
      }, {
        categoryId: '3',
        categoryName: '冷冻冷藏',
      }, {
        categoryId: '4',
        categoryName: '洗化用品',
      }, {
        categoryId: '5',
        categoryName: '纸类商品',
      }, {
        categoryId: '6',
        categoryName: '生活用品',
      },
    ],
    totalPrice: 0,
    carCount: 0,
    selectCategory: '',
  }

  _flatList: React.ReactNode;
  
  _getRef = (flatList) => {
    this._flatList = flatList; 
    const reObj = this._flatList; 
    return reObj; 
  }

  handleItemTotalPriceChange: (preItemTotalPrice: number, itemTotalPrice: number, countVal: number) => void = (preItemTotalPrice, itemTotalPrice, countVal) => {
    const changePrice = itemTotalPrice - preItemTotalPrice;
    this.setState(produce((draft: Draft<ShopStates>, { }): void => {
      draft.totalPrice += changePrice;
      draft.carCount += countVal;
    }));
  };

  handleViewableItemsChange: (info: { viewableItems: any[]; changed: any[]; }) => void = (info) => {
    if(info.viewableItems.length === 0) return;
    this.setState(produce((draft: Draft<ShopStates>, { }): void => {
      draft.selectCategory = info.viewableItems[0].item.categoryId;
    }));
  };

  handleSetSelectCategory: (index: string, categoryId: string) => void = (index, categoryId) => {
    this.setState(produce((draft: Draft<ShopStates>, { }): void => {
      draft.selectCategory = categoryId;
    }));
    this._flatList.scrollToIndex({ index: index / 2 });
  };
  

  render() {
    const { navigation } = this.props;
    const { productList, totalPrice, carCount, categoryList, selectCategory } = this.state;
    const categoryMap = _.groupBy(productList, 'categoryId');
    
    const sortFormatProductList = [];
    _.map(_.values(categoryMap), (currentValue: any[]) => {
      // 如果currentValue 数组长度为奇数就push一个对象进去
      if(currentValue.length % 2 != 0) currentValue.push({ emptyView: true });
      _.map(currentValue, item => sortFormatProductList.push(item));
    })

    const indexMap = {};
    _.map(sortFormatProductList, (item, index) => {
      if(item.categoryId && indexMap[item.categoryId] === undefined) indexMap[item.categoryId] = index;
    })

    const isNextAdjoin: (index: number) => boolean = (index) => {
      const activeCategoryIndex = categoryList.findIndex(item => selectCategory === item.categoryId);
      return index === activeCategoryIndex + 1;
    }

    const isPreAdjoin: (index: number) => boolean = (index) => {
      const activeCategoryIndex = categoryList.findIndex(item => selectCategory === item.categoryId);
      return index === activeCategoryIndex - 1;
    }

    const product: React.FC<ProductItem> = (item) => {
      if(item.emptyView) {
        return <View style={ShopStyles.productItem}></View>
      }
      return (
        <ImageBackground source={shopBgItem} style={ShopStyles.productItem}>
          <Image source={shopImgInstance} style={ShopStyles.productItemImg} />
          <View style={ShopStyles.productItemContent}>
            <View style={ShopStyles.itemTitleBox}>
              <Text style={ShopStyles.itemTitle} numberOfLines={2}>{item.title}</Text>
            </View>
            <View style={ShopStyles.priceBox}>
              <Text style={{ fontSize: 18, color: '#FF4400' }}>￥</Text>
              <Text style={{ fontSize: 30, color: '#FF4400' }}>{item.price}</Text>
            </View>
            <View style={ShopStyles.stockBox}>
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>库存:{item.stock}份</Text>
              <StockCount price={item.price} totalStock={item.stock} onChange={this.handleItemTotalPriceChange} />
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
        <ImageBackground source={shopBgContent} style={ShopStyles.content}>
          <View style={ShopStyles.categoryBox}>
            <FlatList data={categoryList} keyExtractor={item => item.categoryId} renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.handleSetSelectCategory(indexMap[item.categoryId], item.categoryId)}>
                <View style={[selectCategory === item.categoryId ? ShopStyles.categoryItemActive : ShopStyles.categoryItem, isNextAdjoin(index) && ShopStyles.categoryItemAdjoinActiveNext, isPreAdjoin(index) && ShopStyles.categoryItemAdjoinActivePre]}>
                  <Text style={{ color: '#ffffff', fontSize: 20 }}>{item.categoryName}</Text>
                </View>
              </TouchableOpacity>
            )} />
          </View>
          <View style={ShopStyles.productBox}>
            <View style={ShopStyles.titleBox}>
              <Text style={ShopStyles.title}>冷冻冷藏</Text>
            </View>
            <View style={ShopStyles.product}>
              <FlatList ref={this._getRef} data={sortFormatProductList} columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 30 }} numColumns={2} horizontal={false} keyExtractor={item => item.productId} renderItem={({ item }) => product(item)} onViewableItemsChanged={this.handleViewableItemsChange} />
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
          <TouchableOpacity onPress={() => { navigation.navigate('Account') }}>
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
