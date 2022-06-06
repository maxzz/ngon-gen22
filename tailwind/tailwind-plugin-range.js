const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addVariant, e }) {
    // Chrome thumb
    addVariant('wthumb', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`wthumb${separator}${className}`)}::-webkit-slider-thumb`;
        });
    });

    // Firefox thumb
    addVariant('mthumb', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`mthumb${separator}${className}`)}::-moz-range-thumb`;
        });
    });
});
