var path = require('path')

module.exports = function(source) {

  var query = JSON.parse(this.query.substr(1))
  var manifest = query.manifest || query.manifestPath ? requireManifest(query.manifestPath) : false

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
