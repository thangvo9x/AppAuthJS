/** @format */

import React from 'react';
import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { Images } from 'configs';

const Page = ({ children }) => (
  <ImageBackground source={Images.background} style={styles.background}>
    <SafeAreaView style={styles.safe}>{children}</SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 10,
    width: '100%',
    height: '100%',
  },
  safe: {
    flex: 1,
  },
});

export default Page;
