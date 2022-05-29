const twColors = require('tailwindcss/colors');
const twTheme = require('tailwindcss/defaultTheme');
const colorsBridge = require('./tailwind-plugin-colors-bridge')
const dataState = require('./tailwind-plugin-data-state');

module.exports = {
    content: ['./index.html', './src/**/*.{tsx,ts,js,jsx}'],
    theme: {
        extend: {
            colors: {
                url: '#0047cc',
            },
            // keyframes: {
            //     slidein: {
            //         '0%': { ransform: 'translateY(-100%)',},
            //         '100%': { transform: 'translateY(0)', }                    
            //     }
            // },
            // animation: {
            //     slidein: 'slidein 5s',
            // },
        },
    },
    plugins: [
        dataState,
        colorsBridge({groupName: 'slate'}),
        require('@tailwindcss/forms')
    ],
};
