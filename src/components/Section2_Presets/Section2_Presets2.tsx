import React, { Fragment, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { ReactSortable } from 'react-sortablejs';
import { IconCross } from '../UI/UIIcons';
import { classNames } from '@/utils/classnames';
import './Dragging.css';

function PresetView({ shapeParams, shape, showCross }: { shapeParams: NewShapeParams, shape: GeneratorResult; showCross: boolean; }) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    // const [showCross, setShowCross] = useState(true);
    // console.log('>>>>>> render PresetView <<<<<<<<<<', shapeParams.id, 'show cross', showCross);
    return (
        <div
            data-idx={shapeParams.id}
            className={classNames(
                "svg-view relative group peer hover:scale-105 transition-all z-0 hover:z-10 text-primary-900 bg-primary-50",
                "[&.sortable-chosen]:bg-green-200",
                //"[&.sortable-.chosen_svg-cross]:hidden",
                //"[&.sortable-chosen]:[--cust:1]",
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

//both sortable-ghost and sortable-chosen are add at the same time
//$('#root > div.min-h-full.overflow-hidden.bg-slate-50 > div > div.flex-1.overflow-y-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div:nth-child(1)')
//$('#root > div.min-h-full.overflow-hidden.bg-slate-50 > div > div.flex-1.overflow-y-auto > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div:nth-child(2)')
//
//$('.svg-view:nth-child(1)')?.dataset.idx
//$('.svg-view:nth-child(2)')?.dataset.idx
//
//[$('.svg-view:nth-child(1)')?.dataset.idx, $('.svg-view:nth-child(2)')?.dataset.idx]
//$('.svg-view:nth-child(1)')?.className

function ShapePresets() {
    const [shapes, setShapes] = useAtom(vaultSpapes.validAtom);
    const [showCross, setShowCross] = useState(true);
    console.log('-------RENDER-------');
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <ReactSortable
                    list={shapes}
                    setList={setShapes}
                    className="relative py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1"
                    animation={200}
                    onStart={(e) => {
                        console.log('onStart', e.oldIndex, { e });
                        //e.clone
                    }}
                    onClone={(e) => {
                        console.log('onClone1', e.item?.dataset.idx, { e }, { item: e.item, clone: e.clone });
                        // console.log('onClone2', e.item);
                        // console.log('onClone3', e.clone);
                    }}
                    // onMove={(e) => {
                    //     console.log('onMove', e);
                    // }}
                    onChange={(e) => {
                        console.log('onChange', e.oldIndex, e.newIndex, shapes[e.oldIndex ?? -1]?.id, shapes[e.newIndex ?? -1]?.id, { e }, { item: e.item, clone: e.clone });
                        // console.log('onChange2', e.item);
                        // console.log('onChange3', e.clone);
                    }}
                    // onSelect={(e) => {
                    //     console.log('onSelect', {e});
                    // }}
                    // onDeselect={(e) => {
                    //     console.log('onDeselect', {e});
                    // }}
                    onChoose={(e) => {
                        setShowCross(false);
                        console.log('onChoose1', { e }, { item: e.item, clone: e.clone });
                        // console.log('onChoose2', e.item);
                        // console.log('onChoose3', e.clone);

                        e.item?.classList.add('now-2');
                        //const cross = e.item?.querySelector('.svg-cross') as HTMLElement;
                        // console.log('onChoose', cross);
                        //console.log('onChoose', e.item?.dataset.idx);
                        //cross?.classList.add('child-2');
                        //cross && (cross.style.opacity = "0");
                        // cross && (cross.style.backgroundColor = "red");
                        //e.clone
                    }}
                    onUnchoose={(e) => {
                        setShowCross(true);

                        console.log('onUnchoose', e.item?.dataset.idx, { e }, { item: e.item, clone: e.clone });

                        var evt = new MouseEvent("mousemove", {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                            clientX: 20,
                            clientY: 100,
                        });
                        e.item.dispatchEvent(evt);


                        e.item?.classList.remove('now-2');
                        //const cross = e.item?.querySelector('.svg-cross') as HTMLElement;
                        // console.log('onChoose', cross);
                        //console.log('onUnchoose', e.item?.dataset.idx);
                        //cross?.classList.remove('child-2');
                        // cross && (cross.style.opacity = "1");
                        // cross && (cross.style.backgroundColor = "");

                        //console.log('onUnchoose', e);
                        //e.clone
                    }}
                >
                    {shapes.map(({ id, shapeParams, shape }) => (
                        <Fragment key={id}>
                            <PresetView shapeParams={shapeParams} shape={shape} showCross={showCross} />
                        </Fragment>
                    ))}
                </ReactSortable>
            </div>
        </div>
    );
}

export function Section2_Presets_Old() {
    return (
        <UISection openAtom={openSections.presetsAtom} title={"Presets"}>
            <ShapePresets />
        </UISection>
    );
}
