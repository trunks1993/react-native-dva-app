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

export interface ExamineTableProps {}

class ExamineTable extends React.Component<ExamineTableProps> {
  render() {
    const tableHead = [
      '考核分数',
      '考核日期',
      '劳动改造分',
      '劳动改造奖分',
      '劳动奖分原因',
      '劳动改造扣分',
      '劳动扣分原因',
      '教育改造分',
      '教育改造奖分',
      '教育奖分原因',
      '教育改造扣分',
      '教育扣分原因',
      '批准日期',
    ];
    const rows = [
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    ];
    return (
      <View style={SearchStyles.tableArea}>
        <View style={SearchStyles.tableBox}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#00C0FE'}}>
            <Row
              data={tableHead}
              style={SearchStyles.tableRow}
              textStyle={SearchStyles.tableHeadText}
            />
            {rows.map((item, index) => (
              <Row
                key={index}
                data={item}
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

export default ExamineTable;
