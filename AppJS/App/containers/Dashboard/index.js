import React, { useEffect } from 'react';
import {
  ScrollView,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { t } from 'i18n-js';
import { Colors, Config } from 'configs';
import { VersionText, Text } from 'components';
import SvgWelcome from 'svgs/dashboard/SvgWelcome';
import URL from 'url-parse'; // npm install
import qs from 'qs';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-community/async-storage';

import { loginPhoneSuccess } from 'actions/auth';
import SvgTopenFintech from 'svgs/dashboard/SvgFintech';
import SvgMobileApp from 'svgs/dashboard/SvgMobileApp';
import SvgDefaultAvatar from 'svgs/dashboard/SvgDefaultAvatar';

const Dashboard = ({ userInfo, isLoggedIn, loginPhoneSuccess }) => {
  useEffect(() => {
    Linking.addEventListener('url', handleOpenUrl);
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleRedirectUri(url);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      Linking.removeEventListener('url', handleOpenUrl);
    };
  });

  const handleOpenUrl = ({ url }) => {
    handleRedirectUri(url);
  };

  const handleRedirectUri = async (urlString) => {
    const url = new URL(urlString, true);
    const { code, state } = url.query;

    console.log('App url: ', url.query);

    if (!code) {
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
      console.log('State:', state, request_state);

      if (state != request_state) {
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
      //   console.log("token_endpoint", token_endpoint, qs.stringify(payload));
      return fetch(token_endpoint, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(payload),
      })
        .then((resp) => resp.json())
        .then(async (user) => {
          InAppBrowser.close();
          loginPhoneSuccess(user);
        })
        .catch((err) => {
          console.warn('something went wrong', err);
        });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.wrap}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 30,
          alignItems: 'center',
        }}
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
          <VersionText style={{ marginBottom: 0 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  introduce: {
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 20,
    lineHeight: 21,
  },
  logo: {
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
    width: 240,
    height: 240,
  },
  avatarBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullName: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  wrapBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginHorizontal: 100,
  },
  box: {
    flex: 1,
    alignItems: 'center',
  },
  textLogo: {
    marginTop: 12,
    fontSize: 12,
  },
  welcome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  textWelcome: {
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 18,
    alignItems: 'center',
  },
  bottomVersion: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  userInfo: state.auth.account.user || {},
});
const mapDispatchToProps = {
  loginPhoneSuccess,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
