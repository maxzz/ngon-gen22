const twColors = require('tailwindcss/colors');
const twTheme = require('tailwindcss/defaultTheme');
const SVG = require('mini-svg-data-uri');

const cursorMove1 = `url("${SVG(`
<svg id="Layer_4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#fffc" d="M16.54 22.8a.49.49 0 0 1-.35-.15l-2.49-2.47c-.14-.14-.19-.36-.11-.55s.26-.31.46-.31h1.72v-2.44h-2.43v1.73c0 .2-.12.39-.31.46a.51.51 0 0 1-.55-.11l-2.47-2.49a.5.5 0 0 1 0-.7l2.47-2.49a.5.5 0 0 1 .55-.11.5.5 0 0 1 .31.46v1.72h2.43v-2.43h-1.72c-.2 0-.39-.12-.46-.31s-.03-.4.11-.55l2.49-2.47a.5.5 0 0 1 .7 0l2.49 2.47c.14.14.19.36.11.55s-.26.31-.46.31H17.3v2.43h2.44v-1.72c0-.2.12-.39.31-.46.19-.08.4-.03.55.11l2.47 2.49a.5.5 0 0 1 0 .7l-2.47 2.49a.5.5 0 0 1-.55.11.5.5 0 0 1-.31-.46v-1.73H17.3v2.44h1.73c.2 0 .39.12.46.31s.03.4-.11.55l-2.49 2.47c-.1.1-.22.15-.35.15Z"/>
  <path d="M20.24 18.62v-2.23H16.8v3.44h2.23l-2.49 2.47-2.49-2.47h2.22v-3.44h-3.43v2.23l-2.47-2.49 2.47-2.49v2.22h3.43v-3.43h-2.22l2.49-2.47 2.49 2.47H16.8v3.43h3.44v-2.22l2.47 2.49-2.47 2.49z"/>
  <path fill="#fffc" d="M.5 17.03a.4.4 0 0 1-.19-.04.5.5 0 0 1-.31-.46V.5C0 .3.12.12.31.04a.5.5 0 0 1 .55.11l10.67 10.57a.5.5 0 0 1-.3.85l-5.61.64-4.77 4.68a.5.5 0 0 1-.35.14Z"/>
  <path d="M.5.5v16.03l4.89-4.8 5.79-.65L.5.5z"/>
</svg>
`)}") 0 0, auto`;

const cursorMove = `url("${SVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <style>
      .cls-2{fill:none;stroke:#000;stroke-linejoin:round;stroke-width:.5px}
    </style>
  </defs>
  <path class="cls-2" d="m4.2 6.61-.68.28L.98.84l-.66.33L.31 9l2.91 3.33 4.86-2.25V6.24L2.45.31l-.79.26L4.2 6.61z"/>
  <path class="cls-2" d="m8.6 9.88 1.61 3.15-5.93 2.81-1.64-3.26 5.96-2.7z"/>
</svg>

`)}") 0 0, auto`;

const cursorPenP = `url("${SVG(`
`)}") 0 0, auto`;

const cursorPenM = `url("${SVG(`
`)}") 0 0, auto`;

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
                'tm-move': cursorMove,
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
        require('@tailwindcss/forms')({strategy: 'class'})
    ],
};
