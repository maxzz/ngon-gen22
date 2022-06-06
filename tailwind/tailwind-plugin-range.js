const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addVariant, e }) {
    // Chrome thumb
    addVariant('thumb-w', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`thumb-w${separator}${className}`)}::-webkit-slider-thumb`;
        });
    });

    // Firefox thumb
    addVariant('thumb-m', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`thumb-m${separator}${className}`)}::-moz-range-thumb`;
        });
    });
});
