import React, { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { editorShapeParamsAtom } from "@/store/store";
import { NewShapeParams } from "@/store/api/shape-types";
import { initialValueNewShapeParamsMeta } from "@/store/api/shape-utils";
import { classNames } from "@/utils/classnames";
import { NewSlider } from "../../UI/NewSlider";

export function ShapeControls({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    const { outerN, innerN, outerX, outerY, innerX, innerY, stroke, w, h, ofsX, ofsY, scale, } = shapeParams;

    const shapeMembers = { outerN, innerN, outerX, outerY, innerX, innerY, stroke, };
    const sceneMembers = { w, h, ofsX, ofsY, scale, };

    const shapeControls = Object.entries(shapeMembers).map(([key, val]) => {
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

    const sceneControls = Object.entries(sceneMembers).map(([key, val]) => {
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
        <div className={classNames("px-2 py-4 text-xs bg-primary-200 flex flex-col space-y-2", className)} {...rest}>
            <div className="">
                {shapeControls}
            </div>

            {/* <div className="border-primary-300 border"></div> */}

            <div className="">
                {sceneControls}
            </div>
        </div>
    );
}
