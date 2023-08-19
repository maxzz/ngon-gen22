import { HTMLAttributes, ReactNode, useCallback } from "react";
import { PrimitiveAtom, SetStateAction, useAtom } from "jotai";
import { editorShapeParamsAtom, initialValueNewShapeParamsMeta, viewboxOptionAtoms } from "@/store";
import { NewShapeParams } from "@/store/ngon/types-shape";
import { classNames } from "@/utils/classnames";
import { debounce } from "@/utils/debounce";
import { NewSlider } from "@/components/UI/slider/NewSlider";
import { useFloatInput } from "@/hooks/useFloatInput";
import { UIAccordion } from "@/components/UI/section/UIAccordion";
import { UIArrow } from "@/components/UI/icons/UIArrow";
import { BoxUtility } from "./Boxes";

function Separator({ label, tall = true, className, ...rest }: { label?: ReactNode; tall?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("relative select-none", className)} {...rest}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                {/* <div className="w-full border-t-primary-300 border-t"></div> */}{/* wiredjs.com */}
                <svg className="stroke-transparent fill-primary-500" viewBox="0 0 600 6">
                    <path d="M.72 2.21c142.84.73 287.01.51 598.74 1M.01 3.09C214.67 4.2 428.48 4.18 600 2.6" />
                </svg>
            </div>
            <div className={tall ? "relative flex justify-center" : "absolute inset-0 flex items-center justify-center"}>
                <span className="px-2 pb-1 bg-primary-100">
                    {label}
                </span>
            </div>
        </div>
    );
}

function SubSection({ label, openAtom, children }: { label: string; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <Separator
            label={
                <div className="flex items-center cursor-pointer">
                    <div className="">{label}</div>
                    <UIArrow className="w-4 h-4 pt-1 text-primary-500" open={open} />
                </div>
            }
            onClick={() => setOpen(v => !v)}
        />
        <UIAccordion open={open}>
            {children}
        </UIAccordion>
    </>);
}

/** /
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
/**/

/** /
function ShowAllCheckbox() { //TODO: make it dropdown
    const [showAll, setShowAll] = useAtom(viewboxOptionAtoms.showAllAtom);
    return (
        <label className="flex items-center space-x-1">
            <div className="">Show helpers</div>
            <Checkbox value={showAll} setValue={() => setShowAll(p => !p)} />
        </label>
    );
}
/**/

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

function SwapCheckbox({ className, ...rest }: HTMLAttributes<HTMLElement>) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    return (
        <label
            className={classNames("flex items-center space-x-1", className)}
            title="The old algorithm used swap by mistake"
            {...rest}
        >
            <div className="">Swap inner and outer</div>
            <Checkbox value={!!shapeParams.swap} setValue={(v: boolean) => setShapeParams((p) => ({ ...p, swap: v }))} />
        </label>
    );
}

function ViewGadgets({ swap }: { swap: boolean | undefined; }) {
    return (
        <div className="grid grid-cols-[auto,auto,1fr] gap-x-1">
            <div className={classNames("place-self-center w-2 h-2 rounded-full", swap ? "bg-blue-500/50" : "bg-orange-500/50")}></div>
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

            <div className={classNames("place-self-center w-2 h-2 rounded-full", swap ? "bg-orange-500/50" : "bg-blue-500/50")}></div>
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

type NewShapeParamsNumbers = Omit<NewShapeParams, 'id' | 'genId' | 'swap'>;

function GroupControls({ members, setShapeParams }: { members: Partial<NewShapeParamsNumbers>; setShapeParams: (update: SetStateAction<NewShapeParams>) => void; }) {
    const shapeControls = Object.entries(members).map(([key, val]) => {
        const meta = initialValueNewShapeParamsMeta[key as keyof NewShapeParamsNumbers];
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
    return (<>
        {shapeControls}
    </>);
}

export function EditorControls({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    const { outerN, innerN, outerX, outerY, innerX, innerY, stroke, w, h, ofsX, ofsY, scale, } = shapeParams;

    const shapeMembers = { outerN, innerN, outerX, outerY, innerX, innerY, stroke, };
    const sceneMembers = { w, h, ofsX, ofsY, scale, };

    const bouncedSet = useCallback(debounce(setShapeParams, 100), []);

    return (
        <div className={classNames("px-2 py-4 text-xs bg-primary-100 flex flex-col space-y-1 cursor-default", className)} {...rest}>

            <div>
                <GroupControls members={shapeMembers} setShapeParams={bouncedSet} />
                <SwapCheckbox className="pr-2.5 h-5 justify-end" />
            </div>

            <SubSection label="Box" openAtom={viewboxOptionAtoms.showBoxAtom}>
                <div className="py-0.5 flex flex-col items-end">
                    <GroupControls members={sceneMembers} setShapeParams={bouncedSet} />
                </div>
            </SubSection>

            <SubSection label="Gadgets" openAtom={viewboxOptionAtoms.showAllAtom}>
                <div className="px-2.5 py-0.5 flex flex-col items-end">
                    <ViewGadgets swap={shapeParams.swap} />
                </div>
            </SubSection>

            <SubSection label="Utility" openAtom={viewboxOptionAtoms.showUtilsAtom}>
                <BoxUtility />
            </SubSection>

        </div>
    );
}

//TODO: ViewOptions: ctrl+click to set/reset all at once or drop down section (when up all hidden; when down respect current options)
//TODO: triangle shading
//TODO: treat debug lines as part of shape
//TODO: support colors for lines and dots (and dots radius)
//TODO: outer points as curve points
//TODO: make SVG corners rounded when strokes are big
//TODO: replace spread of shapeParams in EditorControls with function selector
