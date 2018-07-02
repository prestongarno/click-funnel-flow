import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';


export default {
  input: 'main.js',
  output: {
    file: 'build/bundle.js',
    format: 'amd'
  },
  name: 'react-example',
  plugins: [
    resolve(),
    commonjs({
        include: [ "node_modules/**" ], // Default: undefined
        ignoreGlobal: false, // Default: false
        sourceMap: false // Default: true
    }),
    babel()
  ]
};
