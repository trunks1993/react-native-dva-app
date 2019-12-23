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
    width: '100%',
    height: '100%',
    paddingTop: 30,
    // paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  payContainer: {
    width: 1124,
    height: 633,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40
  },
  paySuccessInfo: {
    flexDirection: 'row',
  justifyContent: 'center',
  flexWrap:"wrap"
  },
  paySuccessInfoArea: {
    width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 15
  },
  paySuccessDetailArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paySuccessDetailText: {
    fontSize: 20,
    color: '#fff',
  },
  paySuccessText: {
    fontSize: 28,
    color: '#fff',
  },
  paySuccessList: {
    // flex: 1,
    width: 1044,
    height: 372,
    padding: 30,
  },
  listItem: {
    // width: '100%',
    borderBottomColor: '#52FFFF',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginBottom: 20,
  },
  itemLeftArea: {
    flexDirection: 'row',
  },

  // 账户中心模块
  accountArea: {
    flex: 1,
    // backgroundColor: 'rgba()'
    padding: 80
  },
  waitStatusArea:{
    height: 60,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  // 列表
  goodsInfoArea:{
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  goodsInfoWrap: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 30
  },
  goodsItem:{
    width: '100%',
    height: 146,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // marginBottom: 10
    // position: 'relative'
  },
  orderItem: {
    width: 1030,
    height: 136,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  payMoneyBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  payMoney:{
    width: 210,
    height: 136,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemLeftBox:{
    width: 884,
    height: 146,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 1,
    paddingLeft: 30
  },
  itemRightBox: {
    width: 146,
    height: 146,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgListArea:{
    marginLeft: 60,
    flexDirection: 'row',
  },
  likeBorder:{
    width: 1,
    height: 93
  },
  TotalBox:{
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.8,
    width: 146,
    height: 146,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#092675',
  },
  orderInfoText:{
    color:'#fff',
    fontSize: 18
  },
  // 账号中心- 点购记录
  personInfoArea:{
    width: '100%',
    height: 142,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  AccountPersonLeftArea:{
    flexDirection:'row',
    // justifyContent: 'space-around'
  },
  personInfo:{
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  personName:{
    fontSize: 28,
    color: '#fff',
    marginBottom: 10
  },
  personPosition:{
    fontSize: 24,
    color: '#ccc'
  },
  AccountPersonRightArea:{
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  personMoney:{
    flexDirection: 'row',
  },
  tabBtnActive:{
    width: 145,
    height: 50,
    backgroundColor: 'rgba(30, 131, 234, 1)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtn:{
    width: 145,
    height: 50,
    backgroundColor: 'rgba(30, 131, 234, 0.5)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textActive:{
    fontSize: 24,
    color: '#70F7FC'
  },
  text: {
    fontSize: 24,
    color: '#fff'
  }
});
