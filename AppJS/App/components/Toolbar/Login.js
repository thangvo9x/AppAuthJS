import React, { useCallback } from 'react';
import { StyleSheet, Linking, View, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
import randomString from 'random-string';

import { Config, Colors } from 'configs';
import { connect, useDispatch } from 'react-redux';
import { changeLanguage } from 'actions/language';
import { setLocale } from 'utils/i18n';
import { sha256base64urlencode } from 'utils/utils';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

import SvgLogin from 'svgs/Toolbar/SvgLogin';
import SvgLogout from 'svgs/Toolbar/SvgLogout';
import SvgFlagVI from 'svgs/Toolbar/SvgFlagVI';
import SvgFlagEN from 'svgs/Toolbar/SvgFlagEN';

const LoginToolbar = ({ currentLanguage, isLoggedIn }) => {
  const dispatch = useDispatch();

  const onChangeLanguage = () => {
    if (currentLanguage == 'vi') {
      setLocale('en'); //set global
      dispatch(changeLanguage('en'));
    } else if (currentLanguage == 'en') {
      setLocale('vi'); //set global
      dispatch(changeLanguage('vi'));
    }
  };

  const openLink = async () => {
    try {
      const {
        client_id,
        authorization_endpoint,
        redirect_uri,
        response_type,
        scope,
        code_challenge_method,
      } = Config.TOPENID;

      // PKCE - https://tools.ietf.org/html/rfc7636
      //  - Protect against other apps who register our application url scheme
      const code_verifier =
        code_challenge_method && randomString({ length: 45 });
      const code_challenge =
        code_challenge_method && sha256base64urlencode(code_verifier);

      // Protect against rogue web pages that try redirect the user to authorize (XSRF)
      const state = randomString();

      const params = {
        client_id,
        redirect_uri,
        response_type,
        scope,
        state,
        code_challenge_method,
        code_challenge,
      };
      const authorizationUrl =
        authorization_endpoint + '?' + qs.stringify(params);

      console.warn(authorizationUrl);

      await AsyncStorage.setItem('code_verifier', code_verifier || '');
      await AsyncStorage.setItem('state', state);

      // const deepLink = getDeepLink();
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(authorizationUrl, {
          // iOS Properties
          ephemeralWebSession: false,
          dismissButtonStyle: 'close',
          preferredBarTintColor: Colors.Primary,
          preferredControlTintColor: 'white',
          readerMode: true,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'crossDissolve',
          modalEnabled: false,
          enableBarCollapsing: true,
          // Android Properties
          showTitle: true,
          toolbarColor: Colors.Primary,
          secondaryToolbarColor: 'black',
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
        });
      } else {
        Linking.openURL(authorizationUrl);
      }
    } catch (error) {
      // Alert.alert(error.message);
      // console.error(error);
    }
  };
  return (
    <View style={styles.wrapRight}>
      <TouchableOpacity
        style={[styles.btnRight, { marginTop: 10 }]}
        onPress={onChangeLanguage}
      >
        {currentLanguage == 'vi' ? <SvgFlagEN /> : <SvgFlagVI />}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.btnRight, { marginTop: 7 }]}
        onPress={openLink}
      >
        {!isLoggedIn ? <SvgLogin /> : <SvgLogout />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnMenu: {
    paddingLeft: 15,
    paddingTop: 15,
    width: 90,
    height: 90,
    justifyContent: 'center',
  },
  wrapRight: {
    flexDirection: 'row',
  },
  btnRight: {
    paddingTop: 20,
    paddingRight: 15,
  },
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  currentLanguage: state.language.currentLanguage,
});
const mapDispatchToProps = {
  changeLanguage,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginToolbar);
