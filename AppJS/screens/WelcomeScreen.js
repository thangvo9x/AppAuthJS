import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  ImageBackground,
  Linking,
} from "react-native";

import {
  Button,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
} from "../components";
import jwt_decode from "jwt-decode";
import qs from "qs";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import AsyncStorage from "@react-native-async-storage/async-storage";

// constants
const logoutUrl = "https://is-dev.hungthinhcorp.com.vn/oidc/logout";
const imageLogined = require("./../assets/bg_logined.png");

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusBarStyle: "dark-content",
    };
  }

  _handleLogout = async () => {
    try {
      // await revoke(config, {
      //   tokenToRevoke: authState.accessToken,
      //   sendClientId: true,
      // });

      // CookieManager.clearAll()
      //   .then((success) => {
      //     console.log("CookieManager.clearAll =>", success);
      //   })
      //   .catch((err) => console.error("error", err));

      // CookieManager.getAll()
      // .then((success) => {
      //   console.log('CookieManager.getAll =>', success);
      // }).catch(err => console.error('error', err));

      const { params } = this.props.route;
      const { user } = params || {};

      // call to oidc logout url

      const data = {
        id_token_hint: user.id_token,
        post_logout_redirect_uri: "mobilepoc://welcome",
        // state: authState.authorizeAdditionalParameters.session_state,
      };
      const url = logoutUrl + "?" + qs.stringify(data);

      await InAppBrowser.open(url);
      // InAppBrowser.closeAuth();
      await AsyncStorage.removeItem("@user");
      console.log("url", url);
      InAppBrowser.close();
      this.props.navigation.navigate("LoginScreen");

      // end session
      // const urlEndSession = `https://is-dev.hungthinhcorp.com.vn/api/users/v1/me/sessions/${}`;
      // console.log('authState', urlEndSession);

      // fetch(url, {
      //   method: 'DELETE',
      //   headers: {
      //   'Authorization': `bearer ${authState.accessToken}`,
      //   },
      //   body: JSON.stringify(data)
      // })
      // .then(dataResponse => console.log('dataResponse', dataResponse))
      // .catch(err => console.error('err', err))
    } catch (err) {
      // Alert.alert("Failed to revoke token", error.message);
    }
  };

  render() {
    const { statusBarStyle } = this.state;
    const { params } = this.props.route;

    const { user } = params || {};
    // console.log("code vao roi", params.user);

    if (user) {
      // Get and Save the access token request, user info...
      return (
        <ImageBackground source={imageLogined} style={styles.image}>
          <View style={styles.container}>
            <StatusBar barStyle={statusBarStyle} />
            <Text style={styles.welcome}>{"Welcome TopenID"}</Text>
            {!!user.access_token && (
              <Form>
                {user.id_token && (
                  <>
                    <FormLabel>TopenID</FormLabel>
                    <FormValue>{jwt_decode(user.id_token).ht_id}</FormValue>
                  </>
                )}
              </Form>
            )}
            {/* {!!params.authState.refreshToken ? (
              <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
            ) : null} */}
            <ButtonContainer
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 100,
              }}
            >
              <Button
                style={{ flex: 1, backgroundColor: "purple" }}
                onPress={() => {
                  Linking.openURL("mobilepoc2://welcome");
                }}
                text="Go to TopenID Another"
                color="#EF525B"
              />
            </ButtonContainer>
            <ButtonContainer>
              <Button
                onPress={this._handleLogout}
                text="Đăng xuất"
                color="#EF525B"
              />
            </ButtonContainer>
          </View>
        </ImageBackground>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  urlInput: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
  openButton: {
    paddingTop: Platform.OS === "ios" ? 0 : 20,
    paddingBottom: Platform.OS === "ios" ? 0 : 20,
  },
});
