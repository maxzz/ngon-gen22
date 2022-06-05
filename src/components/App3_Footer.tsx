import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/classnames';
import { IconGithubLogo } from './UI/UIIcons';

function GitHubLink({href, className, ...rest}: {href: string} & HTMLAttributes<SVGSVGElement>) {
    return (
        <a href={href} target="_blank">
            <IconGithubLogo
                className={classNames("w-5 h-5 fill-primary-200 stroke-[50] stroke-current hover:stroke-primary-200 hover:scale-[1.5] hover:stroke-[34] transition-all", className)}
                title="Open the source code of the project on Github"
                {...rest}
            />
        </a>
    );
}

export function App3_Footer() {
    return (
        <div className="px-4 py-2 text-sm flex items-center justify-end space-x-1 bg-title3 text-primary-400/75">
            <GitHubLink href="https://github.com/maxzz/ngon-gen" title="Open the old project source code on Github" />
            <GitHubLink href="https://maxzz.github.io/ngon-gen" title="Open the old project app" />
            <GitHubLink href="https://github.com/maxzz/ngon-gen22" />
        </div>
    );
}
