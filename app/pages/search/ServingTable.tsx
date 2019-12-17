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

import {SearchStyles} from 'styles/index.css';

export interface ServingTableProps {}

class ServingTable extends React.Component<ServingTableProps> {
  render() {
    const tableHead = [
      '姓名',
      '罪名',
      '减刑前刑期',
      '减刑后刑期',
      '减刑原因',
      '生效日期',
    ];
    const tableData = [
      [
        '1李李',
        '贩毒、杀人、抢劫',
        '无期',
        '15年',
        '',
        '2019-11-29',
      ],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
    ];

    const rows = [
      ['罪名', '贩毒、杀人、抢劫', '刑期', '15年'],
      ['已服刑期', '15年', '剩余刑期', '1年'],
    ];

    const formatData = rows.map(itemArr =>
      itemArr.map((str, index) =>
        index % 2 !== 0 ? (
          <Text style={{color: '#ffffff', fontSize: 18, textAlign: 'center'}}>
            {str}
          </Text>
        ) : (
          str
        ),
      ),
    );

    return (
      <View style={SearchStyles.tableArea}>
        <LinearGradient
          start={{x: 0.1, y: 0}}
          end={{x: 0.9, y: 0}}
          colors={['rgba(7,166,255,1)', 'rgba(7,166,255,0)']}
          style={SearchStyles.tag}>
          <View style={SearchStyles.origin}></View>
          <Text style={SearchStyles.tagText}>刑期信息</Text>
        </LinearGradient>
        <View style={SearchStyles.tableBox}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#00C0FE'}}>
            {formatData.map((item, index) => (
              <Row
                key={index}
                data={item}
                flexArr={item.length === 4 && [1, 3, 1, 3]}
                style={SearchStyles.tableRow}
                textStyle={SearchStyles.tableHeadText}
              />
            ))}
          </Table>
        </View>
        <LinearGradient
          start={{x: 0.1, y: 0}}
          end={{x: 0.9, y: 0}}
          colors={['rgba(7,166,255,1)', 'rgba(7,166,255,0)']}
          style={SearchStyles.tag}>
          <View style={SearchStyles.origin}></View>
          <Text style={SearchStyles.tagText}>减刑记录</Text>
        </LinearGradient>
        <View style={SearchStyles.tableBox}>
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
    );
  }
}

export default ServingTable;
