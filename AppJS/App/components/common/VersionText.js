import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from 'components';
import { AppRNConfig, Colors } from 'configs';
import { t } from 'i18n-js';

const VersionText = memo(({ style }) => (
  <Text
    type="Label"
    color={Colors.LightPrimary}
    style={[styles.txtVersion, style && style]}
  >
    {t('text_version') + ' '}
    {AppRNConfig.VERSION}
  </Text>
));

const styles = StyleSheet.create({
  txtVersion: {
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default VersionText;
