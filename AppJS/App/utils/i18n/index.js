import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { Constants } from 'configs';
const pluralize = require('pluralize');

const translations = {
  en: require('./translations/en.json'),
  vi: require('./translations/vi.json'),
};

i18n.translations = translations;
i18n.locale = Constants.LANGUAGE.DEFAULT;
i18n.fallbacks = true;

export const getDeviceLocale = () => {
  return (
    RNLocalize.findBestAvailableLanguage(Object.keys(translations))
      ?.languageTag || 'en'
  );
};

export const setLocale = (language) => {
  i18n.locale = language;
};

export const tUcfirst = (key, config) => {
  let result = i18n.translate(key, config);
  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
};

export const tUpperCase = (key, config) => {
  return i18n.translate(key, config).toUpperCase();
};

export const tPlural = (key, config, count) => {
  let result = i18n.translate(key, config);
  return pluralize(result, count);
};
export default (key, config) => i18n.translate(key, config);
