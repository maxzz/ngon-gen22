import React, { HTMLAttributes, useState } from "react";
import { useAtom } from "jotai";
import { editorShapeParamsAtom } from "@/store/store";
import { classNames } from "@/utils/classnames";
import Slider from "@/components/UI/Slider";
import { initialValueNewShapeParamsMeta } from "@/store/api/shape-utils";
import { NewShapeParams, NewShapeParamsMetaItem } from "@/store/api/shape-types";

function SliderControl({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("", className)} {...rest}>11</div>
    );
}

export function ShapeControls({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [v, setV] = useState(10);
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);

    const { outerN, innerN, outerX, outerY, innerX, innerY, stroke, } = shapeParams;

    const fields = { outerN, innerN, outerX, outerY, innerX, innerY, stroke, };

    const controls = Object.entries(fields).map(([key, val]) => {
        const meta = initialValueNewShapeParamsMeta[key as keyof Omit<NewShapeParams, 'id' | 'genId'>];
        return meta && (
            <Slider
                label={meta.label}
                min={meta.min}
                max={meta.max}
                step={meta.step}
                onChange={(value) => setShapeParams((p) => ({ ...p, [key]: meta.digits === 0 ? Math.floor(value) : value }))}
                value={val}
            />
        );
    });

    const entry = initialValueNewShapeParamsMeta.outerN;

    return (
        <div className={classNames("", className)} {...rest}>

            <Slider label="inner" min={-100} max={100} onChange={(v) => setV(v)} value={v} />

            <Slider
                label={entry.label}
                min={entry.min}
                max={entry.max}
                step={entry.step}
                onChange={(value) => setShapeParams((p) => ({ ...p, outerN: entry.digits === 0 ? Math.floor(value) : value }))}
                value={outerN}
            />

            {controls}

        </div>
    );
}
