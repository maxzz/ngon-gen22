import React from 'react';
import { IconHIDLogo } from './UI/UIIcons';

export const textShadow = { textShadow: '1px 1px 2px #000' };
export const elevation4Shadow = { boxShadow: '0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%)' };

export function AppHeader() {
    return (<>
        <div className="px-6 py-5 flex items-center justify-between bg-[#003165] shadow-sm cursor-default"> {/* bg-[#003f82] */}
            <div className="flex items-center space-x-4">
                <div className="w-20 py-2 flex items-center justify-center bg-white rounded-md">
                    <IconHIDLogo className="px-2" stroke="#002f87" strokeWidth={0.2} fill="none" />
                </div>
                <div className="pb-1 text-3xl tracking-tighter font-light text-slate-100 uppercase whitespace-nowrap" style={textShadow}>
                    N-gon generator
                </div>
            </div>
        </div>
        <div className="h-1 bg-[#002f87]" style={elevation4Shadow}></div>
    </>);
}
