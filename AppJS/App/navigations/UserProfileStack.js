import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from 'containers/UserProfile';
import Routes from 'utils/route';

import { Colors } from 'configs';
import { useNavigation } from '@react-navigation/native';
import { LoginToolbar, MenuBurger } from 'components';

const Stack = createStackNavigator();

const UserProfileStack = memo(() => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={UserProfile}
        name={Routes.UserProfile}
        options={{
          title: '',
          headerLeft: () => (
            <MenuBurger onPress={() => navigation.toggleDrawer()} />
          ),
          headerRight: () => <LoginToolbar />,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: Colors.Gray2,
            height: 80,
          },
        }}
      />
    </Stack.Navigator>
  );
});

export default UserProfileStack;
