'use strict'

/**
 * Resolves provided paths object
 *
 * @returns {array}
 */
function resolvePaths (paths) {
  const result = []

  /**
   * Prepends provided base to provided path
   */
  function addBase (base, path) {
    var result = path

    // add if exists
    if (base) result = `${base}/${path}`

    return result
  }

  /**
   * Recursively builds paths and adds them
   * to the result array
   */
  function resolve (path, base) {
    if (typeof path === 'string') {
      path = addBase(base, path)
      result.push(path)
    } else if (Array.isArray(path)) {
      // resolve each
      path.forEach(subPath => {
        resolve(subPath, base)
      })
    } else if (typeof path === 'object') {
      // add base and resolve for each
      for (let subPath in path) {
        if (!path.hasOwnProperty(subPath)) continue

        let subBase = addBase(base, subPath)

        resolve(path[subPath], subBase)
      }
    }
  }

  resolve(paths)
  return result
}

module.exports = {
  resolvePaths
}
