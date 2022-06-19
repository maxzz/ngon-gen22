import React, { HTMLAttributes } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { ReactSortable } from 'react-sortablejs';

function PresetView({ shapeParams, shape, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <PreviewBox shapeParams={shapeParams} shape={shape} onClick={() => setShapeParams(shapeParams)} {...rest} />
    );
}

function ShapePresets() {
    const [shapes, setShapes] = useAtom(vaultSpapes.validAtom);
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <ReactSortable list={shapes} setList={setShapes} className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1" animation={150}>
                    {shapes.map(({ id, shapeParams, shape }) => (
                        <div key={id}>
                            <PresetView shapeParams={shapeParams} shape={shape} />
                        </div>
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
