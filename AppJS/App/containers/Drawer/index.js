import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Images, Colors } from 'configs';
import Text from 'components/Text';
import t from 'i18n';
import { IconOutline } from '@ant-design/icons-react-native';
import Routes from 'utils/route';
import { VersionText } from 'components/common/VersionText';
import { useNavigation } from '@react-navigation/native';

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

const styles = StyleSheet.create({
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

  // // header
  // avatarBackground: {
  //   flexDirection: 'row',
  //   flex: 1,
  //   paddingVertical: 22,
  //   borderBottomColor: Colors.Gray4,
  //   borderBottomWidth: 1,
  // },
  // avatar: {
  //   height: 50,
  //   width: 50,
  //   borderRadius: 25,
  //   borderWidth: 0.5,
  //   borderColor: Colors.Gray5,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  textContainer: {
    marginLeft: 15,
    justifyContent: 'flex-start',
    flex: 1,
  },
  // fullName: {
  //   backgroundColor: Colors.TextTransparent,
  //   fontSize: 16,
  //   marginBottom: 6,
  //   color: Colors.Black,
  //   fontWeight: 'bold',
  // },
  // email: {
  //   backgroundColor: Colors.TextTransparent,
  //   fontSize: 14,
  //   color: Colors.Gray8,
  // },
  containerRow: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Drawer;
