import * as React from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { NavigationInjectedProps } from "react-navigation";
import produce, { Draft } from 'immer';

import { connect } from 'react-redux';
import _ from 'lodash';
import Video from 'react-native-video';

import { ConnectState } from 'models/connect';
import GlobalStyles, { ShopStyles } from 'styles/index.css';
import LearningStyles from './index.css';

import Header from 'components/Header';
import StockCount from 'components/StockCount';

// 图片引入
import bgPage from 'assets/images/bg-page.png';




export interface VideoPlayProps extends NavigationInjectedProps {
}

export interface CategoryItemType {

}

export interface VideoPlayStates {

}

class VideoPlay extends React.Component<VideoPlayProps, VideoPlayStates> {



  render() {
    const { navigation } = this.props;
    let adress1 = "https://media.w3.org/2010/05/sintel/trailer.mp4";
    return (
        <Video source={{ uri: adress1 }}
          controls={true}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
    )
  }
}

export default connect()(VideoPlay);
