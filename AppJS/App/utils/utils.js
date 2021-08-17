/** @format */

import Hashes from 'jshashes';
import { Platform, StatusBar, Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Colors } from 'configs';
import Toast from 'react-native-toast-message';

export const getDeepLink = (path = '') => {
  const scheme = 'mobilepoc';
  const prefix = `${scheme}://welcome`;
  return prefix + path;
  // const scheme = "https";
  // const prefix = `${scheme}://`;
  // return prefix + path;
};

export const sha256base64urlencode = (str) => {
  // https://tools.ietf.org/html/rfc7636#appendix-A
  // https://tools.ietf.org/html/rfc4648#section-5
  return new Hashes.SHA256()
    .b64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]+/g, '');
};

const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export const openLink = async (
  url,
  statusBarStyle = 'dark-content',
  animated = true
) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.close();
      // A delay to change the StatusBar when the browser is opened
      const delay = animated && Platform.OS === 'ios' ? 400 : 0;
      setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        ephemeralWebSession: true,
        dismissButtonStyle: 'close',
        preferredBarTintColor: Colors.Primary,
        preferredControlTintColor: Colors.White,
        readerMode: true,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'crossDissolve',
        modalEnabled: true,
        enableBarCollapsing: true,
        // Android Properties
        showTitle: true,
        toolbarColor: Colors.Primary,
        secondaryToolbarColor: Colors.White,
        navigationBarColor: Colors.Black,
        navigationBarDividerColor: Colors.White,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_left',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        hasBackButton: true,
        browserPackage: null,
        showInRecents: false,
      });
      // A delay to show an alert when the browser is closed
      await sleep(800);
      console.warn(['Response::', JSON.stringify(result)]);
    } else {
      Linking.openURL(url);
    }
  } catch (error) {
    await sleep(50);
    const errorMessage = error.message || error;
    console.error(['errorOpenLink', errorMessage]);
  } finally {
    // Restore the previous StatusBar of the App
    StatusBar.setBarStyle(statusBarStyle);
    InAppBrowser.close();
  }
};

export const tryDeepLinking = async (url) => {
  const redirectUrl = getDeepLink();
  const authUrl = `${url}?redirect_url=${encodeURIComponent(redirectUrl)}`;
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.openAuth(authUrl, redirectUrl, {
        // iOS Properties
        ephemeralWebSession: false,
        // Android Properties
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      });
      console.log(['Response', JSON.stringify(result)]);
    } else {
      console.log('InAppBrowser is not supported :/');
    }
  } catch (error) {
    console.error(error);
    console.error('Something’s wrong with the app :(');
  }
};

export const ToastBottomHelper = {
  success: (msg) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: msg,
      visibilityTime: 1000,
    });
  },
  error: (msg) => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: msg,
      visibilityTime: 1000,
    });
  },
};
