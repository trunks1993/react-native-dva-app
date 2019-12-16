import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {ConnectState} from 'models/connect';
import GlobalStyles, {OrderStyles} from 'styles/index.css';
import Header from 'components/Header';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import baseInfo from 'assets/images/baseInfo.png';
import baseInfoActive from 'assets/images/baseInfo-active.png';
import xqInfo from 'assets/images/xqInfo.png';
import xqInfoActive from 'assets/images/xqInfo-active.png';
import scoreInfo from 'assets/images/scoreInfo.png';
import scoreInfoActive from 'assets/images/scoreInfo-active.png';
export interface SearchProps {
  user: any;
}

class Mine extends React.Component<SearchProps> {
  state = {
    activeTab: 1,
  };
  handleSetActiveTab = activeTab => {
    this.setState({activeTab});
  };
  render() {
    const {navigation} = this.props;
    const {activeTab} = this.state;
    const tableHead = ['姓名', '关系', '工作单位', '住址', '联系电话'];
    const tableData = [
      [
        '1李李',
        '夫妻',
        '**省**科技有限公司',
        '**省**市**区**街道**小区*栋*楼 拷贝 2',
        '13655558598',
      ],
      [
        '1李李',
        '夫妻',
        '**省**科技有限公司',
        '**省**市**区**街道**小区*栋*楼 拷贝 2',
        '13655558598',
      ],
      [
        '1李李',
        '夫妻',
        '**省**科技有限公司',
        '**省**市**区**街道**小区*栋*楼 拷贝 2',
        '13655558598',
      ],
    ];
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header
          navigate={navigation.navigate}
          title="我的预约"
          allowBack={true}
          backPage="Home"
          titleRight="0502监室  |  2019年12月3日 星期二    15:20"
        />
        <View style={OrderStyles.content}>
            <View>
                
            </View>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(Mine);
