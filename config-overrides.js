const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('react-scripts/config/paths');
const version = require('./package.json').version;
const moduleName = 'cdm-rcs';
const buildFileName = `${moduleName}-${version}`;

/**
 * Utility function to replace plugins in the webpack config files used by react-scripts
 */
const replacePlugin = (plugins, nameMatcher, newPlugin) => {
    const pluginIndex = plugins.findIndex((plugin) => {
        return (
            plugin.constructor &&
            plugin.constructor.name &&
            nameMatcher(plugin.constructor.name)
        );
    });

    if (pluginIndex === -1) return plugins;

    return plugins
        .slice(0, pluginIndex)
        .concat(newPlugin)
        .concat(plugins.slice(pluginIndex + 1));
};

module.exports = {
    webpack: function (config, env) {
        const isEnvProduction = env === 'production';
        if (isEnvProduction) {
            // Entry Naming: buildFileName instead of main by CRA default build file name
            // https://webpack.js.org/configuration/entry-context/#naming
            config.entry = { [buildFileName]: './src/index.js' };

            // Disable optimization runtimeChunk
            config.optimization.runtimeChunk = false;
            // Disable optimization splitChunks
            config.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                },
            };

            // Multiple entries rewire error: Cannot read property 'filter' of undefined
            // https://github.com/timarney/react-app-rewired/issues/421
            const multiEntryManfiestPlugin = new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: paths.publicUrlOrPath,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce((manifest, file) => {
                        manifest[file.name] = file.path;
                        return manifest;
                    }, seed);
                    const entrypointFiles = {};
                    Object.keys(entrypoints).forEach((entrypoint) => {
                        entrypointFiles[entrypoint] = entrypoints[
                            entrypoint
                        ].filter((fileName) => !fileName.endsWith('.map'));
                    });

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles,
                    };
                },
            });

            // replace CRA ManifestPlugin with multiEntryManfiestPlugin
            config.plugins = replacePlugin(
                config.plugins,
                (name) => /ManifestPlugin/i.test(name),
                multiEntryManfiestPlugin
            );

            // Override JS output filename and chunkFilename
            config.output.filename = `static/js/[name].js`;
            config.output.chunkFilename = `static/js/[name].chunk.js`;

            // Override CSS output filename and chunkFilename
            // eslint-disable-next-line array-callback-return
            config.plugins.map((plugin, i) => {
                if (
                    plugin.options &&
                    plugin.options.filename &&
                    plugin.options.filename.includes('static/css')
                ) {
                    config.plugins[i].options = {
                        ...config.plugins[i].options,
                        filename: `static/css/[name].css`,
                        chunkFilename: `static/css/[name].chunk.css`,
                    };
                }
            });
        }

        return config;
    },
};
