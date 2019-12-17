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
} from 'react-native-table-component';
import LinearGradient from 'react-native-linear-gradient';

// 图片引入
import bgPage from 'assets/images/bg-page.png';
import contPage from 'assets/images/contBg.png';
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
    pageTotal: 50,
  };
  elementButton = (value: any) => {
    if (value === 1) {
      return (
        <View>
          <Text style={{color: '#7AFC70', textAlign: 'center'}}>待谈话</Text>
        </View>
      );
    } else if (value === 2) {
      return (
        <View>
          <Text style={{color: '#959595', textAlign: 'center'}}>已取消</Text>
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row',justifyContent: 'center' }}>
        <Text style={{color: '#F9D34F', marginRight: 20}}>安排中</Text>
        <Text style={{color: '#CD2B2B', textDecorationLine:'underline', textDecorationColor: '#CD2B2B' }}>取消</Text>
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    const tableHead = [
      '预约对象',
      '职务',
      '姓名',
      '预约时间',
      '预约状态',
      '安排谈话时间',
      '谈话结束时间',
    ];
    const tableData = [
      [
        '民警',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(1),
        '2019-12-05 15:00:00',
        '2019-12-05 15:00:00',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(2),
        '- -',
        '- -',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(3),
        '- -',
        '- -',
      ],[
        '民警',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(1),
        '2019-12-05 15:00:00',
        '2019-12-05 15:00:00',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(2),
        '- -',
        '- -',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(3),
        '- -',
        '- -',
      ],[
        '民警',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(1),
        '2019-12-05 15:00:00',
        '2019-12-05 15:00:00',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(2),
        '- -',
        '- -',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(3),
        '- -',
        '- -',
      ],[
        '民警',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(1),
        '2019-12-05 15:00:00',
        '2019-12-05 15:00:00',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(2),
        '- -',
        '- -',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(3),
        '- -',
        '- -',
      ],[
        '民警',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(1),
        '2019-12-05 15:00:00',
        '2019-12-05 15:00:00',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(2),
        '- -',
        '- -',
      ],
      [
        '监区领导',
        '警员',
        '李四',
        '2019-12-05 15:00:00',
        this.elementButton(3),
        '- -',
        '- -',
      ],
    ];
    return (
      <ImageBackground source={bgPage} style={GlobalStyles.container}>
        <Header
          replace={navigation.replace}
          title="我的预约"
          allowBack={true}
          backPage="Home"
          titleRight="0502监室  |  2019年12月3日 星期二    15:20"
        />
        <View style={OrderStyles.mo_content}>
          <ImageBackground source={contPage} style={OrderStyles.tableContainer}>
            <View style={OrderStyles.tableArea}>
              <View style={{ flexDirection: 'row-reverse' }}>
                <Text style={{color: '#70D6FC'}}>
                  共{' '}
                  <Text style={{color: '#FFAE00'}}>{this.state.pageTotal}</Text>{' '}
                  条
                </Text>
              </View>
              <ScrollView style={{ height: 500}}>

              <Table borderStyle={{borderWidth: 2, borderColor: '#00C0FE'}}>
                <Row
                  data={tableHead}
                  flexArr={[2, 1, 1, 3, 2, 3, 3]}
                  style={OrderStyles.tableRow}
                  textStyle={OrderStyles.tableHeadText}
                />
                    {tableData.map((rowData, index) => (
                    <Row
                        key={index}
                        data={rowData}
                        flexArr={[2, 1, 1, 3, 2, 3, 3]}
                        style={OrderStyles.tableRow}
                        textStyle={OrderStyles.tableContText}
                    />
                    ))}
                
              </Table>
              </ScrollView>

            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(Mine);
