import React from 'react';
import { useAtomValue } from 'jotai';
import { openSections, releaseNotesAtom, } from '../../store/store';
import { UISection } from '../UI/UISection';

function Multiplication() {
    const releaseNotes = useAtomValue(releaseNotesAtom);
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto bg-slate-100">
                Multiplication
            </div>
        </div>
    );
}

export function Section3_Multiplication() {
    return (
        <UISection openAtom={openSections.variantsAtom} title={"Multiplication"}>
            <Multiplication />
        </UISection>
    );
}
