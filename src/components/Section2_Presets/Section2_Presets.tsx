import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { editorShapeAtom, editorShapeParamsAtom, openSections, releaseNotesAtom,  } from '../../store/store';
import { UISection } from '../UI/UISection';
import { classNames } from '@/utils/classnames';

export function ShapeView({ className, ...rest }: HTMLAttributes<SVGSVGElement>) {
    const shapeParams = useAtomValue(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);
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
    const releaseNotes = useAtomValue(releaseNotesAtom);
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                Gallery
                <div className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1">
                    <ShapeView />
                    <ShapeView />
                    <ShapeView />
                    <ShapeView />
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
