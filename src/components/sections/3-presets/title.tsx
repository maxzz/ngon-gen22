import { HTMLAttributes } from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { openSections, vaultActions, vaultSpapes } from "@/store";
import { classNames } from "@/utils/classnames";
import { IconTrash, IconImage, IconImages } from "@/components/UI/icons";

function SectionsButton({ className, children, onClick, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <button
            className={classNames(
                "text-primary-300 hover:text-primary-50 hover:bg-title6 hover:shadow-title7/50 outline-1 outline-primary-300/50 hover:outline rounded shadow",
                className
            )}
            onClick={(e) => { e.stopPropagation(); onClick && onClick(e); }} {...rest}
        >
            {children}
        </button>
    );
}

function SectionsButtons() {
    const open = useAtomValue(openSections.presetsAtom);
    const doRemoveAllFromVault = useSetAtom(vaultActions.doRemoveAllAtom);
    const doappendDefaultVaultPersets = useSetAtom(vaultActions.doAppendDefaultPersetsAtom);
    const doKeepUniqueOnlyPersets = useSetAtom(vaultActions.doKeepUniqueOnlyPersetsAtom);
    return (<>
        {open &&
            <div className="flex items-center space-x-1 mr-2">
                <SectionsButton className="p-1 w-6 h-6" onClick={() => doRemoveAllFromVault()} title="Remove all presets">
                    <IconTrash className="fill-current" />
                </SectionsButton>
                <SectionsButton className="p-1 w-6 h-6" onClick={() => doKeepUniqueOnlyPersets()} title="Remove duplicated presets">
                    <IconImage className="w-4 h-4 fill-transparent stroke-current stroke-[32]" />
                </SectionsButton>
                <SectionsButton className="p-1 w-6 h-6" onClick={() => doappendDefaultVaultPersets()} title="Append default presets">
                    <IconImages className="w-4 h-4 fill-transparent stroke-current stroke-[32]" />
                </SectionsButton>
            </div>
        }
    </>);
}

function PresetsCounter() {
    const [shapes] = useAtom(vaultSpapes.validAtom);
    return (
        <div className="pb-3 text-[0.65rem] opacity-75">
            {shapes.length}
        </div>
    );
}

export function Title() {
    return (
        <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center space-x-1">
                <div>
                    Presets
                </div>
                <PresetsCounter />
            </div>
            <SectionsButtons />
        </div>
    );
}
