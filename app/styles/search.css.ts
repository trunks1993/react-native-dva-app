import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: {
    width: 1140,
    height: 645,
    marginLeft: 60,
    marginTop: 40,
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabArea: {
    height: 645,
    width: 180,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  tableArea: {
    height: 645,
    marginLeft: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingTop: 10,
    paddingBottom: 10,
  },
  photoArea: {
    height: 222,
    borderColor: '#24A6FE',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtn: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtnActive: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E83EA',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
  },
  btnActiveText: {
    fontSize: 20,
    color: '#70F7FC',
    marginLeft: 10,
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
