import React, { HTMLAttributes, useCallback, useMemo, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { ReactSortable } from 'react-sortablejs';
import { uuid } from '@/utils/uuid';
import { IO } from '@/store/ngon/shape-io';

function PresetView({ shapeParams, shape, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <PreviewBox shapeParams={shapeParams} shape={shape} {...rest} />
        // <PreviewBox shapeParams={shapeParams} shape={shape} onClick={() => setShapeParams(shapeParams)} {...rest} />
    );
}

type GridItem = {
    id: string;
    data: IO.ConvertResult;
};

function ShapePresets() {
    const [shapes, setShapes] = useAtom(vaultSpapes.validAtom);
    const shapesIds = useMemo(() => {
        const sh = shapes.map((item) => ({ id: item.shapeParams.id!, data: item }));
        console.log('sh', sh);

        return sh;
    }, [shapes]);
    const setShapesIds = useCallback(
        (list: GridItem[]) => {
            console.log('list', list);
            const newShapes = list.map((item) => {
                return item.data;
            });
            //console.log('newShapes', newShapes);
    
            setShapes(newShapes);
        },
        [],
    );;
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <ReactSortable list={shapesIds} setList={setShapesIds} className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1" animation={150}>
                    {shapesIds.map(({ id, data: { shapeParams, shape } }, idx) => (
                        <div className=""  key={id}>
                            <PresetView shapeParams={shapeParams} shape={shape} key={id} />
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

function ShapePresets_Org() {
    const shapes = useAtomValue(vaultSpapes.validAtom);
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <div className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1">
                    {shapes.map(({ shapeParams, shape }, idx) => (
                        <PresetView shapeParams={shapeParams} shape={shape} key={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}

