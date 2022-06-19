import { HTMLAttributes } from "react";
import { useSetAtom } from "jotai";
import { initalValueShapeParams } from "@/store/ngon/shape-defaults";
import { doSaveToVaultAtom, editorShapeParamsAtom } from "@/store/store";
import { classNames } from "@/utils/classnames";
import { IconCode } from "@/components/UI/UIIcons";

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

function SaveButton({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    const doSaveToVault = useSetAtom(doSaveToVaultAtom);
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
            title="Save to vault collection"
            value="Save" {...rest}
            onClick={doSaveToVault}
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

export function BoxUtility() {
    return (
        <div className="pl-1 pr-3 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <HintButton />
                <ResetButton />
                <SaveButton />
                <IconCode className="w-4 h-4" />
            </div>
            <div className=""></div> {/* Right side controls go here */}
        </div>
    );
}

//TODO: delete shape
//TODO: scroll to added shape
//TODO: save gadgets state
