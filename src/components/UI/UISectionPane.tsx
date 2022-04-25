import React, { HTMLAttributes } from 'react';
import { a, useSpring } from '@react-spring/web';

export function UISectionPane({ className, children, open = true, ...rest }: { open?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    const styles = useSpring({ open: open ? 1 : 0, config: { mass: 0.2, tension: 492, clamp: true } });
    return (
        <div
            className={className || "px-2 py-1 bg-slate-500 text-stone-100 uppercase flex items-center justify-between select-none cursor-pointer font-ui"}
            {...rest}
        >
            {/* Section name */}
            {children}
            {/* Open/Close icon */}
            <svg className="w-6 h-6 p-1 stroke-current stroke-[.6rem] fill-transparent" viewBox="0 0 100 100">
                <a.path d={styles.open.to({ range: [0, .3, 1], output: ["M 50 13 L 80 43 L 50 72", "M 50 13 L 50 42 L 50 72", "M 80 35 L 50 65 L 20 35"] })} />
            </svg>
        </div>
    );
}
