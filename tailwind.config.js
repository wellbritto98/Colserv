// tailwind.config.js
const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ['./src/**/*.html', './src/**/*.js', './*.html', './*.js', './src/*.html', './src/*.js'],
  theme: {
    extend: {},
  },
  plugins: [],
});
