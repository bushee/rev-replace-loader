var path = require('path')

module.exports = function (source) {
  try {
    var query = JSON.parse(this.query.substr(1))
    var manifest = query.manifest || require(query.manifestPath)

    for( var key in manifest) {
      var value = manifest[key]
      var pattern = new RegExp(key, 'gm')
      source = source.replace(pattern, value)
    }

  } catch (error){
     console.log(error)
  }

  return  source
}
