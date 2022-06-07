const twColors = require('tailwindcss/colors');
const twTheme = require('tailwindcss/defaultTheme');

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
        },
    },
    plugins: [
        require('./tailwind/tailwind-plugin-data-state'),
        require('./tailwind/tailwind-plugin-colors-bridge')({ prefix: '--tm-', groupName: 'primary' }),
        require('./tailwind/tailwnd-plugin-debug-styles'),
        require('./tailwind/tailwind-plugin-range'),
        require('./tailwind/tailwind-plugin-overflow-overlay'),
        require('./tailwind/tailwind-plugin-debug-screens'),
        require('@tailwindcss/forms')({strategy: 'class'})
    ],
};
