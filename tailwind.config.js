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
        require('@tailwindcss/forms')
    ],
};
