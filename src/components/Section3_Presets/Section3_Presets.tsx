import React, { forwardRef, HTMLAttributes } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { doRemoveFromVaultAtom, editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { IconCross, IconImages, IconTrash } from '../UI/UIIcons';
import { classNames } from '@/utils/classnames';
import SortableList, { SortableItem } from 'react-easy-sort';
import { move } from '@/utils/move';
import './Dragging.css';
//import { a, useSpring } from '@react-spring/web';

const PresetView = forwardRef<HTMLDivElement, { shapeParams: NewShapeParams, shape: GeneratorResult; storeIdx: number; }>(
    ({ shapeParams, shape, storeIdx }, ref) => {
        const setShapeParams = useSetAtom(editorShapeParamsAtom);
        const doRemoveFromVault = useSetAtom(doRemoveFromVaultAtom);
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

function SectionsButton({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <button className={classNames("hover:bg-title6 hover:shadow-title7 outline-1 outline-primary-300 hover:outline rounded shadow", className)} {...rest}>
            {children}
        </button>
    );
}


function SectionsButtons() {
    const open = useAtomValue(openSections.presetsAtom);
    return (<>
        {open &&
            <div className="flex items-center space-x-1 mr-2">
                <SectionsButton className="p-1 w-6 h-6">
                    <IconTrash className="fill-current" title="remove all presets" />
                </SectionsButton>
                <SectionsButton className="p-1 w-6 h-6">
                    <IconImages className="w-4 h-4 fill-transparent stroke-current stroke-[32]" title="load default presets" />
                </SectionsButton>
            </div>
        }
    </>);
}

export function Section3_Presets() {
    return (
        // <UISection openAtom={openSections.presetsAtom} title={"Presets"}>
        <UISection
            className="py-0"
            openAtom={openSections.presetsAtom}
            title={
                <div className="flex-1 flex items-center justify-between">
                    <div className="py-2">Presets</div>
                    <SectionsButtons />
                </div>
            }
        >
            <ShapePresets />
        </UISection>
    );
}
