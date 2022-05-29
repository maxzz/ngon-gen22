import React from 'react';
import { useAtomValue } from 'jotai';
import { releaseNotesAtom, section1_OpenAtom } from '../../store/store';
import { Section } from './Section';

function Section1_Multiplication() {
    const releaseNotes = useAtomValue(releaseNotesAtom);
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto bg-slate-100">
                Multiplication
            </div>
        </div>
    );
}

function Section1_ShapePresets() {
    const releaseNotes = useAtomValue(releaseNotesAtom);
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto bg-slate-100">
                Gallery
            </div>
        </div>
    );
}


export function Section1_Presets() {
    return (
        <>
            <Section openAtom={section1_OpenAtom} title={"Presets"}>
                <Section1_ShapePresets />
            </Section>

            <Section openAtom={section1_OpenAtom} title={"Multiplication"}>
                <Section1_Multiplication />
            </Section>
        </>
    );
}
