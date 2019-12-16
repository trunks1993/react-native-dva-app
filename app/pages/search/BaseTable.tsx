import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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

import { SearchStyles } from 'styles/index.css';

class BaseTable extends React.Component<BaseTableProps> {

  render() {
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

    const rows =
      [
        ['姓名', '李三', '民族', '汉', '出生日期', '1988-9-26', '性别', '男'],
        ['婚姻', '未婚', '血型', 'AB型', '身高(cm)', '177', '体重(kg)', '80'],
        ['国籍', '中国', '户籍', '广东', '文化程度', '中专', '政治面貌', '群众'],
        ['编号', 'GDA123123123123', '入监日期', '2014-12-6'],
        ['关押监狱', '****监狱', '关押监区', '****监区'],
        ['关押监室', '***监室', '分配床位', '***床位'],
        ['证件类型', '身份证', '证件号码', '5647887545214454787'],
        ['户籍地址', '**省**市**区**街道**小区*栋*楼', '家庭住址', '**省**市**区**街道**小区*栋*楼'],
      ];

    const formatData = rows.map(itemArr => 
      itemArr.map((str, index) => index % 2 !== 0 ? (<Text style={{ color: '#ffffff', fontSize: 18, textAlign: 'center' }}>{str}</Text>) : str
    ))

    return (
      <View style={SearchStyles.tableArea}>
        <LinearGradient
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 0 }}
          colors={['rgba(7,166,255,1)', 'rgba(7,166,255,0)']}
          style={SearchStyles.tag}>
            <View style={SearchStyles.origin}></View>
            <Text style={SearchStyles.tagText}>基本信息</Text>
        </LinearGradient>
        <View style={SearchStyles.tableBox}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#00C0FE' }}>
            {
              formatData.map((item, index) => <Row key={index} data={item} flexArr={item.length === 4 && [1, 3, 1, 3]} style={SearchStyles.tableRow} textStyle={SearchStyles.tableHeadText} />)
            }
          </Table>
        </View>
        <LinearGradient
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 0 }}
          colors={['rgba(7,166,255,1)', 'rgba(7,166,255,0)']}
          style={SearchStyles.tag}>
            <View style={SearchStyles.origin}></View>
            <Text style={SearchStyles.tagText}>社会关系</Text>
        </LinearGradient>
        <View style={SearchStyles.tableBox}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#00C0FE' }}>
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
      </View >

    )
  }
}

export default BaseTable;
