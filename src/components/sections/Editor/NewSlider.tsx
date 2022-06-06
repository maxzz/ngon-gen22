import React from 'react';
import useFloatInput from '@/hooks/useFloatInput';
import '../../UI/Sliders.scss';
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
        <div className="px-2 w-full h-5 text-xs flex-centered space-x-2 text-purple-900">
            <div className="flex-none" style={{ width: labelWidth }}>{label}</div>
            <input
                // className="ui-slider [::-webkit-slider-thumb:bg-red-700]"
                // className="ui-slider hover:webkit-slider-thumb:bg-green-400 hover:text-orange-400"
                // className="ui-slider wthumb:bg-green-400 hover:wthumb:opacity-20 hover:text-orange-400"
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
                min={min} max={max} step={step}
                value={value}
                tabIndex={-1}
                onChange={onSliderChange}
            />
            <input className="w-8 bg-purple-100 text-[.6rem]"
                value={local}
                onChange={onInputChange}
                onKeyDown={onInputKey}
            />
        </div>
    );
}

/*
    &::-moz-range-thumb {
        width: $range-handle-size;
        height: $range-handle-size;
            border: 0;
        border-radius: $range-handle-radius;
        background: $range-handle-color;
        cursor: pointer;

            transition: background 0.15s ease-in-out;
        border: 1px solid $range-track-color;
        border-bottom: 1px solid $range-track-border-color;
        border-right: 1px solid $range-track-border-color;

        &:hover {
            background: $range-handle-color-hover;
            border: 1px solid white;
        }
    }

*/

/*
input[type="range"].ui-slider {
    $range-handle-color: #ffffff !default;
    $range-handle-color-hover: #907aff54 !default;
    $range-handle-size: 12px !default; // def 16px
    $range-handle-radius: 25%; // def 50%

    $range-track-color: #6c48f04d !default;
    $range-track-height: 1px !default; // def 2px
    $range-track-border-color: rgba(108, 72, 240, 0.5) !default;

    -webkit-appearance: none;
    width: 100%; //$range-label-width: 60px !default; width: calc(100% - (#{$range-label-width + 10px}));
    height: $range-track-height;
    border-radius: 5px;
    background: $range-track-color;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    // Range Handle
    &::-webkit-slider-thumb {
        -webkit-appearance: none;

        width: $range-handle-size;
        height: $range-handle-size;
        border-radius: $range-handle-radius;
        background: $range-handle-color;
        cursor: pointer;

            transition: all 0.15s ease-in-out;
        border: 1px solid $range-track-color;
        border-bottom: 1px solid $range-track-border-color;
        border-right: 1px solid $range-track-border-color;

        &:hover {
            background: $range-handle-color-hover;
            transform: scale(1.2);
            border: 1px solid white;
        }
    }
}
*/