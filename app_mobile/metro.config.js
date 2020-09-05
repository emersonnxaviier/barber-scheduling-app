const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts }
    } = await getDefaultConfig();
    return {
        transformer: {
            babelTransformerPath: require.resolve("react-native-svg-transformer")
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== "svg"),
            sourceExts: [...sourceExts, "svg"]
        }
    };
})();

/*
    getTransformOptions: async () => ({
                transformer: {
                    experimentalImportSupport: false,
                    inlineRequire: false,
                },
            }),
*/

// CRIADO PARA USAR IMAGENS SVG, E ADICIONA UMA REFERENCIA DESSE ARQUIVO EM APP.JSON