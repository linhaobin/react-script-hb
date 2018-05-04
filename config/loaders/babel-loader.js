const fs = require('fs')
const paths = require('../paths')

const babel = require('babel-core');

const BABELRC_FILENAME = '.babelrc'

function existsConfigFile() {
  const filename = paths.resolveApp(BABELRC_FILENAME)

  return fs.existsSync(filename) && fs.statSync(filename).isFile()
}

const babelrc = !!(existsConfigFile() || require(paths.appPackageJson).babel)

module.exports = function babelLoader(option) {
  option = option || {}
  return {
    test: /\.(js|jsx|mjs)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    ...option,
    options: {
      ...(!babelrc
        ? {
            babelrc: false,
            presets: [require.resolve('babel-preset-react-app')]
          }
        : undefined),
      ...option.options
    }
  }
}
