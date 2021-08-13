/** @format */

import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Images, Colors } from 'configs';

import { t } from 'i18n-js';
import { IconOutline } from '@ant-design/icons-react-native';
import Routes from 'utils/route';
import { Text, VersionText } from 'components';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

// eslint-disable-next-line no-shadow
const Drawer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={[styles.row, styles.logoWrap]}>
          <Image source={Images.logo} style={styles.logo} />
        </View>
        <View style={styles.containerRow}>
          <View style={styles.wrapRow}>
            <Row
              onPress={() => navigation.navigate(Routes.Dashboard)}
              image={'home'}
              name={t('home')}
            />
            {/* <Row onPress={() => {}} image={'export'} name={t('logout')} /> */}
          </View>
          <VersionText />
        </View>
      </ScrollView>
    </View>
  );
};

const Row = ({ name, onPress, image, borderBottom }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.row,
        styles.optionWrap,
        borderBottom && styles.borderBottom,
      ]}
    >
      <IconOutline name={image} size={18} color={Colors.Image} />

      <View style={styles.wrapText}>
        <Text style={[styles.text]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Drawer;
