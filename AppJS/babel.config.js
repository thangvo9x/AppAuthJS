/** @format */

module.exports = function (api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./App'],
        alias: {
          'components/*': ['./App/components/*'],
          components: ['./App/components/index'],
          'configs/*': ['./App/configs/*'],
          configs: ['./App/configs/index'],
          'containers/*': ['./App/containers/*'],
          'navigations/*': ['./App/navigations/*'],
          navigations: ['./App/navigations/index'],
          'utils/*': ['./App/utils/*'],
          'utils/index': ['./App/utils/index'],
          'actions/*': ['./App/redux/actions/*'],
          'hooks/*': ['./App/hooks/*'],
          images: './App/assets/images',
          'svgs/*': ['./App/svgs/*'],
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
