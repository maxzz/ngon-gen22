import { HTMLAttributes, SVGProps } from "react";

export function IconAppLogo({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 14 14" {...rest}>
            {title && <title>{title}</title>}
            <path d="M7.5,6.4L7.68,1.14L12.73,6.4L7.79,8.41L10.73,6.4L7.5,12.9L4.27,6.4L7.21,8.41L2.27,6.4L7.32,1.14z" />
        </svg>
    );
}

export function IconGithubLogo({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 1024 1024" {...rest}>
            {title && <title>{title}</title>}
            <path d="M512 76a447 447 0 00-148 870c23 6 20-11 20-22v-78c-136 16-141-74-151-89-18-31-61-39-48-54 30-16 62 4 98 58 27 39 78 32 104 26 6-24 18-45 35-61-141-25-199-111-199-213 0-49 16-95 48-132-20-60 2-112 5-120 58-5 119 42 123 46a435 435 0 01226 0c12-9 68-49 122-44 3 8 25 58 5 118 33 37 49 83 49 132 0 103-59 189-200 213a128 128 0 0138 91v113c1 9 0 18 15 18A448 448 0 00512 76z" />
        </svg>
    );
}

function IconLinkedNo({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeDasharray={'32'} strokeDashoffset={0} d="M15.34 6.35V4.74a2.8 2.8 0 0 0-2.81-2.81H4.82a2.8 2.8 0 0 0-2.81 2.81v7.71a2.8 2.8 0 0 0 2.81 2.81h1.71" />
            <path strokeDasharray={'32'} strokeDashoffset={0} d="M17.42 8.75h1.76a2.8 2.8 0 0 1 2.81 2.81v7.71a2.8 2.8 0 0 1-2.81 2.81h-7.71a2.8 2.8 0 0 1-2.81-2.81v-.81" />
        </svg>
    );
}

function IconLinkedOrg({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeDasharray={'44'} strokeDashoffset={0} d="M6.53 15.25H4.82a2.8 2.8 0 0 1-2.81-2.81V4.73a2.8 2.8 0 0 1 2.81-2.81h7.71a2.8 2.8 0 0 1 2.81 2.81v7.71a2.8 2.8 0 0 1-2.81 2.81h-1.74" />
            <path strokeDasharray={'44'} strokeDashoffset={0} d="M17.47 8.75h1.71a2.8 2.8 0 0 1 2.81 2.81v7.71a2.8 2.8 0 0 1-2.81 2.81h-7.71a2.8 2.8 0 0 1-2.81-2.81v-7.71a2.8 2.8 0 0 1 2.81-2.81h1.74" />
        </svg>
    );
}

function IconLinked({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* <rect strokeDasharray={'45'} strokeDashoffset={0} x="4" y="7" width="12.43" height="12.43" rx="2.62" ry="2.62" transform="" className="stroke-blue-500" /> */}

            {/* <rect strokeDasharray={'45'} strokeDashoffset={0} x="0" y="7" width="12.43" height="12.43" rx="2.62" ry="2.62" transform="rotate(-45) translate(8 0)" className="origin-center stroke-red-500" /> */}
            {/* <rect strokeDasharray={'45'} strokeDashoffset={0} x="4" y="7" width="12.43" height="12.43" rx="2.62" ry="2.62" transform="rotate(-45 10 13)" className="stroke-green-500" /> */}
            {/* <rect strokeDasharray={'45'} strokeDashoffset={0} x="4" y="7" width="12.43" height="12.43" rx="2.62" ry="2.62" transform="translate(1, 0) rotate(-45 10 13)" className="stroke-green-500" /> */}
            {/* <rect strokeDasharray={'45'} strokeDashoffset={0} x="4" y="7" width="12" height="12" rx="2.62" ry="2.62" transform="translate(0, 0) rotate(-45)" className="origin-center stroke-red-500" /> */}
            <rect strokeDasharray={'45'} strokeDashoffset={0} x="3.7" y="7" width="12" height="12" rx="2.62" ry="2.62" transform="translate(0, 0) rotate(-45 9.7 13)" className="stroke-green-500" />
            <rect strokeDasharray={'45'} strokeDashoffset={0} x="4" y="7" width="12" height="12" rx="2.62" ry="2.62" transform="translate(5, 0) rotate(-45 10 13)" className="stroke-green-500" />
            {/* <rect strokeDasharray={'45'} strokeDashoffset={0} x="8.38" y="5.78" width="12.43" height="12.43" rx="2.62" ry="2.62" transform="rotate(-45 14.6 12)" /> */}
        </svg>
    );
}

function IconLinkedRotated({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeDasharray={'44'} strokeDashoffset={0} d="M6.53 15.25H4.82a2.8 2.8 0 0 1-2.81-2.81V4.73a2.8 2.8 0 0 1 2.81-2.81h7.71a2.8 2.8 0 0 1 2.81 2.81v7.71a2.8 2.8 0 0 1-2.81 2.81h-1.74" />
            <path strokeDasharray={'44'} strokeDashoffset={0} d="M17.47 8.75h1.71a2.8 2.8 0 0 1 2.81 2.81v7.71a2.8 2.8 0 0 1-2.81 2.81h-7.71a2.8 2.8 0 0 1-2.81-2.81v-7.71a2.8 2.8 0 0 1 2.81-2.81h1.74" />
        </svg>
    );
}

//TODO: icon to remove duplicates
// fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
export function IconImage({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 512 512" {...rest}>
            {title && <title>{title}</title>}
            <rect width="416" height="352" x="48" y="80" rx="48" ry="48" />
            <circle cx="336" cy="176" r="32" />
            <path d="m304 335.79l-90.66-90.49a32 32 0 0 0-43.87-1.3L48 352m176 80l123.34-123.34a32 32 0 0 1 43.11-2L464 368" />
        </svg>
    );
}

export function IconImages({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 512 512" {...rest}>
            {title && <title>{title}</title>}
            <path d="M432 112V96a48.14 48.14 0 0 0-48-48H64a48.14 48.14 0 0 0-48 48v256a48.14 48.14 0 0 0 48 48h16" />
            <rect width="400" height="336" x="96" y="128" rx="45.99" ry="45.99" />
            <ellipse cx="372.92" cy="219.64" rx="30.77" ry="30.55" />
            <path d="M342.15 372.17L255 285.78a30.93 30.93 0 0 0-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0 1 41.46-1.87L496 402.91" />
        </svg>
    );
}

export function IconTrash({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" {...rest}>
            {title && <title>{title}</title>}
            <path d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z" />
        </svg>
    );
}

{/* <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <style>
      .cls-1{fill:none;stroke:red;stroke-miterlimit:10;stroke-width:1.13px}
    </style>
  </defs>
  <path fill="#999" d="M0 0h24v24H0z"/>
  <rect class="cls-1" x="3.19" y="5.78" width="12.43" height="12.43" rx="2.62" ry="2.62" transform="rotate(-45 9.4 12)"/>
  <rect class="cls-1" x="8.38" y="5.78" width="12.43" height="12.43" rx="2.62" ry="2.62" transform="rotate(-45 14.6 12)"/>
</svg> */}

// export function IconImagePlus({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
//     return (
//         <svg fill="currentColor" viewBox="0 0 24 24" {...rest}>
//             {title && <title>{title}</title>}
//             <path d="M19 10a1 1 0 0 0-1 1v3.38l-1.48-1.48a2.79 2.79 0 0 0-3.93 0l-.7.71l-2.48-2.49a2.79 2.79 0 0 0-3.93 0L4 12.61V7a1 1 0 0 1 1-1h8a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v12.22A2.79 2.79 0 0 0 4.78 22h12.44a2.88 2.88 0 0 0 .8-.12a2.74 2.74 0 0 0 2-2.65V11A1 1 0 0 0 19 10zM5 20a1 1 0 0 1-1-1v-3.57l2.89-2.89a.78.78 0 0 1 1.1 0L15.46 20zm13-1a1 1 0 0 1-.18.54L13.3 15l.71-.7a.77.77 0 0 1 1.1 0L18 17.21zm3-15h-1V3a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0V6h1a1 1 0 0 0 0-2z" />
//         </svg>
//     );
// }

export function IconDownload({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

export function IconClipboard({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
    );
}

export function IconCross({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" viewBox="0 0 20 20" {...rest}>
            {title && <title>{title}</title>}
            <path d="M4.3 4.3a1 1 0 0 1 1.4 0L10 8.58l4.3-4.3a1 1 0 1 1 1.4 1.42L11.42 10l4.3 4.3a1 1 0 0 1-1.42 1.4L10 11.42l-4.3 4.3a1 1 0 0 1-1.4-1.42L8.58 10l-4.3-4.3a1 1 0 0 1 0-1.4z" />
        </svg>
    );
}

export function IconCode({ title, ...rest }: SVGProps<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" viewBox="0 0 256 256" {...rest}>
            {title && <title>{title}</title>}
            <path d="M69.1 94.1 28.5 128l40.6 33.9a7.9 7.9 0 0 1 1.1 11.2A8.1 8.1 0 0 1 64 176a7.7 7.7 0 0 1-5.1-1.9l-48-40a7.9 7.9 0 0 1 0-12.2l48-40a8 8 0 1 1 10.2 12.2Zm176 27.8-48-40a8 8 0 0 0-10.2 12.2l40.6 33.9-40.6 33.9A8 8 0 0 0 192 176a7.7 7.7 0 0 0 5.1-1.9l48-40a7.9 7.9 0 0 0 0-12.2Zm-82.4-89.4a7.9 7.9 0 0 0-10.2 4.8l-64 176a7.9 7.9 0 0 0 4.8 10.2 8.6 8.6 0 0 0 2.7.5 7.9 7.9 0 0 0 7.5-5.3l64-176a7.9 7.9 0 0 0-4.8-10.2Z" />
        </svg>
    );
}
