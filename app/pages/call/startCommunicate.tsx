import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import {connect} from 'react-redux';
import {ConnectState} from 'models/connect';
import GlobalStyles, {CallStyles} from 'styles/index.css';
import {NavigationInjectedProps} from 'react-navigation';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
// import LeftLight from 'assets/images/call-img-leftlight.png';
import LeftLight from 'assets/images/call-img-leftlight.gif';
import RightLight from 'assets/images/call-img-rightlight.gif';

export interface HomeProps extends NavigationInjectedProps {}

class startCommunicate extends React.Component<HomeProps> {
  state = {
    timer: null,
    msg: '正在建立通讯连接...',
  };

  componentDidMount() {
    this.handleDebounce();
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  handleDebounce = () => {
    this.timer = setTimeout(() => {
      this.setState({msg: '正在通讯中...'});
    }, 5000);
  };

  render() {
    const {navigation} = this.props;
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <ImageBackground
            source={LeftLight}
            style={CallStyles.leftlight}></ImageBackground>
          <View style={CallStyles.rightBox}>
            <TouchableOpacity onPress={() => navigation.replace('Home')}>
              <ImageBackground
                source={RightLight}
                style={CallStyles.rightlight}></ImageBackground>
            </TouchableOpacity>
            <Text style={{color: '#fff', fontSize: 23}}>{this.state.msg}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default connect(({home}: ConnectState) => {
  return {
    user: home.user,
  };
})(startCommunicate);
