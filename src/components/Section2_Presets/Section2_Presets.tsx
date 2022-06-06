import React from 'react';
import { useAtomValue } from 'jotai';
import { releaseNotesAtom, section1_OpenAtom } from '../../store/store';
import { UISection } from '../UI/UISection';

function ShapePresets() {
    const releaseNotes = useAtomValue(releaseNotesAtom);
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto bg-slate-100">
                Gallery
            </div>
        </div>
    );
}


export function Section2_Presets() {
    return (
        <UISection openAtom={section1_OpenAtom} title={"Presets"}>
            <ShapePresets />
        </UISection>
    );
}
