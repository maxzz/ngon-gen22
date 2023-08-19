import React, { forwardRef, HTMLAttributes } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultActions, vaultSpapes, } from '@/store';
import { NewShapeParams } from '@/store/ngon/types-shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../../UI/Section/UISection';
import { PreviewBox } from './PreviewBox';
import { IconCross, IconImage, IconImages, IconTrash } from '../../UI/icons';
import { classNames } from '@/utils/classnames';
import SortableList, { SortableItem } from 'react-easy-sort';
import { move } from '@/utils/move';
import './Dragging.css';
//import { a, useSpring } from '@react-spring/web';

const PresetView = forwardRef<HTMLDivElement, { shapeParams: NewShapeParams, shape: GeneratorResult; storeIdx: number; }>(
    ({ shapeParams, shape, storeIdx }, ref) => {
        const setShapeParams = useSetAtom(editorShapeParamsAtom);
        const doRemoveFromVault = useSetAtom(vaultActions.doRemoveShapeAtom);
        // const [styles, api] = useSpring(() => ({ scale: 1, onRest: () => doRemoveFromVault(storeIdx) }));
        return (
            <div ref={ref} className="relative group">

                <IconCross
                    className={classNames(
                        "svg-cross absolute m-px w-4 h-4 right-1 top-1 p-0.5",
                        "hidden group-hover:block",
                        "text-primary-400 hover:text-red-500 hover:bg-red-100 border-red-300/75 hover:border rounded shadow transition-all",
                    )}
                    onClick={() => doRemoveFromVault(storeIdx)}
                // onClick={() => api.start({ scale: 0 })}
                />

                {/* <a.div style={styles}> */}
                <PreviewBox
                    className="text-inherit border-white border-4 cursor-pointer"
                    shapeParams={shapeParams}
                    shape={shape}
                    onClick={() => setShapeParams(shapeParams)}
                />
                {/* </a.div> */}
            </div>
        );
    }
);

function ShapePresets() {
    const [shapes, setShapes] = useAtom(vaultSpapes.validAtom);
    const onSortEnd = (oldIndex: number, newIndex: number) => setShapes((array) => move(array, oldIndex, newIndex));
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <SortableList
                    onSortEnd={onSortEnd}
                    draggedItemClassName="preset-dragged"
                    className="relative py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1 text-primary-900 bg-primary-50"
                >
                    {shapes.map(({ id, shapeParams, shape }, idx) => (
                        <SortableItem key={id}>
                            <PresetView shapeParams={shapeParams} shape={shape} storeIdx={idx} />
                        </SortableItem>
                    ))}
                </SortableList>
            </div>
        </div>
    );
}

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

export function Section3_Presets() {
    return (
        // <UISection openAtom={openSections.presetsAtom} title={"Presets"}>
        <UISection
            className="py-0"
            openAtom={openSections.presetsAtom}
            title={
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <div className="">Presets</div>
                        <PresetsCounter />
                    </div>
                    <SectionsButtons />
                </div>
            }
        >
            <ShapePresets />
        </UISection>
    );
}

//TODO: combine the image icon with the trash can icon.
//TODO: add confirmation for add remove operations
//TODO: move keep shape to canvas
//TODO: add index numbers to each preview
//TODO: ctrl+click on save button should console all shapes w/ indices for default
//TODO: scroll presets view box to the new added shape
