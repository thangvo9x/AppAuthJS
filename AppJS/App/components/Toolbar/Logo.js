/** @format */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import SvgLogo from 'svgs/SvgLogo';

const Logo = ({ style, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.logo, style && style]}>
    <SvgLogo />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  logo: {
    marginLeft: 0,
  },
});

export default Logo;
