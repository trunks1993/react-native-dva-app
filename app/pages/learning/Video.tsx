import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";
import produce, { Draft } from 'immer';

import { connect } from 'react-redux';
import _ from 'lodash';

import { ConnectState } from 'models/connect';
import GlobalStyles, { ShopStyles } from 'styles/index.css';
import LearningStyles from './index.css';

import Header from 'components/Header';
import StockCount from 'components/StockCount';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import shopBgContent from 'assets/images/shop-bg-content.png';
import shopBgItem from 'assets/images/shop-bg-item.png';
import shopImgInstance from 'assets/images/shop-img-instance.png';

import iconPlay from './images/icon-play.png';
import bgBtn from './images/bg-btn.png';

const token = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..szka4dUeNuD7o2tT.bvMp3KnOeWPBqUb1vysoJY2aDjYP_77A7DSdqjh_hzhQb_y8DzpW2MSTBkOoYqhuYDVha32CB7rhwsnHdI1ZiXsYFkm2AEzHuJhcqUC6T303NKdr2cXK_iIdb6msDWKrqAO9-FAlUO2IBqF6K7m4v0GPF4_MyyFFyWLTphgaum6nRQYXX-0sYTiJtQDgMhezpOcmCEk-OrxC4q-s6yQSlAs_2cL82rSy3K_V9rDLXX3iEbFQrmm-zqq4HcBHH_SaTYDdQnMkRaZB0WmKSCIDhReiIB9-U2fpPEMXsjjndKzS4BVB9Q_Ft58TXVmS5muf5hbRhOGZ9GCIkC_8FuhRiRKuTvatVGdliboocGHeo7q4fPLUgjLsQJi5R6dBjCy7.Mc0UF-h0mXIgLA-v0Q9wrw'

export async function getList(skillTypeId: number | string): Promise<any> {
  try {
    const response = await fetch(`http://192.168.0.110:8081/terminal/v1/skillLearning/selectLearningType?learningType=2&skillTypeId=${skillTypeId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return [null, data];
  } catch (err) {
    return [err]
  }
}

export async function getCategory(): Promise<any> {
  try {
    const response = await fetch('http://192.168.0.110:8081/terminal/v1/device/treeType/selectAll?treeType=5', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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


export interface VideoProps extends NavigationInjectedProps {
}

export interface ItemType {
  fatherId: number; // 父ID ,
  isDelete: number; // 是否删除 ,
  learningType: number; // 学习类型（1、借阅书籍，2、视频资料，3、文档资料） ,
  mainImg: string; // 主图 ,
  resourceAddr: string; // 资源地址 ,
  skillLearningId: string; // 主键ID ,
  skillName: string; // 技能名称 ,
  skillTypeId: number; // 技能类型（树形表） ,
  stock: number; // 库存 ,
  emptyView?: boolean;
}

export interface CategoryItemType {
  treeName: string; // 技能名称 ,
  treeTypeId: number; // 技能类型（树形表） ,
}

export interface VideoStates {
  list: ItemType[];
  totalPrice: number;
  carCount: number;
  selectCategory: number;
  categoryList: CategoryItemType[];
}

class Video extends React.Component<VideoProps, VideoStates> {
  state: VideoStates = {
    list: [],
    categoryList: [],
    totalPrice: 0,
    carCount: 0,
    selectCategory: -1,
  }

  _flatList: React.ReactNode;

  _getRef = (flatList: React.ReactNode) => {
    this._flatList = flatList;
    const reObj = this._flatList;
    return reObj;
  }

  async componentDidMount() {
    this.getCategory();
    this.getList();
  }

  getCategory: () => void = async () => {
    let [err, data] = await getCategory();
    if (!err) {
      this.setState(produce((draft: Draft<VideoStates>, { }): void => {
        draft.categoryList = data.data;
      }));
    }
  }

  getList: () => void = async () => {
    const { selectCategory } = this.state;
    const [err, data] = await getList(selectCategory > 0 ? selectCategory : '');
    console.log(data);
    if (!err) {
      this.setState(produce((draft: Draft<VideoStates>, { }): void => {
        draft.list = data?.data?.rows;
      }));
    }
  }

  handleItemTotalPriceChange: (preItemTotalPrice: number, itemTotalPrice: number, countVal: number, goodsId: number) => void = (preItemTotalPrice, itemTotalPrice, countVal, goodsId) => {
    const changePrice = itemTotalPrice - preItemTotalPrice;
    this.setState(produce((draft: Draft<VideoStates>, { }): void => {
      draft.totalPrice += changePrice;
      draft.carCount += countVal;
    }), async () => {
      const { carCount } = this.state;
      const [err, data] = await add(goodsId, carCount);
    });
  };

  handleSetSelectCategory: (categoryId: number) => void = (categoryId) => {
    this.setState(produce((draft: Draft<VideoStates>, { }): void => {
      draft.selectCategory = categoryId;
    }), () => this.getList());
  };


  render() {
    const { navigation } = this.props;
    const { list, totalPrice, carCount, categoryList, selectCategory } = this.state;

    const selectCate = _.find(categoryList, (item: CategoryItemType) => item.treeTypeId === selectCategory);
    const title = selectCate ? selectCate.dictLabel : '全部';
    const isNextAdjoin: (index: number) => boolean = (index) => {
      const activeCategoryIndex = _.findIndex(categoryList, (item: CategoryItemType) => selectCategory === item.treeTypeId);
      return index === activeCategoryIndex + 1;
    }

    const isPreAdjoin: (index: number) => boolean = (index) => {
      const activeCategoryIndex = _.findIndex(categoryList, (item: CategoryItemType) => selectCategory === item.treeTypeId);
      return index === activeCategoryIndex - 1;
    }

    const product: React.FC<ItemType> = (item) => {
      if (item.emptyView) {
        return <View style={ShopStyles.productItem}></View>
      }
      return (
        <ImageBackground source={shopBgItem} style={ShopStyles.productItem}>
          <Image source={shopImgInstance} style={ShopStyles.productItemImg} />
          <View style={ShopStyles.productItemContent}>
            <View style={ShopStyles.itemTitleBox}>
              <Text style={ShopStyles.itemTitle} numberOfLines={2}>{item.skillName}</Text>
            </View>
            <View style={LearningStyles.stockBox}>
              <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>共{item.stock}个视频</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.replace('VideoList', { skillTypeId: item.skillTypeId })}>
              <ImageBackground source={bgBtn} style={LearningStyles.bookItem}>
                <Image source={iconPlay} />
                <Text style={{fontSize: 22, color: '#ffffff', marginLeft: 10}}>播放</Text>
              </ImageBackground>
            </TouchableOpacity>
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
        <Header replace={navigation.replace} title="视频资料" allowBack={true} backPage="Learning" titleRight="0502监室  |  2019年12月3日 星期二    15:20" />

        <ImageBackground source={shopBgContent} style={[ShopStyles.content, { marginTop: 36 }]}>
          <View style={ShopStyles.categoryBox}>
            <FlatList data={categoryList} keyExtractor={item => item.treeTypeId + ''}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => this.handleSetSelectCategory(item.treeTypeId)}>
                  <View style={[selectCategory === item.treeTypeId ? ShopStyles.categoryItemActive : ShopStyles.categoryItem, isNextAdjoin(index) && ShopStyles.categoryItemAdjoinActiveNext, isPreAdjoin(index) && ShopStyles.categoryItemAdjoinActivePre]}>
                    <Text style={{ color: '#ffffff', fontSize: 20 }}>{item.treeName}</Text>
                  </View>
                </TouchableOpacity>
              )} />
          </View>
          <View style={ShopStyles.productBox}>
            <View style={ShopStyles.titleBox}>
              <Text style={ShopStyles.title}>{title}</Text>
            </View>
            <View style={ShopStyles.product}>
              <FlatList ref={this._getRef} data={list} columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 30 }} numColumns={2} horizontal={false} keyExtractor={item => item.skillLearningId} renderItem={({ item }) => product(item)} />
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    )
  }
}

export default connect()(Video);
