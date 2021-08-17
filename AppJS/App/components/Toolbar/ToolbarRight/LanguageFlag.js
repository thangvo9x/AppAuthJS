/** @format */

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import SvgFlagEN from 'svgs/Toolbar/SvgFlagEN';
import SvgFlagVI from 'svgs/Toolbar/SvgFlagVI';

const LanguageFlag = ({ currentLanguage, style, onPress }) => (
  <TouchableOpacity style={[styles.btnRight, style && style]} onPress={onPress}>
    {currentLanguage === 'vi' ? <SvgFlagEN /> : <SvgFlagVI />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnRight: {
    paddingRight: 15,
    marginTop: 10,
  },
});

export default LanguageFlag;
