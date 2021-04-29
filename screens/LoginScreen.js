import React, { useEffect } from "react";
import {
  UIManager,
  Dimensions,
  StyleSheet,
  Alert,
  ImageBackground,
  Linking,
} from "react-native";
// import {
//   authorize,
//   refresh,
//   revoke,
//   prefetchConfiguration,
// } from "react-native-app-auth";
import { WebView } from "react-native-webview";

import {
  Button,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
  Heading,
} from "../components";
import CookieManager from "@react-native-cookies/cookies";
import jwt_decode from "jwt-decode";

import qs from "qs"; // npm install --save qs
import randomString from "random-string"; // npm install --save random-string
import Hashes from "jshashes"; // npm install --save jshashes
import URL from "url-parse"; // npm install
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

const { height } = Dimensions.get("window");

const configs = {
  identityserver: {
    issuer: "https://demo.identityserver.io",
    clientId: "interactive.public",
    redirectUrl: "io.identityserver.demo:/oauthredirect",
    additionalParameters: {},
    scopes: ["openid", "profile", "email", "offline_access"],

    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
    //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
    //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
    // }
  },
  topenid: {
    title: "TopenID",
    redirect_uri: "mobilepoc://welcome",
    client_id: "zSi17c_AZYsZhbK1Gw5GBGYRg8ka", // The Application ID of your Application Registration
    authorization_endpoint:
      "https://is-dev.hungthinhcorp.com.vn/oauth2/authorize",
    token_endpoint: "https://is-dev.hungthinhcorp.com.vn/oauth2/token",
    code_challenge_method: "S256",
    response_type: "code",
    scope: "openid profile",
    grant_type: "authorization_code",
  },
};

const image = require("../assets/bg_home.png");

function sha256base64urlencode(str) {
  // https://tools.ietf.org/html/rfc7636#appendix-A
  // https://tools.ietf.org/html/rfc4648#section-5
  return new Hashes.SHA256()
    .b64(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+/g, "");
}

const LoginScreen = ({ navigation }) => {
  // let webview = useRef(null);
  // React.useEffect(() => {
  //   prefetchConfiguration({
  //     warmAndPrefetchChrome: false,
  //     ...configs.auth0,
  //   });
  // }, []);

  useEffect(() => {
    Linking.addEventListener("url", handleOpenUrl);
    Linking.getInitialURL().then((url) => {
      if (url) handleRedirectUri(url);
    });
  }, []);

  useEffect(() => {
    return () => {
      Linking.removeEventListener("url", handleOpenUrl);
    };
  });

  const handleOpenUrl = ({ url }) => {
    handleRedirectUri(url);
  };

  const handleRedirectUri = async (urlString) => {
    const url = new URL(urlString, true);
    const { code, state } = url.query;

    console.log("App url: ", url.query);

    if (!code) return;

    const { token_endpoint, grant_type, client_id, redirect_uri } = configs[
      "topenid"
    ];

    Promise.all([
      AsyncStorage.getItem("state"),
      AsyncStorage.getItem("code_verifier"),
    ]).then(([request_state, request_code_verifier]) => {
      AsyncStorage.removeItem("state");
      AsyncStorage.removeItem("code_verifier");
      console.log("State:", state, request_state);

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
        redirect_uri,
        grant_type,
      };
      //   console.log("token_endpoint", token_endpoint, qs.stringify(payload));
      return fetch(token_endpoint, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(payload),
      })
        .then((resp) => resp.json())
        .then(async (user) => {
          InAppBrowser.close();
          //   console.log("navigation", navigation);
          await AsyncStorage.setItem("@user", JSON.stringify(user));
          navigation.push("WelcomeScreen", { user });
        })
        .catch((err) => {
          console.warn("something went wrong", err);
        });
    });
  };

  // const handleAuthorize = useCallback(
  //   async (provider) => {
  //     try {
  //       const config = configs[provider];
  //       const newAuthState = await authorize(config);

  //       setAuthState({
  //         hasLoggedInOnce: true,
  //         provider: provider,
  //         ...newAuthState,
  //       });

  //       // get SessionUser
  //       // const urlSessionOfUser = `https://is-dev.hungthinhcorp.com.vn/api/users/v1/me/sessions`;
  //       // fetch(urlSessionOfUser, {
  //       //   method: 'GET',
  //       //   headers: {
  //       //     'Content-Type': 'application/json',
  //       //     Authorization: `Bearer ${newAuthState.accessToken}`,
  //       //   }
  //       // })
  //       // .then(sessionOfUser => console.log('sessionOfUser', sessionOfUser))
  //       // .catch(err => console.error('err', err))
  //     } catch (error) {
  //       // Alert.alert("Failed to log in", error.message);
  //     }
  //   },
  //   [authState]
  // );

  // const handleRefresh = useCallback(async () => {
  //   try {
  //     const config = configs[authState.provider];
  //     const newAuthState = await refresh(config, {
  //       refreshToken: authState.refreshToken,
  //     });

  //     setAuthState((current) => ({
  //       ...current,
  //       ...newAuthState,
  //       refreshToken: newAuthState.refreshToken || current.refreshToken,
  //     }));
  //   } catch (error) {
  //     Alert.alert("Failed to refresh token", error.message);
  //   }
  // }, [authState]);

  // const handleRevoke = useCallback(async () => {
  //   try {
  //     const config = configs[authState.provider];

  //     await revoke(config, {
  //       tokenToRevoke: authState.accessToken,
  //       sendClientId: true,
  //     });

  //     CookieManager.clearAll()
  //       .then((success) => {
  //         console.log("CookieManager.clearAll =>", success);
  //       })
  //       .catch((err) => console.error("error", err));

  //     // CookieManager.getAll()
  //     // .then((success) => {
  //     //   console.log('CookieManager.getAll =>', success);
  //     // }).catch(err => console.error('error', err));

  //     // call to oidc logout url
  //     const url = logoutUrl;
  //     console.log("authState", authState, url);
  //     const data = {
  //       id_token_hint: authState.idToken,
  //       post_logout_redirect_uri:
  //         "com.org.hungthinhcorp.id.mobilepoc:/redirect",
  //       state: authState.authorizeAdditionalParameters.session_state,
  //     };

  //     fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((dataResponse) => console.log("dataResponse", dataResponse))
  //       .catch((err) => console.error("err", err));

  //     // end session
  //     // const urlEndSession = `https://is-dev.hungthinhcorp.com.vn/api/users/v1/me/sessions/${}`;
  //     // console.log('authState', urlEndSession);

  //     // fetch(url, {
  //     //   method: 'DELETE',
  //     //   headers: {
  //     //   'Authorization': `bearer ${authState.accessToken}`,
  //     //   },
  //     //   body: JSON.stringify(data)
  //     // })
  //     // .then(dataResponse => console.log('dataResponse', dataResponse))
  //     // .catch(err => console.error('err', err))

  //     setAuthState({
  //       provider: "",
  //       accessToken: "",
  //       accessTokenExpirationDate: "",
  //       refreshToken: "",
  //     });
  //   } catch (error) {
  //     // Alert.alert("Failed to revoke token", error.message);
  //   }
  // }, [authState]);

  // const handleLogout = useCallback(
  //   async (provider) => {
  //     try {
  //       const config = configsLogout[provider];
  //       const newAuthState = await authorize(config);
  //       console.log("logout", newAuthState, provider);
  //       setAuthState({
  //         provider: "",
  //         accessToken: "",
  //         accessTokenExpirationDate: "",
  //         refreshToken: "",
  //       });
  //     } catch (error) {
  //       // Alert.alert('Failed to log in', error.message);
  //       console.log("Failed to log out", error.message);
  //     }
  //   },
  //   [authState]
  // );

  // const showRevoke = useMemo(() => {
  //   if (authState.accessToken) {
  //     const config = configs[authState.provider];
  //     if (config.issuer || config.serviceConfiguration.revocationEndpoint) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }, [authState]);

  // if (authState.idToken) {
  //   console.log(jwt_decode(authState.idToken));
  // }

  //   handleLogin = () => {
  //     const {
  //       client_id,
  //       authorization_endpoint,
  //       redirect_uri,
  //       response_type,
  //       scope,
  //       code_challenge_method,
  //     } = configs["topenid"];

  //     // PKCE - https://tools.ietf.org/html/rfc7636
  //     //  - Protect against other apps who register our application url scheme
  //     const code_verifier = code_challenge_method && randomString({ length: 45 });
  //     const code_challenge =
  //       code_challenge_method && sha256base64urlencode(code_verifier);

  //     // Protect against rogue web pages that try redirect the user to authorize (XSRF)
  //     const state = randomString();

  //     const params = {
  //       client_id,
  //       redirect_uri,
  //       response_type,
  //       scope,
  //       state,
  //       code_challenge_method,
  //       code_challenge,
  //     };
  //     const authorizationUrl =
  //       authorization_endpoint + "?" + qs.stringify(params);

  //     Promise.all([
  //       AsyncStorage.setItem("code_verifier", code_verifier || ""),
  //       AsyncStorage.setItem("state", state),
  //     ])
  //       .then(() => {
  //         console.log("saved, authorizationUrl379", authorizationUrl);
  //         Linking.openURL(authorizationUrl);
  //       })
  //       .catch((err) => {
  //         console.warn(err);
  //       });
  //   };

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     {/* <WebView
  //       allowingReadAccessToURL
  //       allowFileAccessFromFileURLs
  //       allowsBackForwardNavigationGestures
  //       ref={(ref) => (webview = ref)}
  //       source={{
  //         uri: authorizationUrl,
  //       }}
  //       automaticallyAdjustsScrollIndicatorInsets
  //       onNavigationStateChange={(navState) => {
  //         // Keep track of going back navigation within component
  //         console.log("navState", navState);
  //       }}
  //     /> */}
  //   </SafeAreaView>
  // );

  const openLink = async () => {
    try {
      const {
        client_id,
        authorization_endpoint,
        redirect_uri,
        response_type,
        scope,
        code_challenge_method,
      } = configs["topenid"];

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
        authorization_endpoint + "?" + qs.stringify(params);

      await AsyncStorage.setItem("code_verifier", code_verifier || "");
      await AsyncStorage.setItem("state", state);

      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(authorizationUrl, {
          // iOS Properties
          dismissButtonStyle: "close",
          preferredBarTintColor: "#347c4c",
          preferredControlTintColor: "white",
          readerMode: false,
          animated: true,
          modalPresentationStyle: "fullScreen",
          modalTransitionStyle: "coverVertical",
          modalEnabled: true,
          enableBarCollapsing: true,
          // Android Properties
          showTitle: true,
          toolbarColor: "#347c4c",
          secondaryToolbarColor: "black",
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
          headers: {
            // "my-custom-header": "my custom header value",
          },
          hasBackButton: true,
        });
        // Alert.alert("Response", JSON.stringify(result));
      } else Linking.openURL(authorizationUrl);
    } catch (error) {
      // Alert.alert(error.message);
    }
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <ButtonContainer
        style={{
          position: "absolute",
          top: height / 3,
        }}
      >
        <Button
          style={styles.button}
          text="Đăng nhập với TopenID"
          color="green"
          onPress={openLink}
        />
        {/* <Button
                style={styles.button}
                onPress={() => handleAuthorize("htid")}
                text="Đăng ký với TopenID"
                color="blue"
              />*/}
      </ButtonContainer>

      {/* {!!authState.refreshToken ? (
            <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
          ) : null} */}
      {/* {showRevoke ? (
          <Button
            onPress={() => handleLogout("htid")}
            text="Đăng xuất"
            color="#EF525B"
          />
        ) : null} */}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  button: {
    paddingHorizontal: 30,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
});
export default LoginScreen;
