import React from 'react';
import { useAtomValue } from 'jotai';
import { openSections, } from '../../../store';
import { UISection } from '../../UI/section/UISection';

function Multiplication() {
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto bg-slate-100">
                Multiplication
            </div>
        </div>
    );
}

export function Section4_Multiplication() {
    return (
        <UISection openAtom={openSections.variantsAtom} title={"Multiplication"}>
            <Multiplication />
        </UISection>
    );
}
