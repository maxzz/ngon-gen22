import React, { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { editorShapeParamsAtom } from "@/store/store";
import { NewShapeParams } from "@/store/api/shape-types";
import { initialValueNewShapeParamsMeta } from "@/store/api/shape-utils";
import { classNames } from "@/utils/classnames";
import Slider from "@/components/UI/Slider";
import { NewSlider } from "./NewSlider";

// function SliderControl({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
//     return (
//         <div className={classNames("", className)} {...rest}>11</div>
//     );
// }

export function ShapeControls({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    const { outerN, innerN, outerX, outerY, innerX, innerY, stroke, } = shapeParams;
    const members = { outerN, innerN, outerX, outerY, innerX, innerY, stroke, };

    const controls = Object.entries(members).map(([key, val]) => {
        const meta = initialValueNewShapeParamsMeta[key as keyof Omit<NewShapeParams, 'id' | 'genId'>];
        return meta && (
            <NewSlider
                label={meta.label}
                min={meta.min}
                max={meta.max}
                step={meta.step}
                onChange={(value) => setShapeParams((p) => ({ ...p, [key]: meta.digits === 0 ? Math.floor(value) : value }))}
                value={val}
                key={key}
            />
        );
    });

    return (
        <>
        <div className={classNames("bg-red-300 text-red-400", className)} {...rest}>
            {controls}
        </div>
        <div className="">
            {/* <NewSlider /> */}
        </div>
        </>
    );
}
