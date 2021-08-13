/** @format */

import AsyncStorage from '@react-native-community/async-storage';
import { saveStateStatus } from 'actions/auth';
import { changeLanguage } from 'actions/language';
import { Config, Constants } from 'configs';
import qs from 'qs';
import randomString from 'random-string';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { connect, useDispatch } from 'react-redux';
import SvgLogin from 'svgs/Toolbar/SvgLogin';
import SvgLogout from 'svgs/Toolbar/SvgLogout';
import { setLocale } from 'utils/i18n';
import { openLink, sha256base64urlencode } from 'utils/utils';
import LanguageFlag from './LanguageFlag';

const {
  LANGUAGE: { Vietnamese, English },
} = Constants;

const {
  client_id,
  authorization_endpoint,
  redirect_uri,
  response_type,
  scope,
  code_challenge_method,
  logout_endpoint,
  redirect_logout,
} = Config.TOPENID;

const LoginToolbar = ({ stateAuth, idToken, currentLanguage, isLoggedIn }) => {
  const dispatch = useDispatch();

  const onChangeLanguage = () => {
    if (currentLanguage === Vietnamese.value) {
      setLocale(English.value);
      dispatch(changeLanguage(English.value));
    } else if (currentLanguage === English.value) {
      setLocale(Vietnamese.value);
      dispatch(changeLanguage(Vietnamese.value));
    }
  };

  const _handleLogin = async () => {
    try {
      const code_verifier =
        code_challenge_method && randomString({ length: 45 });
      const code_challenge =
        code_challenge_method && sha256base64urlencode(code_verifier);
      const state = randomString();

      const params = {
        client_id,
        redirect_uri,
        response_type,
        scope,
        state,
        code_challenge_method,
        code_challenge,
        lang: currentLanguage,
      };
      const authorizationUrl =
        authorization_endpoint + '?' + qs.stringify(params);
      console.warn(authorizationUrl);

      await AsyncStorage.setItem('code_verifier', code_verifier || '');
      await AsyncStorage.setItem('state', state);
      dispatch(saveStateStatus(state));

      openLink(authorizationUrl); // openBrowser
    } catch (error) {
      console.error(['handleLogin', error]);
    } finally {
      InAppBrowser.close();
    }
  };

  const _handleLogout = async () => {
    try {
      const params = {
        id_token_hint: idToken,
        post_logout_redirect_uri: redirect_logout,
        state: stateAuth,
      };
      const logoutUrl = logout_endpoint + '?' + qs.stringify(params);

      console.warn(['logoutUrl', logoutUrl]);

      openLink(logoutUrl); // openBrowser
    } catch (error) {
      console.error(['handleLogout', error]);
    } finally {
      InAppBrowser.close();
    }
  };

  return (
    <View style={styles.wrapRight}>
      <LanguageFlag
        currentLanguage={currentLanguage}
        onPress={onChangeLanguage}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnRight}
        onPress={() => (!isLoggedIn ? _handleLogin() : _handleLogout())}
      >
        {!isLoggedIn ? <SvgLogin /> : <SvgLogout />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapRight: {
    flexDirection: 'row',
  },
  btnRight: {
    paddingRight: 15,
    marginTop: 7,
  },
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  idToken: state.auth.account.idToken,
  stateAuth: state.auth.account.state,
  currentLanguage: state.language.currentLanguage,
});

export default connect(mapStateToProps)(LoginToolbar);
