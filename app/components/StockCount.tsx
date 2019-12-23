import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, BVLinearGradient, Button, ToastAndroid } from 'react-native';
import { produce, Draft } from 'immer';
import { NavigationInjectedProps } from "react-navigation";

import { connect } from 'react-redux';
import { ConnectState } from 'models/connect';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyles from 'styles/index.css';
// 图片引入
import shopIconCut from 'assets/images/shop-icon-cut.png';
import shopIconPlus from 'assets/images/shop-icon-plus.png';
import shopIconCutDisabled from 'assets/images/shop-icon-cut-disabled.png';
import shopIconPlusDisabled from 'assets/images/shop-icon-plus-disabled.png';


export interface StockCountProps {
  totalStock: number;
  price: number;
  minCount?: number;
  onChange: (preItemTotalPrice: number, itemTotalPrice: number, countVal: number) => void;
}

export interface StockCountStates {
  count: number;
}

class StockCount extends React.Component<StockCountProps, StockCountStates> {

  state: StockCountStates = {
    count: 0,
  }

  componentDidMount() {
    const { minCount } = this.props;
    if(minCount) {
      this.setState(produce((draft: Draft<StockCountStates>, { }): void => {
        draft.count = minCount;
      }));
    }
  }

  handleCountChange: (countVal: number) => void = (countVal) => {
    const { totalStock, price, onChange, minCount } = this.props;
    const { count } = this.state;
    if(minCount && countVal === -1 && this.state.count === minCount) return ToastAndroid.show('数量不能少于' + count, ToastAndroid.SHORT);
    if(this.state.count === totalStock && countVal === 1) return ToastAndroid.show('已到最大库存', ToastAndroid.SHORT);
    this.setState(produce((draft: Draft<StockCountStates>, { }): void => {
      draft.count = draft.count + countVal;
    }), () => onChange(count * price, (count + countVal) * price, countVal));
  }

  render() {
    const { totalStock, price, onChange } = this.props;
    const { count } = this.state;
    return (
      <View style={GlobalStyles.stockCountTools}>
        {count > 0 && (<>
        <TouchableOpacity onPress={() => this.handleCountChange(-1)}>
          <Image source={shopIconCutDisabled} />
        </TouchableOpacity>
        <Text style={GlobalStyles.stockCount}>{count}</Text>
        </>)}
        <TouchableOpacity onPress={() => this.handleCountChange(1)}>
          <Image source={shopIconPlus} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default StockCount;

