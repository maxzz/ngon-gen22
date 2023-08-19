import { HTMLAttributes } from "react";
import { useSetAtom } from "jotai";
import { initalValueShapeParams } from "@/store/ngon";
import { editorShapeParamsAtom, vaultActions } from "@/store";
import { classNames } from "@/utils/classnames";
import { IconCode } from "@/components/UI/Icons/normal";

function HintButton({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(
            "w-4 h-4 text-primary-500 bg-primary-100 border-primary-500 border-dotted border rounded-md shadow-sm select-none cursor-default",
            "flex items-center justify-center",
            className
        )} {...rest}>?</div>
    );
}

function Button({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <button
            className={classNames(
                "px-1 py-0.5 border-primary-400 border-dotted border rounded-sm shadow-sm",
                "bg-primary-100 hover:bg-primary-200 focus:bg-primary-200",
                "outline-none focus:ring-1 ring-offset-1 ring-offset-primary-50 ring-primary-700/50",
                "active:scale-[.97] cursor-pointer",
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}

function ResetButton({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <Button onClick={() => setShapeParams(initalValueShapeParams())} {...rest}>Reset</Button>
    );
}

function SaveButton({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    const doSaveToVault = useSetAtom(vaultActions.doSaveShapeAtom);
    return (
        <Button onClick={doSaveToVault} title="Save to vault collection" {...rest}>Save</Button>
    );
}

function CodeButton({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <Button onClick={() => setShapeParams(initalValueShapeParams())} {...rest}><IconCode className="w-4 h-4" /></Button>
    );
}

export function BoxUtility() {
    return (
        <div className="pl-1 pr-2.5 py-2 flex items-center justify-between">
            <HintButton />

            <div className="flex items-center space-x-2">
                <ResetButton />
                <SaveButton />
                <CodeButton />
            </div>
        </div>
    );
}

//TODO: delete shape
//TODO: scroll to added shape
//TODO: save gadgets state
