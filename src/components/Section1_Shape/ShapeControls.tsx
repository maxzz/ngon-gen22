import React, { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { editorShapeParamsAtom } from "@/store/store";
import { NewShapeParams } from "@/store/api/shape-types";
import { initialValueNewShapeParamsMeta } from "@/store/api/shape-utils";
import { classNames } from "@/utils/classnames";
import { NewSlider } from "../UI/NewSlider";

function Separator({ label, tall = true, className, ...rest }: { label?: string; tall?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("relative", className)} {...rest}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t-primary-300 border-t"></div>
            </div>
            <div className={tall ? "relative flex justify-center" : "absolute inset-0 flex items-center justify-center"}>
                <span className="px-2 pb-1 bg-primary-200">{label}</span>
            </div>
        </div>
    );
}

function ViewBoxSize() {
    return (
        <div className="flex items-center space-x-1">
            <div className="mr-1">view box</div>
            <input
                className={classNames(
                    "px-1 py-0.5 w-8 border-primary-400 border-dotted border rounded",
                    "text-[.6rem] text-right bg-primary-200 focus:bg-primary-50 rounded-sm",
                    "outline-none focus:border-0 focus:ring-1 ring-offset-1 ring-offset-primary-50 ring-primary-700/50",
                )}
            />
            <div className="">x</div>
            <input
                className={classNames(
                    "px-1 py-0.5 w-8 border-primary-400 border-dotted border rounded",
                    "text-[.6rem] text-right bg-primary-200 focus:bg-primary-50 rounded-sm",
                    "outline-none focus:border-0 focus:ring-1 ring-offset-1 ring-offset-primary-50 ring-primary-700/50",
                )}
            />
        </div>
    );
}

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

            <Separator className="mx-2 my-1" label="Shape" tall={false}/>

            <div className="">
                {shapeControls}
            </div>

            <Separator label="Box" />

            <div className="">
                {sceneControls}
            </div>

            <div className="pr-3 self-end">
                <ViewBoxSize />
            </div>
        </div>
    );
}
