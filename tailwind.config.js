const twColors = require('tailwindcss/colors');
const twTheme = require('tailwindcss/defaultTheme');
const SVG = require('mini-svg-data-uri');

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
                'tm-move2': `url("${SVG(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <defs>
                    <style>
                        .cls-1{fill:#fff;opacity:0.75}
                    </style>
                    </defs>
                    <path d="M.6.55V14.2l.84-.07 3.65-4.01 4.91.02-.16-.5L1.02.71.6.55z"/>
                    <path class="cls-1" d="m.6.55.42.15 8.82 8.94.15.5-4.91-.02-3.64 4.01-.83.07V.55m0-.5c-.1 0-.2.03-.29.09a.5.5 0 0 0-.21.41V14.2c0 .14.06.27.16.37.09.09.21.13.34.13h.04l.83-.07a.52.52 0 0 0 .33-.16l3.51-3.84 4.68.02c.16 0 .31-.07.4-.2a.53.53 0 0 0 .08-.44l-.15-.5a.55.55 0 0 0-.12-.21L1.38.35A.57.57 0 0 0 1.2.23L.77.08A.5.5 0 0 0 .6.05Z"/>
                    <path d="m22.43 15.19-2.23-2.34v1.85h-3.67v-3.67h1.85L16.01 8.8l-2.33 2.23h1.85v3.67h-3.67v-1.85l-2.24 2.37 2.24 2.33V15.7h3.67v3.67h-1.85l2.37 2.24 2.33-2.24h-1.85V15.7h3.67v1.85l2.23-2.36z"/>
                    <path class="cls-1" d="m16.01 8.8 2.36 2.23h-1.85v3.67h3.67v-1.85l2.23 2.33-2.23 2.36v-1.85h-3.67v3.67h1.85l-2.33 2.23-2.36-2.23h1.85v-3.67h-3.67v1.85l-2.23-2.33 2.23-2.36v1.85h3.67v-3.67h-1.85l2.33-2.23m0-.5a.54.54 0 0 0-.35.14l-2.33 2.23a.51.51 0 0 0-.12.55.5.5 0 0 0 .46.31h1.35v2.67h-2.67v-1.35c0-.2-.12-.39-.32-.46a.58.58 0 0 0-.18-.04.46.46 0 0 0-.36.16l-2.23 2.36a.5.5 0 0 0 0 .69l2.23 2.33c.1.1.23.15.36.15.06 0 .13-.01.19-.04a.5.5 0 0 0 .31-.46v-1.35h2.67v2.67h-1.35c-.2 0-.39.12-.46.32a.5.5 0 0 0 .12.55l2.36 2.23c.1.09.22.14.34.14s.25-.05.35-.14l2.33-2.23a.51.51 0 0 0 .12-.55.5.5 0 0 0-.46-.31h-1.35V16.2h2.67v1.35c0 .2.12.39.32.46.06.02.12.04.18.04.13 0 .27-.05.36-.16l2.23-2.36a.5.5 0 0 0 0-.69l-2.23-2.33a.5.5 0 0 0-.36-.15.43.43 0 0 0-.19.04.5.5 0 0 0-.31.46v1.35h-2.67v-2.67h1.35c.2 0 .39-.12.46-.32a.5.5 0 0 0-.12-.55l-2.36-2.23a.51.51 0 0 0-.34-.14Z"/>
                </svg>
                `)}") 0 0, auto`
            },
        },
    },
    plugins: [
        require('./tailwind/tailwind-plugin-data-state'),
        require('./tailwind/tailwind-plugin-colors-bridge')({ prefix: '--tm-', groupName: 'primary' }),
        require('./tailwind/tailwnid-plugin-debug-styles'),
        require('./tailwind/tailwind-plugin-range'),
        require('./tailwind/tailwind-plugin-overflow-overlay'),
        require('./tailwind/tailwind-plugin-debug-screens'),
        require('@tailwindcss/forms')({strategy: 'class'})
    ],
};
