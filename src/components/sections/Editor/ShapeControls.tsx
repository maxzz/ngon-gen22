import React, { HTMLAttributes, useState } from "react";
import { classNames } from "@/utils/classnames";
import Slider from "@/components/UI/Slider";

function SliderControl({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("", className)} {...rest}>11</div>
    );
}

export function ShapeControls({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [v, setV] = useState(10);
    return (
        <div className={classNames("", className)} {...rest}>

            <Slider label="inner" min={-100} max={100} onChange={(v) => setV(v)} value={v} />

        </div>
    );
}
