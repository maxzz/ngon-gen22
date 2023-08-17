import { Section1_Editor } from './sections/1-editor';
import { Section2_Source } from './sections/2-source-code';
import { Section3_Presets } from './sections/3-presets';
import { Section4_Multiplication } from './sections/4-multiplication';

export function App2_Main() {
    return (
        <div className="flex-1 overflow-y-auto" style={{ overflow: 'overlay' }}>
            {/* <div className="m-auto w-4/5 flex flex-col space-y-4"> */}
            {/* <div className="m-auto max-w-[80vw] flex flex-col space-y-4"> */}
            {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4"> */}
            {/* <div className="m-auto max-w-[80%] flex flex-col space-y-4" style={{ overflow: 'hidden', scrollbarGutter: 'stable' }}> */}
            {/* <div className="ml-[calc(20vw/2)] mr-[calc(calc(20vw/2)-16px)] max-w-3xl flex flex-col space-y-4"> */}
            {/* <div className="ml-[calc(20vw/2)] mr-auto max-w-3xl flex flex-col space-y-4"> */}

            <div className="py-4 mx-auto max-w-[29rem] sm:max-w-[37rem] md:max-w-2xl lg:max-w-3xl flex flex-col space-y-4 transition-all">
                <Section1_Editor />
                <Section2_Source />
                <Section3_Presets />
                <Section4_Multiplication />
            </div>
        </div>
    );
}

//TODO: grid; with calc; vertical layout on small size
