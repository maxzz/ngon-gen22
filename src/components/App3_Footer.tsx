import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/classnames';
import { IconGithubLogo } from './UI/UIIcons';

function GitHubLink({href, className, ...rest}: {href: string} & HTMLAttributes<SVGSVGElement>) {
    return (
        <a href={href} target="_blank">
            <IconGithubLogo
                className={classNames("w-5 h-5 fill-primary-200 stroke-[50] stroke-current hover:stroke-primary-200 hover:scale-[1.5] hover:stroke-[34] transition-all", className)}
                {...rest}
                title="Open the source code of the project on Github"
            />
        </a>
    );
}

export function App3_Footer() {
    return (
        <div className="px-2 h-12 flex items-center justify-end space-x-1 bg-slate-200">
            <GitHubLink href="https://github.com/maxzz/ngon-gen" />
            <GitHubLink href="https://maxzz.github.io/ngon-gen" />
            <GitHubLink href="https://github.com/maxzz/ngon-gen22" />
        </div>
    );
}
