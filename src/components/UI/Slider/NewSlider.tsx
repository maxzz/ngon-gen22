import React from 'react';
import { useFloatInput } from '@/hooks/useFloatInput';
import { classNames } from '@/utils/classnames';

export interface SliderProps {
    label: string;
    title?: string;
    min: number;
    max: number;
    step?: number;
    value: number;
    labelWidth?: string; // TODO: it can be '30%' as default
    linkWithNext?: boolean;
    onChange: (value: number) => void;
}

export function NewSlider({ label, title, min, max, step = .01, labelWidth = '4.5rem', linkWithNext, value, onChange }: SliderProps) {
    const [local, onSliderChange, onInputChange, onInputKey] = useFloatInput(value, { min, max, step }, onChange); // TODO: what to do with NaN?
    return (
        <label className="px-2 w-full h-5 flex-center-all space-x-2 text-primary-900" title={title}> {/* relative */}

            <div className="relative flex-none select-none cursor-pointer" style={{ width: labelWidth }}
                onClick={(e) => e.ctrlKey && onChange(Math.round(value))}
                title="Ctrl+click to round value"
            >
                {label}
                {/* <IconLinked className="absolute right-0 w-3 h-3 fill-transparent stroke-primary-400" /> */}
            </div>

            {/* <div className="absolute -right-0.5 bottom-0 w-2 h-1/2 border-primary-400 border rounded-sm"></div> */}

            <input
                className={classNames(
                    "w-full h-px bg-primary-700/40 cursor-pointer appearance-none outline-none",

                    "thumb-w:appearance-none thumb-w:w-4 thumb-w:h-4 thumb-w:rounded thumb-w:bg-primary-200/90",
                    "thumb-w:border thumb-w:border-solid thumb-w:border-primary-200 thumb-w:border-r-primary-400 thumb-w:border-b-primary-400",
                    "hover:thumb-w:bg-primary-300/70 hover:thumb-w:border-primary-400/70 hover:thumb-w:scale-125 hover:thumb-w:transition-all",

                    "thumb-m:appearance-none thumb-m:w-4 thumb-m:h-4 thumb-m:rounded thumb-m:bg-primary-200/90",
                    "thumb-m:border thumb-m:border-solid thumb-m:border-primary-200 thumb-m:border-r-primary-400 thumb-m:border-b-primary-400",
                    "hover:thumb-m:bg-primary-300/70 hover:thumb-m:border-primary-400/70 hover:thumb-m:scale-125 hover:thumb-m:transition-all",
                )}
                type="range"
                tabIndex={-1}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onSliderChange}
            />

            <div className="relative flex">
                <input
                    className={classNames(
                        "px-px w-8 text-[.6rem] text-right bg-inherit focus:bg-white rounded-sm",
                        "outline-none focus:ring-1 ring-offset-2 ring-offset-primary-50 ring-primary-700/50",
                    )}
                    value={local}
                    onChange={onInputChange}
                    onKeyDown={onInputKey}
                />

                {/* {linkWithNext && <IconLinked className="absolute -right-4 top-full w-7 h-7 z-10 fill-transparent stroke-primary-400 bg-orange-300" />} */}
            </div>
        </label>
    );
}

//TODO: local storage - done
//TODO: New slider should return fragment - no need
//TODO: lock values in pairs
//TODO: Do this and tooltip if number has digits
