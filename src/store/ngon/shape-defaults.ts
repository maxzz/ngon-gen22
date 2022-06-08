import { NewShapeParams, NewShapeParamsMeta } from "./shape";
import { uuid } from "@/utils/uuid";

export const enum CONST {      // ts defines type by last enum
    defStroke = 0.07,
    sceneSize = 24,     // should not be float
    sceneSizeMax = 256, // should not be float
}

export enum CONST_NAMES {
    NAME_NGON = 'ngon',
}

export const defNewShapeParams: NewShapeParams = {
    outerN: 5,
    innerN: 2,
    outerX: 0.3,
    outerY: 6.5,
    innerX: 5.5,
    innerY: 0,
    stroke: CONST.defStroke,

    w: CONST.sceneSize,
    h: CONST.sceneSize,
    ofsX: CONST.sceneSize / 2,
    ofsY: CONST.sceneSize / 2,
    scale: 1,
};

export function initalValueShapeParams(/*stored?: string*/): NewShapeParams {
    return {
        ...defNewShapeParams,
        id: uuid(),
    };
}

export const initialValueNewShapeParamsMeta: NewShapeParamsMeta = {
    outerN: { label: 'outer points', min: 1, max: 100, step: 1, digits: 0, },
    innerN: { label: 'inner lines', min: 1, max: 100, step: 1, digits: 0, hint: 'divide a line between two outer points into n lines' },
    outerX: { label: 'outer X', min: -100, max: 100, step: 0.01 },
    outerY: { label: 'outer Y', min: -100, max: 100, step: 0.01 },
    innerX: { label: 'inner X', min: -100, max: 100, step: 0.01 },
    innerY: { label: 'inner Y', min: -100, max: 100, step: 0.01 },
    stroke: { label: 'stroke', min: 0.01, max: 2, step: 0.01 },

    w: { label: 'width', min: 4, max: CONST.sceneSizeMax, step: 1, digits: 0, },
    h: { label: 'height', min: 4, max: CONST.sceneSizeMax, step: 1, digits: 0, },
    ofsX: { label: 'center X', min: -CONST.sceneSizeMax / 2, max: CONST.sceneSizeMax / 2, step: .1 },
    ofsY: { label: 'center Y', min: -CONST.sceneSizeMax / 2, max: CONST.sceneSizeMax / 2, step: .1 },
    scale: { label: 'scale', min: 0.01, max: 3, step: 0.01 },
};

//TODO: digits 2
//TODO: pairs lock
