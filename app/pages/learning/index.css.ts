import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  box1: {
    marginTop: 208,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookItem: {
    width: 140,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockBox: {
    marginTop: 24,
    marginBottom: 23,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    // paddingBottom: 30,
    paddingTop: 30,
  },
  listItemTouch:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 22,
    color: '#70D6FC',
    marginLeft: 10,
  },
  listItemLine: {
    height: 0,
    borderRadius: 0.5,
    borderStyle : 'dashed',
    borderColor: 'rgba(72, 246, 252, 0.2)',
    borderWidth: 1,
    marginTop: 30,
  },
})
