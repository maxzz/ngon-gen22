import React, { HTMLAttributes } from "react";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { editorShapeParamsAtom, viewboxOptionAtoms } from "@/store/store";
import { NewShapeParams } from "@/store/ngon/shape";
import { initalValueShapeParams, initialValueNewShapeParamsMeta } from "@/store/ngon/shape-defaults";
import { classNames } from "@/utils/classnames";
import { NewSlider } from "../UI/NewSlider";
import useFloatInput from "@/hooks/useFloatInput";

function Separator({ label, tall = true, className, ...rest }: { label?: string; tall?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("relative select-none", className)} {...rest}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t-primary-300 border-t"></div>
            </div>
            <div className={tall ? "relative flex justify-center" : "absolute inset-0 flex items-center justify-center"}>
                <span className="px-2 pb-1 bg-primary-200">{label}</span>
            </div>
        </div>
    );
}

function InputSize({ member }: { member: keyof Pick<NewShapeParams, 'w' | 'h'>; }) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    const { min, max, step } = initialValueNewShapeParamsMeta[member];
    const onChange = (v: number) => setShapeParams((p) => ({ ...p, [member]: v }));
    const [local, _onSliderChange, onInputChange, onInputKey] = useFloatInput(shapeParams[member], { min, max, step }, onChange);
    return (
        <input
            className={classNames(
                "px-1 py-0.5 w-8 border-primary-400 border-dotted border rounded-sm",
                "text-[.6rem] text-right bg-primary-200 focus:bg-primary-50",
                "outline-none focus:border-0 focus:ring-1 ring-offset-1 ring-offset-primary-50 ring-primary-700/50",
            )}
            value={local}
            onChange={onInputChange}
            onKeyDown={onInputKey}
        />
    );
}

function ViewBoxSize() {
    return (
        <div className="flex items-center space-x-1">
            <div className="mr-1">view box</div>
            <InputSize member={"w"} />
            <div className="">x</div>
            <InputSize member={"h"} />
        </div>
    );
}

function ViewOptions() {
    const [showOuterLines, setShowOuterLines] = useAtom(viewboxOptionAtoms.showOuterLinesAtom);
    const [showInnerLines, setShowInnerLines] = useAtom(viewboxOptionAtoms.showInnerLinesAtom);
    const [showOuterDots, setShowOuterDots] = useAtom(viewboxOptionAtoms.showOuterDotsAtom);
    const [showInnerDots, setShowInnerDots] = useAtom(viewboxOptionAtoms.showInnerDotsAtom);
    return (
        <div className="">
            <label className="flex items-center space-x-1">
                <input type="checkbox" checked={showInnerLines} onChange={() => setShowInnerLines((p)=>!p)} />
                <div className="">show inner lines</div>
            </label>

            <label className="flex items-center space-x-1">
                <input type="checkbox" checked={showInnerDots} onChange={() => setShowInnerDots((p)=>!p)} />
                <div className="">show inner dots</div>
            </label>

            <label className="flex items-center space-x-1">
                <input type="checkbox" checked={showOuterLines} onChange={() => setShowOuterLines((p)=>!p)} />
                <div className="">show outer lines</div>
            </label>

            <label className="flex items-center space-x-1">
                <input type="checkbox" checked={showOuterDots} onChange={() => setShowOuterDots((p)=>!p)} />
                <div className="">show outer dots</div>
            </label>

        </div>
    );
}

function ResetButton({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const setShapeParams = useUpdateAtom(editorShapeParamsAtom);
    return (
        <input
            className={classNames(
                "px-1 py-0.5 border-primary-400 border-dotted border rounded-sm shadow-sm",
                "bg-primary-200 hover:bg-primary-300 focus:bg-primary-300",
                "outline-none focus:ring-1 ring-offset-1 ring-offset-primary-50 ring-primary-700/50",
                "active:scale-[.97]",
                className
            )}
            type="button"
            value="Reset" {...rest}
            onClick={() => setShapeParams(initalValueShapeParams())}
        />
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

            {/* <Separator label="Shape" /> */}

            <div className="">
                {shapeControls}
            </div>

            <Separator label="Box" />

            <div className="">
                {sceneControls}
            </div>

            <div className="self-end pr-3 flex flex-col space-y-2">
                <ViewBoxSize />
                <ResetButton className="self-end" />
                <ViewOptions />
            </div>
        </div>
    );
}
