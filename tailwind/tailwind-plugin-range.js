const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addVariant, e }) {
    addVariant('webkit-slider-thumb', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`webkit-slider-thumb${separator}${className}`)}::-webkit-slider-thumb`;
        });
    });

    addVariant('moz-range-thumb', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`moz-range-thumb${separator}${className}`)}::--moz-range-thumb`;
        });
    });
});
