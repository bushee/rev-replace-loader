var path        = require('path')
var loaderUtils = require('loader-utils')

module.exports = function(source) {

  var query = loaderUtils.parseQuery(this.query)
  var manifest = query.manifest || (query.manifestPath ? requireManifest(query.manifestPath) : false)

  if (manifest) {
    for ( var key in manifest ) {
      var value = manifest[key]
      var pattern = new RegExp(key, 'gm')
      source = source.replace(pattern, value)
    }
  }

  return source
}

function requireManifest(manifestPath) {
  try {
    return require(manifestPath)
  } catch(error) {
    return false
  }
}
