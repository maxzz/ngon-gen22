import React from 'react';
import useFloatInput from '@/hooks/useFloatInput';
import { classNames } from '@/utils/classnames';

export interface SliderProps {
    label: string;
    title?: string;
    min: number;
    max: number;
    step?: number;
    value: number;
    labelWidth?: string; // TODO: it can be '30%' as default
    onChange: (value: number) => void;
}

export function NewSlider({ label, title, min, max, step = .01, labelWidth = '4.5rem', value, onChange }: SliderProps) {
    const [local, onSliderChange, onInputChange, onInputKey] = useFloatInput(value, { min, max, step }, onChange); // TODO: what to do with NaN?
    return (
        <label className="px-2 w-full h-5 flex-centered space-x-2 text-primary-900" title={title}> {/* relative */}

            <div className="flex-none select-none cursor-pointer" style={{ width: labelWidth }}
                onClick={(e) => {
                    e.ctrlKey && onChange(Math.round(value));
                    console.log('clicl', e);
                    
                }}
                title="Ctrl+click to round value"
            >
                {label}
            </div>
            {/* TODO: Do this and tooltip if number has digits */}

            {/* <div className="absolute -right-0.5 bottom-0 w-2 h-1/2 border-primary-400 border rounded-sm"></div> */}

            <input
                className={classNames(
                    "w-full h-px bg-primary-700/40 cursor-pointer appearance-none outline-none",

                    "thumb-w:appearance-none thumb-w:w-4 thumb-w:h-4 thumb-w:rounded thumb-w:bg-primary-50",
                    "thumb-w:border thumb-w:border-solid thumb-w:border-primary-200 thumb-w:border-r-primary-400 thumb-w:border-b-primary-400",
                    "hover:thumb-w:bg-white/40 hover:thumb-w:border-white hover:thumb-w:scale-125 hover:thumb-w:transition-all",

                    "thumb-m:appearance-none thumb-m:w-4 thumb-m:h-4 thumb-m:rounded thumb-m:bg-primary-50",
                    "thumb-m:border thumb-m:border-solid thumb-m:border-primary-200 thumb-m:border-r-primary-400 thumb-m:border-b-primary-400",
                    "hover:thumb-m:bg-white/40 hover:thumb-m:border-white hover:thumb-m:scale-125 hover:thumb-m:transition-all",
                )}
                type="range"
                tabIndex={-1}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onSliderChange}
            />

            <input
                className={classNames(
                    "px-1 w-8 text-[.6rem] text-right bg-primary-200 focus:bg-primary-50 rounded-sm",
                    "outline-none focus:ring-1 ring-offset-2 ring-offset-primary-50 ring-primary-700/50",
                )}
                value={local}
                onChange={onInputChange}
                onKeyDown={onInputKey}
            />
        </label>
    );
}

//TODO: local storage
//TODO: New slider should return fragment
//TODO: lock values
