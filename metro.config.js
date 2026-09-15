const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'mbtiles',
      'tflite',
      'ppn',
      'ppv',
      'md',
      'db',
      'bin',
    ],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    extraNodeModules: {
      'react-native/asset-registry': require.resolve('@react-native/assets-registry/registry'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(defaultConfig, config);
