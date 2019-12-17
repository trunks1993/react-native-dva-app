import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    marginTop: 95,
    paddingLeft: 80,
    display: 'flex',
    flexDirection: 'row',
  },
  calendar: {
    width: 367,
    height: 430,
  },
  textAreaBox: {
    width: 679,
    height: 430,
    marginLeft: 73,
    position: 'relative',
  },
  textArea: {
    width: 679,
    height: 382,
    marginTop: 19,
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
    color: '#ffffff',
    padding: 10,
    fontSize: 20,
  },
  faceBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  faceText: {
    color: '#70D6FC',
    fontSize: 18,
    marginLeft: 8,
    marginRight: 38,
  },
  btnBox: {
    alignItems: 'flex-end',
    paddingRight: 80,
    paddingTop: 20,
  },
  btn: {
    width: 140,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#70D6FC',
    fontSize: 20,
  },
});
