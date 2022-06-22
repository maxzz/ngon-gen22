import React from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { doRemoveFromVaultAtom, editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { IconCross } from '../UI/UIIcons';
import { classNames } from '@/utils/classnames';
import SortableList, { SortableItem } from 'react-easy-sort';
import { move } from '@/utils/move';
import './Dragging.css';

function PresetView({ shapeParams, shape, storeIdx }: { shapeParams: NewShapeParams, shape: GeneratorResult; storeIdx: number; }) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    const doRemoveFromVault = useSetAtom(doRemoveFromVaultAtom);
    return (
        <div className="relative group">
            <IconCross
                className={classNames(
                    "svg-cross absolute m-px w-4 h-4 right-1 top-1 p-0.5",
                    "hidden group-hover:block",
                    "text-primary-900 hover:text-red-500 hover:bg-red-100 border-red-300/75 hover:border rounded transition-all",
                )}
                onClick={() => doRemoveFromVault(storeIdx)}
            />
            <PreviewBox
                className="text-inherit border-white border-4 cursor-pointer"
                shapeParams={shapeParams}
                shape={shape}
                onClick={() => setShapeParams(shapeParams)}
            />
        </div>
    );
}

function ShapePresets() {
    const [shapes, setShapes] = useAtom(vaultSpapes.validAtom);
    const onSortEnd = (oldIndex: number, newIndex: number) => setShapes((array) => move(array, oldIndex, newIndex));
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <SortableList
                    onSortEnd={onSortEnd}
                    draggedItemClassName="dragged"
                    className="relative py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1 text-primary-900 bg-primary-50"
                >
                    {shapes.map(({ id, shapeParams, shape }, idx) => (
                        <SortableItem key={id}>
                            <div>
                                <PresetView shapeParams={shapeParams} shape={shape} storeIdx={idx} />
                            </div>
                        </SortableItem>
                    ))}
                </SortableList>
            </div>
        </div>
    );
}

export function Section2_Presets() {
    return (
        <UISection openAtom={openSections.presetsAtom} title={"Presets"}>
            <ShapePresets />
        </UISection>
    );
}
