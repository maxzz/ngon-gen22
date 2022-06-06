import React from 'react';
import useFloatInput from '@/hooks/useFloatInput';
import { classNames } from '@/utils/classnames';

export interface SliderProps {
    label: string;
    min: number;
    max: number;
    step?: number;
    value: number;
    labelWidth?: string;
    onChange: (value: number) => void;
}

export function NewSlider({ label, min, max, step = .01, labelWidth = '4.5rem', value, onChange }: SliderProps) {
    const [local, onSliderChange, onInputChange, onInputKey] = useFloatInput(value, { min, max, step }, onChange); // TODO: what to do with NaN?
    return (
        <div className="px-2 w-full h-5 flex-centered space-x-2 text-primary-900">

            <div className="flex-none" style={{ width: labelWidth }}>
                {label}
            </div>

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
                    "px-1 w-8 text-[.6rem] text-right bg-primary-100 rounded-sm",
                    "outline-none focus:ring-1 ring-offset-2 ring-offset-primary-500 ring-primary-900/50",
                )}
                value={local}
                onChange={onInputChange}
                onKeyDown={onInputKey}
            />
        </div>
    );
}

//TODO: local storage
//TODO: New slider should return fragment
