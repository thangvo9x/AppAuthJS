/** @format */

import { Icon } from '@ant-design/react-native';
import { Colors } from 'configs';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ style, onPress }) => (
  <TouchableOpacity style={[styles.btnMenu, style && style]} onPress={onPress}>
    <Icon name={'menu'} size={20} color={Colors.Black} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnMenu: {
    paddingTop: 15,
    paddingRight: 11,
    paddingBottom: 10,
    justifyContent: 'center',
  },
});

export default Menu;
