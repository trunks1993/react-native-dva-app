import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  timeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  time: {
    fontSize: 120,
    color: '#FFFFFF',
  },
  date: {
    fontSize: 26,
    color: '#FFFFFF',
  },
  content: {
    marginTop: 100,
    alignItems: 'center',
    // backgroundColor: 'red',
    height: 340,
  },
  msgBox: {
    marginBottom: 35,
    paddingLeft: 30,
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 30,
    width: 810,
    backgroundColor: 'rgba(7, 26, 91, 0.2)',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTitle: {
    fontSize: 24,
    color: '#ffffff',
    marginLeft: 10,
  },
  msgContent: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20,
  },
});
