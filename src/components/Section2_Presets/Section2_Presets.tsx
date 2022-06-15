import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { openSections, vaultData, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { IO, StorageNgon } from '@/store/ngon/shape-io';
import { generate, GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { classNames } from '@/utils/classnames';
import { initalValueShapeParams } from '@/store/ngon/shape-defaults';

export function ShapeView({ shapeParams, shape, className, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg
            className={classNames("fill-transparent touch-none bg-primary-50 border-white border-4", className)}
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            preserveAspectRatio="none"
            {...rest}
        >
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
        </svg>
    );
}

function ShapePresets() {
    const shapes = useAtomValue(vaultData.shapesAtom);
    const shapeParamArray = shapes.map((shapeStr) => {
        const res = IO.shapeFromString(shapeStr);
        return res.error ? undefined : res;
    // }).filter(Boolean) as Omit<IO.ConvertResult, 'undefined'>[];
    // }).filter<IO.ConvertResult>(Boolean);
    // }).filter<Exclude<IO.ConvertResult, undefined>>(Boolean);
    // }).filter(Boolean) as Exclude<IO.ConvertResult, undefined>[];
    }).filter(Boolean) as Exclude<ReturnType<typeof IO.shapeFromString>, undefined>[];
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                Gallery
                <div className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1">
                    {shapeParamArray.map(({ shapeParams, shape }, idx) => (
                        <ShapeView shapeParams={shapeParams} shape={shape} key={idx} />
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
