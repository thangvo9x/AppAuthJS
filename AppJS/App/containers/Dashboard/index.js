import React from 'react';
import { ScrollView, Image, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import t from 'i18n';
import { Colors, AppRNConfig } from 'configs';
import SvgWelcome from 'svgs/dashboard/SvgWelcome';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.wrap}
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
      >
        <View style={styles.welcome}>
          <Text style={styles.textWelcome}>{t('text_welcome')}</Text>
        </View>
        <View style={styles.wrapLogo}>
          <SvgWelcome />
          <Text style={styles.introduce}>{t('text_ecosystem_introduce')}</Text>
        </View>
        <View style={styles.bottomVersion}>
          <Text style={styles.version}>
            {t('text_version') + AppRNConfig.VERSION}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.Gray2,
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
  account: state.auth.account,
  language: state.language,
});

export default connect(mapStateToProps)(Dashboard);
