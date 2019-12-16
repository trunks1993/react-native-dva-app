import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    padding: 60,
    flexDirection: 'row',
  },
  tabArea: {
    width: '15%',
    height: '100%',
    marginRight: 2,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  photoArea: {
    width: '100%',
    // height: 175,
    padding: 20,
    // backgroundColor: '#0579B9',
    borderColor: '#24A6FE',
    borderWidth: 1,
    borderRadius: 5,
  },
  tabBtn: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBtnActive: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E83EA',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: '#fff'
  },
  btnActiveText: {
    fontSize: 20,
    color: '#70F7FC'
  },
  tableArea: {
    // width: '85%',
    // height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  tableHeadText: {
    textAlign: 'center',
    color: '#70D6FC',
    fontSize: 16
  },
  tableContText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16
  },
  tableRow: {
    height: 40
  },
  origin: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    marginRight: 6,
    marginLeft: 15,
    borderRadius: 8,
  },
  tag: {
    width: 194,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  tagText: {
    color: '#fff',
    fontSize: 20,
  },
  tableBox: {
    paddingLeft: 30,
    paddingRight: 30,
  },
});
