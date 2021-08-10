import { Platform, Dimensions, StatusBar } from 'react-native';

const USE_REACTOTRON = true;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const FONT_PREFIX = 'SVN-Gilroy';

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');
export const LANGUAGE = {
  English: { label: 'English (EN)', value: 'en' },
  Vietnamese: { label: 'Tiếng Việt (VN)', value: 'vi' },
  DEFAULT: 'vi',
};

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
      (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT))
  );
}

export function getStatusBarHeight() {
  return Platform.select({
    ios: isIphoneX() ? 40 : 20,
    android: StatusBar.currentHeight,
  });
}

export const DATE_TIME_FORMAT_STRING = 'HH:mm ddd, DD/MM/YYYY';

export const DEFAULT_USER_AVATAR_URL =
  'https://s3-ap-southeast-1.amazonaws.com/teecoin-test/images/placeholders/user_icon.png';

export const SOCIAL_PROVIDER = {
  EMAIL: 'email',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
};

export const LINK_TYPE = {
  NORMAL_URL: '1',
  DEEPLINK_URL: '2',
};

export const PACKAGE_NAME = Platform.select({
  ios: 'com.eohmobile',
  android: 'com.eoh.eohmobile',
});

export const DEEP_LINK = {
  SUCCESS_PAYMENT: 'app://eoh/success-payment',
};

export const Constants = {
  USE_REACTOTRON,
  paddingTop: getStatusBarHeight(),
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  DEFAULT_USER_AVATAR_URL,
  SOCIAL_PROVIDER,
  LANGUAGE,
  LINK_TYPE,
  PACKAGE_NAME,
  FONT_PREFIX,
  isIphoneX,
  DEEP_LINK,
};
