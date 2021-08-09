import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import Routes from 'utils/route';
const urlIntrospectEndpoint = 'https:is-dev.hungthinhcorp.com.vn/oidc/logout';

export default class AuthenticationScreen extends Component {
  async componentDidMount() {
    // Play Lottie Animation :)
    try {
      await this.checkUserLogined();
      // Redirect to the Home page
    } catch (error) {
      // Show error and redirect the user to the Login page
      Alert.alert('error', error.message);
      this.backToLogin();
    }
  }

  backToLogin = () => this.props.navigation.navigate(Routes.Login);

  checkTokenHasExpired = (accessToken) => {
    const payload = {
      token: accessToken,
    };

    fetch(urlIntrospectEndpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(payload),
    })
      .then((resp) => resp.json())
      .then(async (response) => {
        if (!response.active) {
          await AsyncStorage.removeItem('@user');
          this.backToLogin();
        }
      })
      .catch((err) => {
        console.warn('err checkTokenHasExpired went wrong', err);
      });
  };

  async checkUserLogined() {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        const accessToken = userData.access_token;
        checkTokenHasExpired(accessToken);

        this.props.navigation.navigate(Routes.Dashboard, {
          user: JSON.parse(userData),
        });
      }
      this.backToLogin();
    } catch (err) {
      this.backToLogin();
    }
  }

  render() {
    return <View />;
  }
}
