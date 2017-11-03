var path = require('path');
var glob = require('glob');
var loaderUtils = require('loader-utils');

module.exports = function (source) {
    var query = loaderUtils.parseQuery(this.query);
    var manifest = query.manifest || (query.manifestPath ? requireManifests(query.manifestPath) : false);
    var prefix = query.prefix || '';

    if (manifest) {
        for (var key in manifest) {
            if (manifest.hasOwnProperty(key)) {
                var value = manifest[key];
                var pattern = new RegExp(prefix + key, 'gm');
                source = source.replace(pattern, value);
            }
        }
    }

    return source;
};

function requireManifests(manifestGlob) {
    return glob.sync(manifestGlob).map(function (path) {
        return requireManifest(path);
    }).filter(function (manifest) {
        return manifest !== false;
    }).reduce(function (manifest, current) {
        return Object.assign(manifest, current);
    }, {});
}

function requireManifest(manifestPath) {
    try {
        return require(path.resolve(process.cwd(), manifestPath));
    } catch (error) {
        return false;
    }
}
