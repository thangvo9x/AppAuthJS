/** @format */

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Logo, MenuBurger, ToolbarRight } from 'components';
import Dashboard from 'containers/Dashboard';
import React, { memo, useEffect } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { setLocale } from 'utils/i18n';
import Routes from 'utils/route';

const Stack = createStackNavigator();

const DashboardStack = memo(() => {
  const navigation = useNavigation();
  const [currentLanguage] = useSelector((state) => {
    return [state.language.currentLanguage];
  });

  const [isLoggedIn] = useSelector((state) => {
    return [state.auth.isLoggedIn];
  });

  useEffect(() => {
    setLocale(currentLanguage);
  });

  useEffect(() => {
    return () => {
      Linking.removeEventListener('url', () => {
        console.log('removedEvenListener');
      });
    };
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Dashboard}
        name={Routes.Dashboard}
        options={{
          title: null,
          headerLeft: () => (
            <View style={styles.rowLogo}>
              {isLoggedIn && (
                <MenuBurger onPress={() => navigation.toggleDrawer()} />
              )}
              <Logo />
            </View>
          ),
          headerRight: () => <ToolbarRight />,
          headerTitleAlign: 'left',
        }}
      />
    </Stack.Navigator>
  );
});

const styles = StyleSheet.create({
  rowLogo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
});
export default DashboardStack;
