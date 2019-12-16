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
import GlobalStyles, {SearchStyles} from 'styles/index.css';
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

class Search extends React.Component<SearchProps> {
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
          title="信息查询"
          allowBack={true}
          backPage="Home"
          titleRight="0502监室  |  2019年12月3日 星期二    15:20"
        />
        <View style={SearchStyles.content}>
          <View style={SearchStyles.area}>
            <View style={SearchStyles.tabArea}>
              <LinearGradient
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 0.9}}
                colors={['rgba(190,223,255,0)', 'rgba(5,121,185,1)']}>
                <View style={SearchStyles.photoArea}>
                  <Image
                    style={{width: 130, height: 175}}
                    source={require('../../assets/images/bg-page.png')}
                  />
                </View>
              </LinearGradient>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity onPress={() => this.handleSetActiveTab(1)}>
                  <View
                    style={
                      activeTab === 1
                        ? SearchStyles.tabBtnActive
                        : SearchStyles.tabBtn
                    }>
                    <Image
                      style={{width: 24, height: 18}}
                      source={activeTab === 1 ? baseInfoActive : baseInfo}
                    />
                    <Text
                      style={
                        activeTab === 1
                          ? SearchStyles.btnActiveText
                          : SearchStyles.btnText
                      }>
                      基本信息
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleSetActiveTab(2)}>
                  <View
                    style={
                      activeTab === 2
                        ? SearchStyles.tabBtnActive
                        : SearchStyles.tabBtn
                    }>
                    <Image
                      style={{width: 24, height: 18}}
                      source={activeTab === 2 ? xqInfoActive : xqInfo}
                    />
                    <Text
                      style={
                        activeTab === 2
                          ? SearchStyles.btnActiveText
                          : SearchStyles.btnText
                      }>
                      刑期信息
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleSetActiveTab(3)}>
                  <View
                    style={
                      activeTab === 3
                        ? SearchStyles.tabBtnActive
                        : SearchStyles.tabBtn
                    }>
                    <Image
                      style={{width: 24, height: 18}}
                      source={activeTab === 3 ? scoreInfoActive : scoreInfo}
                    />
                    <Text
                      style={
                        activeTab === 3
                          ? SearchStyles.btnActiveText
                          : SearchStyles.btnText
                      }>
                      计分考核
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={SearchStyles.tableArea}>
              <LinearGradient
                start={{x: 0.1, y: 0}}
                end={{x: 0.9, y: 0}}
                colors={['rgba(7,166,255,1)', 'rgba(7,166,255,0)']}
                style={{width: 194.1, marginBottom: 20}}>
                <View
                  style={{
                    width: 194.1,
                    height: 38.6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: '#fff',
                      marginRight: 20,
                      marginLeft: 5,
                      borderRadius: 8,
                    }}></View>
                  <Text style={{color: '#fff', fontSize: 20}}>基本信息</Text>
                </View>
              </LinearGradient>
              <LinearGradient
                start={{x: 0.1, y: 0}}
                end={{x: 0.9, y: 0}}
                colors={['rgba(7,166,255,1)', 'rgba(7,166,255,0)']}
                style={{width: 194.1, marginBottom: 20}}>
                <View
                  style={{
                    width: 194.1,
                    height: 38.6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: '#fff',
                      marginRight: 20,
                      marginLeft: 5,
                      borderRadius: 8,
                    }}></View>
                  <Text style={{color: '#fff', fontSize: 20}}>社会关系</Text>
                </View>
              </LinearGradient>
              <View style={{padding: 20}}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#00C0FE'}}>
                  <Row
                    data={tableHead}
                    flexArr={[1, 1, 2, 3, 2]}
                    style={SearchStyles.tableRow}
                    textStyle={SearchStyles.tableHeadText}
                  />
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      flexArr={[1, 1, 2, 3, 2]}
                      style={SearchStyles.tableRow}
                      textStyle={SearchStyles.tableContText}
                    />
                  ))}
                </Table>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(Search);
