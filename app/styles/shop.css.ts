import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    width: 1120,
    height: 600,
    marginLeft: 80,
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
  },
  payContent: {
    width: 1120,
    height: 600,
    marginLeft: 80,
    marginTop: 35,
    alignItems: 'center',
  },
  categoryBox: {
    width: 170,
  },
  categoryItem: {
    height: 99,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  categoryItemActive: {
    height: 99,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  categoryItemAdjoinActiveNext: {
    borderTopRightRadius: 15,
  },
  categoryItemAdjoinActivePre: {
    borderBottomRightRadius: 15,
  },
  productBox: {
    flex: 1,
    // backgroundColor: 'red',
    paddingLeft: 38,
    paddingRight: 40,
  },
  titleBox: {
    height: 83,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(72, 246, 252, 0.5)',
    paddingTop: 40,
  },
  title: {
    color: '#48F6FC',
    fontSize: 24,
  },
  product: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
  },
  productItem: {
    width: 424,
    height: 203,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orederItem: {
    width: 1044,
    height: 153,
    padding: 22,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  productItemImg: {
    width: 160,
    height: 160,
  },
  orderItemImg: {
    width: 110,
    height: 110,
  },
  productItemContent: {
    width: 198,
    height: 160,
    // backgroundColor: 'red',
  },
  orderItemContent: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  itemTitleBox: {
    height: 41,
    width: 198,
  },
  itemTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  priceBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  stockBox: {
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    height: 50,
    width: 1120,
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginLeft: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  footBtn: {
    width: 150,
    height: 50,
    backgroundColor: 'rgba(0,204,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopImgCar: {
    width: 54,
    height: 54,
    top: -5,
  },
  shopCarCount: {
    width: 36,
    height: 20,
    backgroundColor: '#FF4400',
    borderRadius: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 20,
    position: 'absolute',
    right: -18,
    top: 5,
  },

  // 点购成功模块
  paySuccessArea: {
    display: 'flex',
    padding: 60
},
payContainer:{
  width: 1120,
  height: 600,
  padding: 20
},
paySuccessInfo:{
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap:"wrap"
},
paySuccessInfoArea:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 15
},
paySuccessDetailArea:{
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around'
},
paySuccessDetailText:{
  fontSize: 20,
  color: '#fff'
},
paySuccessText:{
  fontSize: 28,
  color: '#fff'
},
paySuccessList:{
  width:'100%',
  padding: 30,
  overflow: 'hidden',

},
listItem: {
  width: '100%',
  borderBottomColor: '#52FFFF',
  borderBottomWidth: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: 10
},
itemLeftArea:{
 flexDirection: 'row'
}
});
