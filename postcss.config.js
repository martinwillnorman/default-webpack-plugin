module.exports = {
  plugins: [
    require("autoprefixer")(),
    require("css-mqpacker")(),
    require("postcss-hexrgba")(),
    require("postcss-responsive-type")(),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
};
