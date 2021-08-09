import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from 'containers/UserProfile';
import Routes from 'utils/route';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Colors } from 'configs';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
import i18n from 'i18n-js';

const UserProfileStack = memo(() => {
  const navigation = useNavigation();
  const { t } = i18n;

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={UserProfile}
        name={Routes.UserProfile}
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => navigation.toggleDrawer()}
            >
              <Icon name={'menu'} color={Colors.Black} />
            </TouchableOpacity>
          ),

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

const styles = StyleSheet.create({
  btnMenu: {
    paddingLeft: 15,
    paddingTop: 15,
    width: 90,
    height: 90,
    justifyContent: 'center',
  },
});
export default UserProfileStack;
