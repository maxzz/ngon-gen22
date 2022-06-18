import React, { HTMLAttributes } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { classNames } from '@/utils/classnames';

function PresetView({ shapeParams, shape, className, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg
            className={classNames("fill-transparent touch-none text-primary-900 bg-primary-50 border-white border-4 cursor-pointer", className)}
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            {...rest}
        >
            <path className="stroke-current" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
        </svg>
    );
}

function PresetViewWithAction({ shapeParams, shape, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <PresetView shapeParams={shapeParams} shape={shape} onClick={() => setShapeParams(shapeParams)} {...rest} />
    );
}

function ShapePresets() {
    const shapes = useAtomValue(vaultSpapes.validAtom);
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <div className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1">
                    {shapes.map(({ shapeParams, shape }, idx) => (
                        <PresetViewWithAction shapeParams={shapeParams} shape={shape} key={idx} />
                    ))}
                </div>
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
