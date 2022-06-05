import React, { HTMLAttributes, useState } from "react";
import { useAtom } from "jotai";
import { editorShapeParamsAtom } from "@/store/store";
import { classNames } from "@/utils/classnames";
import Slider from "@/components/UI/Slider";
import { initialValueNewShapeParamsMeta } from "@/store/api/shape-utils";

function SliderControl({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("", className)} {...rest}>11</div>
    );
}

export function ShapeControls({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [v, setV] = useState(10);
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);

    const { outerN, innerN, outerX, outerY, innerX, innerY, stroke, } = shapeParams;

    const entry = initialValueNewShapeParamsMeta.nOuter;

    return (
        <div className={classNames("", className)} {...rest}>

            <Slider label="inner" min={-100} max={100} onChange={(v) => setV(v)} value={v} />
            
            <Slider label={entry.label} min={entry.min} max={entry.max} onChange={(value) => setShapeParams((p) => ({...p, outerN: Math.floor(value)}))} value={outerN} />

        </div>
    );
}
