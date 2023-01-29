const path = require('path');
module.exports = {
  entry:{
    main: path.resolve(__dirname, 'source/main.js'),
  },
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname,'build/js')
  }
}
