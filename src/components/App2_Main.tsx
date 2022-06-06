import React from 'react';
import { App1_Header } from './App1_Header';
import { App3_Footer } from './App3_Footer';
import { UISection } from './UI/UISection';
import { Section0_Preview } from './sections/Section0_Preview';
import { Section1_Presets } from './sections/Section1_Presets';
import { section1_OpenAtom } from '@/store/store';

export function App2_Main() {
    return (
        <div className="h-screen flex flex-col">
            <App1_Header />

            <div className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }}>
                {/* <div className="m-auto w-4/5 flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80vw] flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4"> */}
                {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4" style={{ overflow: 'hidden', scrollbarGutter: 'stable' }}> */}
                {/* <div className="ml-[calc(20vw/2)] mr-[calc(calc(20vw/2)-16px)] max-w-3xl flex flex-col space-y-4"> */}
                {/* <div className="ml-[calc(20vw/2)] mr-auto max-w-3xl flex flex-col space-y-4"> */}

                <div className="py-4 mx-auto max-w-[29rem] sm:max-w-[37rem] md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4 transition-all">
                    {/* <div className="py-4 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl flex flex-col space-y-4 transition-all"> */}
                    <Section0_Preview />
                    <Section1_Presets />
                </div>
            </div>

            <App3_Footer />
        </div>
    );
}

//TODO: grid; with calc; vertical layout on small size
