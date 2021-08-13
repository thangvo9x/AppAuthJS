/** @format */

import AsyncStorage from '@react-native-community/async-storage';
import { Text, VersionText } from 'components';
import { Config } from 'configs';
import { t } from 'i18n-js';
import qs from 'qs';
import React, { useEffect } from 'react';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { connect, useDispatch } from 'react-redux';

import SvgDefaultAvatar from 'svgs/dashboard/SvgDefaultAvatar';
import SvgTopenFintech from 'svgs/dashboard/SvgFintech';
import SvgMobileApp from 'svgs/dashboard/SvgMobileApp';
import SvgWelcome from 'svgs/dashboard/SvgWelcome';
import URL from 'url-parse';
import styles from './styles';
import { loginPhoneSuccess, logout } from 'actions/auth';

const Dashboard = ({ userInfo, isLoggedIn }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    Linking.addEventListener('url', handleOpenUrl);
    Linking.getInitialURL().then((url) => {
      // if (url) {
      handleRedirectUri(url);
      // }
    });
  }, []);

  // useEffect(() => {
  //   return () => {
  //     Linking.removeEventListener('url', handleOpenUrl);
  //   };
  // });

  const handleOpenUrl = ({ url }) => {
    handleRedirectUri(url);
  };

  const handleRedirectUri = async (urlString) => {
    const url = new URL(urlString, true);
    const { code, state } = url.query;

    console.warn(['handleRedirectUri: ', url]);

    if (!code) {
      if (url.host === 'logout') {
        dispatch(logout());
        InAppBrowser.close();
      }
      return;
    }

    const {
      token_endpoint,
      grant_type,
      client_secret,
      client_id,
      redirect_uri,
    } = Config.TOPENID;

    Promise.all([
      AsyncStorage.getItem('state'),
      AsyncStorage.getItem('code_verifier'),
    ]).then(([request_state, request_code_verifier]) => {
      AsyncStorage.removeItem('state');
      AsyncStorage.removeItem('code_verifier');
      console.warn(['State:', state, request_state]);

      if (state !== request_state) {
        console.log(
          "State mismatch, don't carry out the token request",
          state,
          request_state
        );
        return;
      }

      const code_verifier = request_code_verifier || undefined;

      const payload = {
        code,
        code_verifier,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
      };

      return fetch(token_endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(payload),
      })
        .then((resp) => resp.json())
        .then(async (user) => {
          if (user) {
            dispatch(loginPhoneSuccess(user));
          }
        })
        .catch((err) => {
          console.log(['something went wrong-loginSuccess', err.message]);
        })
        .finally(() => {
          InAppBrowser.close();
        });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.wrap}
        contentContainerStyle={styles.wrapContent}
      >
        {isLoggedIn ? (
          <View style={styles.avatarBackground}>
            <View style={styles.avatar}>
              <SvgDefaultAvatar />
              <Text style={[styles.fullName]}>
                {userInfo.name ? userInfo.name : ''}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.welcome}>
            <Text style={styles.textWelcome}>{t('text_welcome')}</Text>
          </View>
        )}
        <View style={styles.wrapLogo}>
          <SvgWelcome />
          <Text style={styles.introduce}>{t('text_ecosystem_introduce')}</Text>
        </View>
        {isLoggedIn && (
          <View style={styles.wrapBox}>
            <View style={styles.box}>
              <TouchableOpacity>
                <SvgTopenFintech />
              </TouchableOpacity>
              <Text style={styles.textLogo}>{'TopenFintech'}</Text>
            </View>
            <View style={styles.box}>
              <TouchableOpacity>
                <SvgMobileApp />
              </TouchableOpacity>
              <Text style={styles.textLogo}>{'HT Mobile App'}</Text>
            </View>
          </View>
        )}
        <View style={styles.bottomVersion}>
          <VersionText style={styles.version} />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  userInfo: state.auth.account.user || {},
});

export default connect(mapStateToProps)(Dashboard);
