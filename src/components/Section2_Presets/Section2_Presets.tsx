import React, { Fragment } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { ReactSortable } from 'react-sortablejs';
import { IconCross } from '../UI/UIIcons';
import { classNames } from '@/utils/classnames';

function PresetView({ shapeParams, shape }: { shapeParams: NewShapeParams, shape: GeneratorResult; }) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <div className="relative group hover:scale-105 transition-all z-0 hover:z-10">
            <IconCross className={classNames(
                "absolute m-px w-4 h-4 right-1 top-1 p-0.5 hidden group-hover:block text-red-900 hover:bg-red-100 border-red-300/75 hover:border rounded",
                "",
            )} />

            <PreviewBox className="text-inherit group-hover:bg-primary-200 [&:.sortable-chosen]:bg-green-300" shapeParams={shapeParams} shape={shape} onClick={() => setShapeParams(shapeParams)} />
        </div>
    );
}

function ShapePresets() {
    const [shapes, setShapes] = useAtom(vaultSpapes.validAtom);
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <ReactSortable list={shapes} setList={setShapes} className="relative py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1" animation={200}>
                    {shapes.map(({ id, shapeParams, shape }) => (
                        <Fragment key={id}>
                            <PresetView shapeParams={shapeParams} shape={shape} />
                        </Fragment>
                    ))}
                </ReactSortable>
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
