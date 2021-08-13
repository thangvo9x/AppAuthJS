/** @format */

import { StyleSheet } from 'react-native';
import { Colors } from 'configs';
export default StyleSheet.create({
  version: {
    marginBottom: 0,
  },
  wrap: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingBottom: 20,
  },
  wrapContent: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  introduce: {
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 20,
    lineHeight: 21,
  },
  logo: {
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
    width: 240,
    height: 240,
  },
  avatarBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullName: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  wrapBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 100,
  },
  box: {
    flex: 1,
    alignItems: 'center',
  },
  textLogo: {
    marginTop: 12,
    fontSize: 12,
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  textWelcome: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 18,
    alignItems: 'center',
  },
  bottomVersion: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
