import React, { HTMLAttributes } from "react";
import { PrimitiveAtom, SetStateAction, useAtom, useSetAtom } from "jotai";
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

function Checkbox({ value, setValue }: { value: boolean; setValue: (v: boolean) => void; }) {
    return (
        <input
            className={classNames(
                "w-3 h-3 text-primary-400 rounded form-checkbox",
                "outline-none focus:ring-1 ring-offset-1 ring-offset-primary-50 focus:ring-primary-700/50 cursor-pointer"
            )}
            type="checkbox"
            checked={value}
            onChange={() => setValue(!value)}
        />
    );
}

function CheckboxWitAtom({ valueAtom }: { valueAtom: PrimitiveAtom<boolean>; }) {
    const [show, setShow] = useAtom(valueAtom);
    return (
        <Checkbox value={show} setValue={() => setShow((p) => !p)} />
    );
}

function SwapCheckbox() {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    return (
        <label className="flex items-center space-x-1" title="The old algorithm used swap by mistake">
            <div className="">Swap inner and outer</div>
            <Checkbox value={!!shapeParams.swap} setValue={(v: boolean) => setShapeParams((p) => ({ ...p, swap: v }))} />
        </label>
    );
}

function ViewOptions() {
    return (
        <div className="grid grid-cols-[auto,auto,1fr] gap-x-1">
            <div className="place-self-center w-2 h-2 bg-orange-500/50 rounded-full"></div>
            <div className="">Show outer:</div>

            <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-1">
                    <div className="">dots</div>
                    <CheckboxWitAtom valueAtom={viewboxOptionAtoms.showOuterDotsAtom} />
                </label>
                <label className="flex items-center space-x-1">
                    <div className="">lines</div>
                    <CheckboxWitAtom valueAtom={viewboxOptionAtoms.showOuterLinesAtom} />
                </label>
            </div>

            <div className="place-self-center w-2 h-2 bg-blue-500/50 rounded-full"></div>
            <div className="">Show inner:</div>

            <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-1">
                    <div className="">dots</div>
                    <CheckboxWitAtom valueAtom={viewboxOptionAtoms.showInnerDotsAtom} />
                </label>
                <label className="flex items-center space-x-1">
                    <div className="">lines</div>
                    <CheckboxWitAtom valueAtom={viewboxOptionAtoms.showInnerLinesAtom} />
                </label>
            </div>
        </div>
    );
}

function ResetButton({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <input
            className={classNames(
                "px-1 py-0.5 border-primary-400 border-dotted border rounded-sm shadow-sm",
                "bg-primary-200 hover:bg-primary-300 focus:bg-primary-300",
                "outline-none focus:ring-1 ring-offset-1 ring-offset-primary-50 ring-primary-700/50",
                "active:scale-[.97] cursor-pointer",
                className
            )}
            type="button"
            value="Reset" {...rest}
            onClick={() => setShapeParams(initalValueShapeParams())}
        />
    );
}

function HintButton({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("flex items-end", className)} {...rest}>
            <div className={classNames(
                "w-4 h-4 text-primary-500 bg-primary-200 border-primary-500 border-dotted border rounded-md shadow-sm select-none cursor-default",
                "flex items-center justify-center",
                className
            )}>?</div>
        </div>
    );
}

type NewShapeParamsNumbers = Omit<NewShapeParams, 'id' | 'genId' | 'swap'>;

function ControlsGroup({ members, setShapeParams }: { members: Partial<NewShapeParamsNumbers>; setShapeParams: (update: SetStateAction<NewShapeParams>) => void; }) {
    const shapeControls = Object.entries(members).map(([key, val]) => {
        const meta = initialValueNewShapeParamsMeta[key as keyof Omit<NewShapeParams, 'id' | 'genId' | 'swap'>];
        return meta && (
            <NewSlider
                label={meta.label}
                min={meta.min}
                max={meta.max}
                step={meta.step}
                linkWithNext={meta.link}
                onChange={(value) => setShapeParams((p) => ({ ...p, [key]: meta.digits === 0 ? Math.floor(value) : value }))}
                value={val}
                key={key}
                title={meta.hint}
            />
        );
    });
    return (<>{shapeControls}</>);
}

export function ShapeControls({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    const { outerN, innerN, outerX, outerY, innerX, innerY, stroke, w, h, ofsX, ofsY, scale, } = shapeParams;

    const shapeMembers = { outerN, innerN, outerX, outerY, innerX, innerY, stroke, };
    const sceneMembers = { w, h, ofsX, ofsY, scale, };


    // const shapeControls = Object.entries(shapeMembers).map(([key, val]) => {
    //     const meta = initialValueNewShapeParamsMeta[key as keyof Omit<NewShapeParams, 'id' | 'genId' | 'swap'>];
    //     return meta && (
    //         <NewSlider
    //             label={meta.label}
    //             min={meta.min}
    //             max={meta.max}
    //             step={meta.step}
    //             linkWithNext={meta.link}
    //             onChange={(value) => setShapeParams((p) => ({ ...p, [key]: meta.digits === 0 ? Math.floor(value) : value }))}
    //             value={val}
    //             key={key}
    //             title={meta.hint}
    //         />
    //     );
    // });

    // const sceneControls = Object.entries(sceneMembers).map(([key, val]) => {
    //     const meta = initialValueNewShapeParamsMeta[key as keyof Omit<NewShapeParams, 'id' | 'genId' | 'swap'>];
    //     return meta && (
    //         <NewSlider
    //             label={meta.label}
    //             min={meta.min}
    //             max={meta.max}
    //             step={meta.step}
    //             linkWithNext={meta.link}
    //             onChange={(value) => setShapeParams((p) => ({ ...p, [key]: meta.digits === 0 ? Math.floor(value) : value }))}
    //             value={val}
    //             key={key}
    //         />
    //     );
    // });

    return (
        <div className={classNames("px-2 py-4 text-xs bg-primary-200 flex flex-col space-y-2 cursor-default", className)} {...rest}>

            {/* <Separator label="Shape" /> */}

            <div className="">
                {/* {shapeControls} */}
                <ControlsGroup members={shapeMembers} setShapeParams={setShapeParams} />
            </div>

            <Separator label="Box" />

            <div className="">
                {/* {sceneControls} */}
                <ControlsGroup members={sceneMembers} setShapeParams={setShapeParams} />
            </div>

            <div className="flex justify-between">
                <HintButton />
                <div className="self-end pr-3 flex flex-col items-end space-y-2">
                    <ViewBoxSize />
                    <ResetButton />
                    <ViewOptions />
                    <SwapCheckbox />
                    {/* className="self-end" */}
                </div>
            </div>
        </div>
    );
}

//TODO: ViewOptions: ctrl+click to set/reset all at once or drop down section (when up all hidden; when down respect current options)
//TODO: triangle shading
//TODO: treat debug lines as part of shape
//TODO: support colors for lines and dots (and dots radius)
//TODO: outer points as curve points
