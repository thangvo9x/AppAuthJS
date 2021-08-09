import React, { useCallback, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { rehydration } from '../redux/store';
import { Colors } from 'configs/';

const Auth = () => {
  const [isLoggedIn] = useSelector((state) => {
    return [state.auth.isLoggedIn];
  });
  const navigation = useNavigation();

  const resetNavigation = useCallback(
    (routeName) => {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      });
      navigation.dispatch(resetAction);
    },
    [navigation]
  );

  useEffect(() => {
    const checkAuth = async () => {
      await rehydration();
      resetNavigation('Main');
      // if (isLoggedIn) {
      //   resetNavigation('Main');
      // } else {
      //   resetNavigation('Login');
      // }
    };
    checkAuth();
  }, [resetNavigation, isLoggedIn]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
});

export default Auth;
