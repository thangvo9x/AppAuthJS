/** @format */

import { StyleSheet } from 'react-native';
import { Colors } from 'configs';

export default StyleSheet.create({
  wrapText: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
  },
  wrap: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapRow: {
    width: 220,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  borderBottom: {
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
  },
  logoWrap: {
    paddingTop: 32,
    paddingLeft: 28,
    paddingRight: 23,
  },
  optionWrap: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 32,
  },
  logo: {
    width: 32,
    height: 16,
    position: 'absolute',
    top: 10,
    left: 30,
  },
  containerRow: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
