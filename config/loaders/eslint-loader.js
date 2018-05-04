const fs = require('fs')
const path = require('path')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const paths = require('../paths')

const CONFIG_FILES = [
  '.eslintrc.js',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
  '.eslintrc'
]

function existsConfigFile() {
  return CONFIG_FILES.some(configFile => {
    const filename = paths.resolveApp(configFile)

    return fs.existsSync(filename) && fs.statSync(filename).isFile()
  })
}

const useEslintrc = !!(
  existsConfigFile() || require(paths.appPackageJson).eslintConfig
)

module.exports = {
  test: /\.(js|jsx|mjs)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        formatter: eslintFormatter,
        eslintPath: require.resolve('eslint'),
        ...(!useEslintrc
          ? {
              baseConfig: {
                extends: [require.resolve('eslint-config-react-app')]
              },
              ignore: false,
              useEslintrc: false
            }
          : undefined)
      },
      loader: require.resolve('eslint-loader')
    }
  ],
  include: paths.appSrc,
  exclude: [/[/\\\\]node_modules[/\\\\]/]
}
