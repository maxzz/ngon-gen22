import { HTMLAttributes, SVGProps } from "react";

export function IconHIDLogo(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg viewBox="0 0 14 14" {...rest}>
            {title && <title>{title}</title>}
            <path d="M7.5,6.4L7.68,1.14L12.73,6.4L7.79,8.41L10.73,6.4L7.5,12.9L4.27,6.4L7.21,8.41L2.27,6.4L7.32,1.14z" />
        </svg>
    );
}

// export function IconImagePlus(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
//     const { title, ...rest } = props;
//     return (
//         <svg fill="currentColor" viewBox="0 0 24 24" {...rest}>
//             {title && <title>{title}</title>}
//             <path d="M19 10a1 1 0 0 0-1 1v3.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.71l-2.48-2.49a2.79 2.79 0 0 0-3.93 0L4 12.61V7a1 1 0 0 1 1-1h8a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12.22A2.79 2.79 0 0 0 4.78 22h12.44a2.88 2.88 0 0 0 .8-.12a2.74 2.74 0 0 0 2-2.65V11A1 1 0 0 0 19 10zM5 20a1 1 0 0 1-1-1v-3.57l2.89-2.89a.78.78 0 0 1 1.1 0L15.46 20zm13-1a1 1 0 0 1-.18.54L13.3 15l.71-.7a.77.77 0 0 1 1.1 0L18 17.21zm3-15h-1V3a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V6h1a1 1 0 0 0 0-2z" />
//         </svg>
//     );
// }

export function IconDownload(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

export function IconClipboard(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
    );
}

export function UISymbolsDefs() {
    return (
        <svg
            id="svgfont"
            style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
        >
            <defs>

                <symbol id="icon-ch" viewBox="0 0 24 24">
                    <defs>
                        <clipPath id="cr-a">
                            <circle cx="12" cy="11.99" r="11.2" fill="none" />
                        </clipPath>
                    </defs>
                    <path d="M7.59 14.54 12 6.9h10a11.21 11.21 0 0 0-19.41-1v8.6Z" fill="#db4437" />
                    <path d="M16.41 14.54H7.59l-5-8.6a11.22 11.22 0 0 0 8.9 17.25l4.94-4.94Z" fill="#0f9d58" />
                    <path d="m12 6.9 4.41 7.64-4.94 8.65H12A11.21 11.21 0 0 0 22 6.9Z" fill="#ffcd40" />
                    <g clipPath="url(#cr-a)">
                        <circle cx="12" cy="11.99" r="5.09" fill="#f1f1f1" />
                        <circle cx="12" cy="11.99" r="4.07" fill="#4285f4" />
                    </g>
                </symbol>

                <symbol id="icon-ff" viewBox="0 0 24 24">
                    <defs>
                        <radialGradient id="ff-a" cx="-269.32" cy="902.68" fx="-269.32" fy="902.68" r="25.85" gradientTransform="matrix(1 0 0 -1 290.3 908)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#fff36e" />
                            <stop offset=".5" stopColor="#fc4055" />
                            <stop offset="1" stopColor="#e31587" />
                        </radialGradient>
                        <radialGradient id="ff-b" cx="-1608.67" cy="998.25" fx="-1608.67" fy="998.25" r="25.31" gradientTransform="matrix(.96 0 0 -.96 1563.12 963.42)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#ff9640" />
                            <stop offset=".8" stopColor="#fc4055" />
                        </radialGradient>
                        <radialGradient id="ff-c" cx="-1603.63" cy="1001.1" fx="-1603.63" fy="1001.1" r="42.77" gradientTransform="matrix(.96 0 0 -.96 1563.12 963.42)" gradientUnits="userSpaceOnUse">
                            <stop offset=".1" stopColor="#fff36e" />
                            <stop offset=".5" stopColor="#ff9640" />
                            <stop offset=".6" stopColor="#ff9640" />
                        </radialGradient>
                        <linearGradient id="ff-d" x1="-272.9" y1="905.35" x2="-284.54" y2="885.2" gradientTransform="matrix(1 0 0 -1 290.3 908)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#fff36e" stopOpacity=".8" />
                            <stop offset=".1" stopColor="#fff36e" stopOpacity=".7" />
                            <stop offset=".8" stopColor="#fff36e" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="ff-e" x1="-278.13" y1="907.55" x2="-271.95" y2="889.64" gradientTransform="matrix(1 0 0 -1 290.3 908)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#b833e1" />
                            <stop offset=".4" stopColor="#9059ff" />
                            <stop offset=".6" stopColor="#5b6df8" />
                            <stop offset="1" stopColor="#0090ed" />
                        </linearGradient>
                    </defs>
                    <circle cx="11.99" cy="12" r="11.39" fill="#0063e1" />
                    <path d="M21.12 5.12A11.23 11.23 0 0 0 12.44.65c-1.92-.06-3.82.43-5.47 1.42A10.66 10.66 0 0 1 12.1.82c4.47.03 9.31 3.1 10.08 8.66.83 6.32-3.62 11.67-9.82 11.67-6.83 0-11.02-6.04-9.94-11.47.02-.27.06-.53.11-.8a10.8 10.8 0 0 1 1.2-3.99c-.8.4-1.79 1.71-2.28 2.88a11.76 11.76 0 0 0-.74 5.72l.06.43a11.38 11.38 0 1 0 20.32-8.8h.03Z"
                        fill="url(#ff-a)" />
                    <path d="M22.43 9.13C21.81 3.35 16.65.76 12.1.79c-1.79 0-3.79.43-5.13 1.28-.37.22-.71.47-1.03.77l.31-.26h.03A7.66 7.66 0 0 1 8.53 1.5c1.21-.33 2.47-.48 3.73-.43a9.48 9.48 0 0 1 8.91 9.11 6.83 6.83 0 0 1-6.55 6.92 6.3 6.3 0 0 1-6.18-3.62 6.34 6.34 0 0 1-.57-1.79c-.57-3.82 1.99-7.03 4.36-7.86-1.28-1.08-4.44-1.03-6.81.71a7.97 7.97 0 0 0-3.13 5.41 9.49 9.49 0 0 0 .65 5.13 10.04 10.04 0 0 0 8.54 6.12h.85c7.55 0 10.82-5.69 10.11-12.07h-.03Z"
                        fill="url(#ff-b)" />
                    <path d="M14.63 17.11a7.46 7.46 0 0 0 7.06-7.18c.23-4.47-2.42-9.28-9.45-8.86-1.26-.05-2.52.1-3.73.43-.78.23-1.52.58-2.19 1.03l-.06.03-.28.23a9.49 9.49 0 0 1 5.95-1.11c4.01.54 7.69 3.67 7.69 7.8 0 3.16-2.45 5.61-5.32 5.41-4.27-.23-5.35-4.61-3.13-6.52-.57-.11-1.71.11-2.51 1.31-.68 1.05-.65 2.68-.23 3.82a6.3 6.3 0 0 0 6.21 3.62Z"
                        fill="url(#ff-c)" />
                    <path d="M21.12 5.12a12 12 0 0 0-1.91-1.99c.18.17.35.35.51.54a6.34 6.34 0 0 1 1.42 2.31c.54 1.82.54 4.07-.6 5.84a6.67 6.67 0 0 1-5.98 3.1h-.28c-4.27-.28-5.38-4.64-3.13-6.55-.63-.11-1.74.11-2.53 1.31-.68 1.05-.65 2.68-.23 3.82a6.34 6.34 0 0 1-.57-1.79c-.57-3.82 1.99-7.03 4.36-7.86-1.28-1.08-4.44-1.03-6.81.71a7.9 7.9 0 0 0-2.85 4.16c.15-1.34.54-2.65 1.17-3.84-.8.4-1.79 1.71-2.28 2.88a11.76 11.76 0 0 0-.71 5.75l.06.43a11.38 11.38 0 1 0 20.32-8.8h.03Z"
                        fill="url(#ff-d)" />
                    <path d="M21.12 5.97a6.37 6.37 0 0 0-1.4-2.31 8.51 8.51 0 0 0-2.56-1.85c-.82-.4-1.68-.71-2.56-.91a11.42 11.42 0 0 0-4.73 0 8.19 8.19 0 0 0-3.93 1.91A9.57 9.57 0 0 1 17.1 4.18c.47.46.88.97 1.22 1.54 1.42 2.28 1.28 5.13.17 6.78a5.43 5.43 0 0 1-4.13 2.42 6.73 6.73 0 0 0 6.18-3.1 6.93 6.93 0 0 0 .57-5.84Z"
                        fill="url(#ff-e)" />
                </symbol>

                <symbol id="icon-me" viewBox="0 0 24 24">
                    <defs>
                        <radialGradient id="me-b" cx="-306.26" cy="377.46" r="8.27" gradientTransform="matrix(1 0 0 .95 320.79 -342.22)" gradientUnits="userSpaceOnUse">
                            <stop offset=".72" stopOpacity="0" />
                            <stop offset=".95" stopOpacity=".53" />
                            <stop offset="1" />
                        </radialGradient>
                        <radialGradient id="me-d" cx="-120.2" cy="293.6" r="12.42" gradientTransform="matrix(.15 -.99 .8 .12 -209.83 -136.08)" gradientUnits="userSpaceOnUse">
                            <stop offset=".76" stopOpacity="0" />
                            <stop offset=".95" stopOpacity=".5" />
                            <stop offset="1" />
                        </radialGradient>
                        <radialGradient id="me-e" cx="-171.65" cy="355.56" r="17.55" gradientTransform="matrix(-.04 1 -2.13 -.08 753.63 205.11)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#35c1f1" />
                            <stop offset=".11" stopColor="#34c1ed" />
                            <stop offset=".23" stopColor="#2fc2df" />
                            <stop offset=".31" stopColor="#2bc3d2" />
                            <stop offset=".67" stopColor="#36c752" />
                        </radialGradient>
                        <radialGradient id="me-f" cx="-67.02" cy="691.29" r="8.44" gradientTransform="matrix(.28 .96 -.78 .23 579.69 -87.05)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#66eb6e" />
                            <stop offset="1" stopColor="#66eb6e" stopOpacity="0" />
                        </radialGradient>
                        <linearGradient id="me-a" x1="-314.8" y1="381.16" x2="-299.34" y2="381.16" gradientTransform="translate(320.79 -364.91)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#0c59a4" />
                            <stop offset="1" stopColor="#114a8b" />
                        </linearGradient>
                        <linearGradient id="me-c" x1="-306.64" y1="374.46" x2="-316.3" y2="384.97" gradientTransform="translate(320.79 -364.91)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#1b9de2" />
                            <stop offset=".16" stopColor="#1595df" />
                            <stop offset=".67" stopColor="#0680d7" />
                            <stop offset="1" stopColor="#0078d4" />
                        </linearGradient>
                    </defs>
                    <path d="M20.93 17.42a9.34 9.34 0 0 1-.91.41 9 9 0 0 1-3.11.56c-4.1 0-7.68-2.82-7.68-6.45a2.73 2.73 0 0 1 1.43-2.36C7 9.73 6 13.6 6 15.86c0 6.41 5.91 7.06 7.18 7.06a9.1 9.1 0 0 0 2.34-.4h.11a11.07 11.07 0 0 0 5.77-4.57.34.34 0 0 0-.1-.48.36.36 0 0 0-.36 0Z"
                        fill="url(#me-a)" />
                    <path d="M20.93 17.42a9.34 9.34 0 0 1-.91.41 9 9 0 0 1-3.11.56c-4.1 0-7.68-2.82-7.68-6.45a2.73 2.73 0 0 1 1.43-2.36C7 9.73 6 13.6 6 15.86c0 6.41 5.91 7.06 7.18 7.06a9.1 9.1 0 0 0 2.34-.4h.11a11.07 11.07 0 0 0 5.77-4.57.34.34 0 0 0-.1-.48.36.36 0 0 0-.36 0Z"
                        opacity=".35" fill="url(#b)" />
                    <path d="M10.07 21.83a7 7 0 0 1-.45-11.63 8.39 8.39 0 0 1 1-.62A2.86 2.86 0 0 1 12 9.23 2.8 2.8 0 0 1 14.78 12s2.12-6.9-6.93-6.9a7.28 7.28 0 0 0-6.94 6.75 11.46 11.46 0 0 0 1 4.86 11.12 11.12 0 0 0 13.56 5.82 6.55 6.55 0 0 1-5.44-.7Z"
                        fill="url(#me-c)" />
                    <path d="M10.07 21.83a7 7 0 0 1-.45-11.63 8.39 8.39 0 0 1 1-.62A2.86 2.86 0 0 1 12 9.23 2.8 2.8 0 0 1 14.78 12s2.12-6.9-6.93-6.9a7.28 7.28 0 0 0-6.94 6.75 11.46 11.46 0 0 0 1 4.86 11.12 11.12 0 0 0 13.56 5.82 6.55 6.55 0 0 1-5.44-.7Z"
                        opacity=".41" fill="url(#me-d)" />
                    <path d="M14.11 13.81c-.07.09-.29.21-.29.49a.81.81 0 0 0 .41.62 7.12 7.12 0 0 0 3.6.76 5.32 5.32 0 0 0 5.26-5.31 7.61 7.61 0 0 0-1-3.81A11.12 11.12 0 0 0 12 .9 11.09 11.09 0 0 0 .91 11.84C1 8.67 4.09 6.12 7.84 6.12a8.43 8.43 0 0 1 3.64.88 6.2 6.2 0 0 1 2.67 2.53 5.52 5.52 0 0 1 .63 2.56 3.11 3.11 0 0 1-.67 1.72Z"
                        fill="url(#me-e)" />
                    <path d="M14.11 13.81c-.07.09-.29.21-.29.49a.81.81 0 0 0 .41.62 7.12 7.12 0 0 0 3.6.76 5.32 5.32 0 0 0 5.26-5.31 7.61 7.61 0 0 0-1-3.81A11.12 11.12 0 0 0 12 .9 11.09 11.09 0 0 0 .91 11.84C1 8.67 4.09 6.12 7.84 6.12a8.43 8.43 0 0 1 3.64.88 6.2 6.2 0 0 1 2.67 2.53 5.52 5.52 0 0 1 .63 2.56 3.11 3.11 0 0 1-.67 1.72Z"
                        fill="url(#me-f)" />
                </symbol>

                <symbol id="icon-dt" viewBox="0 0 24 24">
                    <path fill="#bb0202" d="M16.84 13.22q2.45.15 2.36 2.22c-.05 1.33-.12 2.66-.13 3.98 0 .47-.13.7-.72.84-3.55.84-7.09 1.72-10.62 2.63-.58.15-.89.05-1.08-.41l-.05-.07a7.36 7.36 0 0 1-1.75-5.7c.08-1.03-.04-2.08-.07-3.11l1.62.81c.21.1.49.29.57-.12.26.15.55.2.86.18 2.41-.18 4.83-.33 7.23-.55.4-.04 1.2.13 1.14-.64l.63-.04Zm-.43 1.93c-.73.78-.68 1.69-.39 2.54.23.69 1.46.75 1.96.13.6-.75.85-1.58.44-2.48.02-.52.08-1.13-.58-1.32-.72-.21-.94.47-1.31.83-.08.08-.08.21-.11.32Z" />
                    <path fill="#2b2f37" d="M8.14 11.53c-3.82-2.1-3.61-7.45.38-9.59 1.21.72 2.1.41 2.27-.8 2.12-.35 3.87.36 5.46 1.46l-.45.07c-.59-.46-1.34-.31-2.03-.38-.23-.92-1.35-.81-1.72-.61-1.26.7-2.79.87-3.97 1.45-1.79.88-2.26 2.64-2.03 4.46a6 6 0 0 0 1.72 3.23c.09.25.44.39.36.71Z" />
                    <path fill="#7f0000" d="M16.21 13.26c.05.77-.74.6-1.14.64-2.41.23-4.82.38-7.23.55-.31.02-.6-.02-.86-.18.31-.76 1.15-.7 1.83-.89l.35.02c.75-.18 1.52-.14 2.28-.18.72-.04 1.47.15 2.17-.13l2.6.15Z" />
                    <path d="M8.14 11.53c.08-.31-.28-.46-.36-.71h.78l.6-.17c.77 1.22 2.63 1.62 4.04.87l2.63-.52-.05.47-.05.03-.13.11a6.63 6.63 0 0 1-7.04.2l-.19-.12-.23-.15Z" fill="#180606" />
                    <path fill="#465374" d="M18.41 7.01c-.03.95-.06 1.89-.98 2.58-.44.32-1.05.43-1.42.84-.77.22-1.56.25-2.36.14l-.06-.17v-.27c2.08-.31 3.34-1.36 3.84-3.11h.98Z" />
                    <path d="M18.41 7.01h-.98c-.05-.42-.01-.85-.12-1.28-.33-1.31-1.6-1.75-2.72-2.35.4-.24.96-.28 1.22-.7l.45-.07-.02.02c0 .16.06.17.17.05.42.51 1.13.84 1.25 1.53-.15.04-.35.03-.34.23 0 .02.04.06.07.06.23 0 .22-.17.27-.29.65.86.85 1.8.76 2.81Z" fill="#526184" />
                    <path fill="#fa0708" d="M8.8 13.39c-.68.18-1.52.13-1.83.89-.08.41-.36.22-.57.12-.55-.26-1.08-.54-1.62-.81 1.33-.26 2.66-.48 4.02-.2Z" />
                    <path d="M10.79 1.14c-.17 1.21-1.06 1.52-2.27.8a4.47 4.47 0 0 1 2.27-.8Z" fill="#707277" />
                    <path fill="#2b2f37" d="M16.01 10.43c.37-.41.98-.52 1.42-.84a2.92 2.92 0 0 1-1.64 1.88l.05-.47c.23-.15.18-.36.18-.57Z" />
                    <path fill="#fa0708" d="m16.21 13.26-2.6-.15-1.37-.04a9.93 9.93 0 0 1 4.6.16l-.63.04Z" />
                    <path fill="#bb0202" d="m12.24 13.06 1.37.04c-.7.29-1.45.09-2.17.13-.76.04-1.53 0-2.28.18.97-.52 2.05-.3 3.09-.36Z" />
                    <path fill="#2b2f37" d="M16.42 2.67c-.11.12-.17.11-.17-.05l.17.05ZM8.14 11.53l.23.15c-.13 0-.21-.03-.23-.15ZM15.61 11.6l.13-.11-.13.11ZM8.38 11.68l.19.12c-.12.03-.18-.03-.19-.12Z" />
                    <path d="M18.42 15.33c.41.9.16 1.73-.44 2.48-.5.62-1.73.56-1.96-.13-.28-.85-.33-1.76.39-2.54.17.13.44.24.48.4.12.47.43.33.59.12.25-.34.69-.11.94-.34Z" fill="#790000" />
                    <path fill="#7f0000" d="M18.42 15.33c-.25.22-.7 0-.94.34-.16.22-.47.35-.59-.12-.04-.16-.31-.27-.48-.4.04-.11.04-.24.11-.32.37-.36.59-1.04 1.31-.83.67.19.6.81.58 1.32Z" />
                    <path fill="#0e1013" d="M8.56 10.82h-.78A5.93 5.93 0 0 1 6.06 7.6c-.23-1.82.23-3.58 2.03-4.46 1.19-.59 2.71-.75 3.97-1.45.36-.2 1.49-.31 1.72.61-.51-.02-.94.23-1.39.36-.16-.58-.54-.24-.84-.14-.88.28-1.74.58-2.62.84-.27.08-.49.18-.65.37-1.79 2.16-2.25 3.98-.01 6.39.2.22.33.43.3.7Z" />
                    <path fill="#465374" d="M12.39 2.65c.46-.14.88-.38 1.39-.36.69.07 1.44-.08 2.03.38-.26.42-.82.46-1.22.7-1.07-.13-2.1.16-3.15.18a.45.45 0 0 1-.03-.16l.98-.74Z" />
                    <path d="M11.41 3.39c0 .06.01.11.03.16-.64.29-.68.86-.84 1.38-.59 1.76.09 3.82 1.56 4.72.27.54.81.7 1.43.74l.06.17-.45.95c-1.41.75-3.27.35-4.04-.87.03-.43-.2-.77-.54-1.07-1.78-1.59-1.41-4.42.76-5.73.54-.33 1.16-.97 2.02-.45Z" fill="#020202" />
                    <path d="M11.41 3.39c-.87-.52-1.48.12-2.02.45-2.17 1.32-2.54 4.15-.76 5.73.34.3.56.64.54 1.07l-.6.17c.03-.28-.1-.48-.3-.7-2.24-2.4-1.78-4.23.01-6.39.16-.19.38-.29.65-.37.88-.26 1.75-.56 2.62-.84.3-.1.68-.44.84.14l-.98.74Z" fill="#060708" />
                    <path fill="#0e1013" d="m13.2 11.51.45-.95c.8.12 1.59.09 2.36-.14 0 .2.05.42-.18.57l-2.63.52Z" />
                    <path fill="#6478a5" d="M10.6 4.93c.16-.51.19-1.08.84-1.38 1.05-.02 2.09-.32 3.15-.18 1.12.6 2.39 1.04 2.72 2.35.11.43.07.85.12 1.28-.5 1.75-1.76 2.81-3.84 3.11-.04-.66.19-1.4-.81-1.73.06-1.52-.35-2.82-2.18-3.46Z" />
                    <path d="M12.78 8.39c.99.33.77 1.07.81 1.73v.27c-.62-.04-1.16-.19-1.43-.74l.62-1.27Z" fill="#7c8cb3" />
                    <path fill="#6478a5" d="M17.66 4.2c-.05.13-.03.3-.27.29-.02 0-.07-.04-.07-.06 0-.2.19-.19.34-.23Z" />
                </symbol>

                <symbol id="icon-ie" viewBox="0 0 24 24">
                    <path d="M8.05 14.13c0 .55.08 1.04.25 1.49.34.86.95 1.59 1.74 2.06.39.25.82.45 1.27.61.45.16.92.28 1.4.36 1.04.16 2.1.16 3.13-.02a12.3 12.3 0 0 0 3.06-.99c.5-.23 1-.48 1.52-.75v4.81c-1.09.53-2.24.95-3.42 1.24-.58.14-1.16.25-1.76.31s-1.21.1-1.85.1a9.96 9.96 0 0 1-4.69-1.13 9.11 9.11 0 0 1-1.91-1.34A8.49 8.49 0 0 1 4 14.49c0-.93.13-1.82.38-2.67A8.5 8.5 0 0 1 7.24 7.6a9.5 9.5 0 0 1 2.33-1.35 4.95 4.95 0 0 0-1.1 1.68 7.22 7.22 0 0 0-.51 1.94h8.08c0-.82-.08-1.52-.25-2.13s-.43-1.12-.8-1.52a3.37 3.37 0 0 0-1.43-.91 6.33 6.33 0 0 0-2.12-.3c-.97 0-1.95.14-2.92.44a13.1 13.1 0 0 0-5.2 3.05c-.72.68-1.34 1.45-1.86 2.3.11-.96.32-1.88.61-2.75a11.45 11.45 0 0 1 2.79-4.48 10.08 10.08 0 0 1 4.56-2.56c.89-.2 1.83-.32 2.82-.32.58 0 1.16.05 1.74.16a9.98 9.98 0 0 1 8.11 7.21c.3 1.05.46 2.15.46 3.29v2.82H8.05Z"
                        fill="#0078d7" />
                </symbol>
            </defs>
        </svg>
    );
}

export function IconLogoCr(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-ch" />
        </svg>
    );
}

export function IconLogoFf(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-ff" />
        </svg>
    );
}

export function IconLogoMe(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-me" />
        </svg>
    );
}

export function IconLogoDt(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-dt" />
        </svg>
    );
}

export function IconLogoIe(props: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    const { title, ...rest } = props;
    return (
        <svg {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-ie" />
        </svg>
    );
}
