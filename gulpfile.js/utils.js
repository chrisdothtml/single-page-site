'use strict'

/**
 * Gathers a glob to use for concatting bower
 * packages
 */
function getBowerGlobs () {
  var result = []
  const packages = {
    spf: 'dist/spf.js'
  }

  for (let name in packages) {
    if (!packages.hasOwnProperty(name)) continue

    let path = packages[name]

    result.push(`bower_components/${name}/${path}`)
  }

  return result
}

module.exports = {
  getBowerGlobs
}
