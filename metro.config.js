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
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'react-native/asset-registry') {
        return {
          filePath: require.resolve('@react-native/assets-registry/registry'),
          type: 'sourceFile',
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  transformer: {
    assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(defaultConfig, config);
