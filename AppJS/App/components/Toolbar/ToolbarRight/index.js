/** @format */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveStateStatus } from 'actions/auth';
import { changeLanguage } from 'actions/language';
import { Config, Constants } from 'configs';
import qs from 'qs';
import randomString from 'random-string';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { useDispatch, useSelector } from 'react-redux';
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

const ToolbarRight = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, idToken, stateAuth, currentLanguage] = useSelector(
    (state) => {
      return [
        state.auth.isLoggedIn,
        state.auth.account.idToken,
        state.auth.account.state,
        state.language.currentLanguage,
      ];
    }
  );

  const onChangeLanguage = useCallback(
    (code) => {
      if (code === Vietnamese.code) {
        setLocale(English.code);
        dispatch(changeLanguage(English.code));
      } else if (code === English.code) {
        setLocale(Vietnamese.code);
        dispatch(changeLanguage(Vietnamese.code));
      }
    },
    [currentLanguage]
  );

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
        onPress={() => onChangeLanguage(currentLanguage)}
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

export default ToolbarRight;
