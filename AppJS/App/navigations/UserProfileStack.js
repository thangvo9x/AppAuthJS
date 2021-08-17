/** @format */

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToolbarRight, Logo, MenuBurger } from 'components';
import UserProfile from 'containers/UserProfile';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Routes from 'utils/route';

const Stack = createStackNavigator();

const UserProfileStack = memo(() => {
  const navigation = useNavigation();
  const [isLoggedIn] = useSelector((state) => {
    return [state.auth.isLoggedIn];
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={UserProfile}
        name={Routes.UserProfile}
        options={{
          title: '',
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
export default UserProfileStack;
