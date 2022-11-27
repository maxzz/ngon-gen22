const twColors = require('tailwindcss/colors');
const twTheme = require('tailwindcss/defaultTheme');
const cursors = require('./tailwind/cursors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{tsx,ts,js,jsx}'],
    theme: {
        extend: {
            colors: {
                // primary: { 100: twColors.blue['500'], },
                primary: twColors.slate,
                title: '#06133e',
                title2: '#001845',
                title3: '#003165',
                title4: '#003f82',
                title5: '#002f87',
                title6: '#3264b3',
                title7: '#93c7fe',
                url: twColors.blue['500'],
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
            cursor: {
                'tm-move': cursors.cursorMove,
                'tm-pen': cursors.cursorPen,
                'tm-pen-p': cursors.cursorPenP,
                'tm-pen-m': cursors.cursorPenM,
            },
        },
    },
    plugins: [
        require('./tailwind/tailwind-plugin-data-state'),
        require('./tailwind/tailwind-plugin-colors-bridge')({ prefix: '--tm-', groupName: 'primary' }),
        require('./tailwind/tailwind-plugin-range'),
        require('./tailwind/tailwind-plugin-overflow-overlay'),
        require('./tailwind/tailwnid-plugin-debug-styles'),
        require('./tailwind/tailwind-plugin-debug-screens'),
        require('@tailwindcss/forms')({ strategy: 'class' })
    ],
};
