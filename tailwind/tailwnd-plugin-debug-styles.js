const plugin = require('tailwindcss/plugin'); // http://tachyons.io/docs/debug-grid

module.exports = plugin(
    function ({ addComponents }) {
        addComponents({
            '.debug *': {
                outline: '1px solid gold', //goldenrod
            },
            '.debug-white *': {
                outline: '1px solid white',
            },
            '.debug-black *': {
                outline: '1px solid black',
            },

            '.debug-grid': {
                background: 'transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFElEQVR4AWPAC97/9x0eCsAEPgwAVLshdpENIxcAAAAASUVORK5CYII=) repeat top left',
            },

            '.debug-grid-16': {
                background: 'transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4AWOgCLz/b0epAa6UGuBOqQHOQHLUgFEDnAbcBZ4UGwDOkiCnkIhdgNgNxAYAiYlD+8sEuo8AAAAASUVORK5CYII=) repeat top left',
            },

            '.debug-grid-8-solid': {
                background: 'round:white url(data:image/gif;base64,R0lGODdhCAAIAPEAAADw/wDx/////wAAACwAAAAACAAIAAACDZQvgaeb/lxbAIKA8y0AOw==) repeat top left',
            },

            '.debug-grid-16-solid': {
                background: 'round:white url(data:image/gif;base64,R0lGODdhEAAQAPEAAADw/wDx/xXy/////ywAAAAAEAAQAAACIZyPKckYDQFsb6ZqD85jZ2+BkwiRFKehhqQCQgDHcgwEBQA7) repeat top left',
            },
        });
    },
);
