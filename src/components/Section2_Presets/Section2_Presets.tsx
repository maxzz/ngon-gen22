import React, { Fragment, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { IconCross } from '../UI/UIIcons';
import { classNames } from '@/utils/classnames';
import SortableList, { SortableItem } from 'react-easy-sort';
import { move } from '@/utils/move';
import './Dragging.css';

function PresetView({ shapeParams, shape, showCross }: { shapeParams: NewShapeParams, shape: GeneratorResult; showCross: boolean; }) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    // const [showCross, setShowCross] = useState(true);
    // console.log('>>>>>> render PresetView <<<<<<<<<<', shapeParams.id, 'show cross', showCross);
    return (
        <div
            data-idx={shapeParams.id}
            className={classNames("",
                "svg-view relative group peer hover:scale-105 transition-all z-0 hover:z-10",
                // "svg-view relative group peer hover:scale-105 transition-all z-0 hover:z-10 text-primary-900 bg-primary-50",
                // "[&.dragged]:bg-green-200",
                //"[&.sortable-.chosen_svg-cross]:hidden",
                //"[&.sortable-chosen]:[--cust:1]",
                //"pointer-events-none select-none",
            )}
        // onMouseDown={(e) => setShowCross(false)}
        // onMouseUp={(e) => setShowCross(true)}
        // onMouseMove={(e) => console.log('e', {e})}
        >
            <div className="">
                {showCross && <IconCross
                    className={classNames(
                        "svg-cross absolute m-px w-4 h-4 right-1 top-1 p-0.5",
                        "hidden group-hover:block",
                        "text-red-900 hover:bg-red-100 border-red-300/75 hover:border rounded",
                        // "text-red-900 hover:bg-red-100 border-red-300/75 hover:border rounded opacity-0",
                        //"hidden group-hover:block text-red-900 hover:bg-red-100 border-red-300/75 hover:border rounded",
                        //"hidden group-focusfocus-within:block text-red-900 hover:bg-red-100 border-red-300/75 hover:border rounded",
                        // "peer-focus-within:text-blue-500",
                        // "[&peer-focus-within]:text-blue-500",
                        //"[&peer-focus-within]:text-blue-500",
                        //`opacity-[var(--child-visibily,0)]`,
                        //`opacity-[var(--cust)]`,
                    )}
                />}
                <PreviewBox
                    className={classNames(
                        "text-inherit border-white border-4 cursor-pointer",
                    )}
                    shapeParams={shapeParams}
                    shape={shape}
                    onClick={() => setShapeParams(shapeParams)}
                />
                {/* group-hover:bg-primary-200 [&:.sortable-chosen]:bg-green-300*/}
                {/* [&:group.sortable-chosen]:bg-green-300 */}
                {/* [&.sortable-chosen]: */}

            </div>
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
                    className="relative py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1"
                >
                    {shapes.map(({ id, shapeParams, shape }) => (
                        <SortableItem key={id}>
                            {/* <Fragment key={id}> */}
                            <div className="">
                                <PresetView shapeParams={shapeParams} shape={shape} showCross={true} />
                            </div>
                            {/* </Fragment> */}
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
