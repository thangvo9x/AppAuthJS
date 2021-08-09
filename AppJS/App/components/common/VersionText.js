import Text from 'components/Text';
import { AppRNConfig, Colors } from 'configs/';
import { t } from 'i18n-js';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

const VersionText = memo(() => (
  <Text type="Label" color={Colors.LightPrimary} style={styles.txtVersion}>
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

export { VersionText };
