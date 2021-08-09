import React, { memo } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from 'containers/Dashboard';
import Routes from 'utils/route';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';

import { Colors } from 'configs';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
import i18n from 'i18n-js';
import SvgLogin from 'svgs/Toolbar/SvgLogin';
import SvgLanguage from 'svgs/Toolbar/SvgLanguage';

const DashboardStack = memo(() => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Dashboard}
        name={Routes.Dashboard}
        options={{
          title: '',
          headerLeft: () => (
            <>
              <TouchableOpacity
                style={styles.btnMenu}
                onPress={() => navigation.toggleDrawer()}
              >
                <Icon name={'menu'} color={Colors.Black} />
              </TouchableOpacity>
            </>
          ),

          headerRight: () => (
            <View style={styles.wrapRight}>
              <TouchableOpacity
                style={styles.btnRight}
                onPress={() => navigation.toggleDrawer()}
              >
                <SvgLanguage />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnRight}
                onPress={() => navigation.toggleDrawer()}
              >
                <SvgLogin />
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: Colors.Gray2,
            borderBottomColor: 'rgba(201, 206, 214, 0.5)',
            borderBottomWidth: 1,
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
  wrapRight: {
    flexDirection: 'row',
  },
  btnRight: {
    paddingTop: 15,
    paddingRight: 15,
  },
});
export default DashboardStack;
