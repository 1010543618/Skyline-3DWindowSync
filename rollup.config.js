export default {
  input: 'rollup.js',
  external: ['jquery'],
  output: {
    name: "s3dws",
    file: 'dist/s3dws.js',
    format: 'umd',
    globals: {
      jquery: '$'
    }
  },
}