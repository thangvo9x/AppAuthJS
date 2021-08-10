import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Colors } from 'configs';

const Menu = ({ style, onPress }) => (
  <TouchableOpacity style={[styles.btnMenu, style && style]} onPress={onPress}>
    <Icon name={'menu'} color={Colors.Black} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnMenu: {
    paddingLeft: 15,
    paddingTop: 15,
    width: 90,
    height: 90,
    justifyContent: 'center',
  },
});

export default Menu;
