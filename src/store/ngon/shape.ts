export type NewShapeParams = { // TODO: can it be more then one inner ?
    outerN: number;     // Number of outer points
    innerN: number;     // Number of inner points
    outerX: number;     // Outer lenght x aka scale
    outerY: number;     // Outer lenght y aka scale
    innerX: number;     // Inner lenght x aka scale
    innerY: number;     // Inner lenght y aka scale
    stroke: number;     // Stroke width

    w: number;          // Box width
    h: number;          // Box height
    ofsX: number;       // shape offset x
    ofsY: number;       // shape offset y // TODO: should it be cx, cy?
    scale: number;      // scene scale

    swap?: boolean;     // swap inner and outer; should be false; old implementations had this as true by mistake
    id: string;         // shape ID
    genId?: string;     // shape generator name aka 'ngon'
};
//TODO: add original Id and current Id to implement operation remove duplicates (by Id or by the same params ignoring Ids as comparing JSON wo/ Id) from Vault.

export type ShapeGadgets = {
    showAll: boolean;           // override current show values at once, i.e. open (interested) or closed (don't bother me)
    showInnerLines: boolean;    // show inner lines
    showOuterLines: boolean;    // show outer lines
    showInnerDots: boolean;     // show inner dots
    showOuterDots: boolean;     // show outer dots
}

// Editor slider control types

export type NewShapeParamsMetaItem = {
    label: string;
    min: number;
    max: number;
    step: number;
    digits?: number;    // if defined number will be rounded before apply
    hint?: string;
    linkKey?: string;   // key of field to link with
    link?: boolean;     // show link icon
};

export type NewShapeParamsMeta = {
    outerN: NewShapeParamsMetaItem;
    innerN: NewShapeParamsMetaItem;
    outerX: NewShapeParamsMetaItem;
    outerY: NewShapeParamsMetaItem;
    innerX: NewShapeParamsMetaItem;
    innerY: NewShapeParamsMetaItem;
    stroke: NewShapeParamsMetaItem;

    w: NewShapeParamsMetaItem;
    h: NewShapeParamsMetaItem;
    ofsX: NewShapeParamsMetaItem;
    ofsY: NewShapeParamsMetaItem;
    scale: NewShapeParamsMetaItem;
};

//TODO: shape: add scale around x,y? or it goes to multiplication?
//TODO: shape: add rotate around x,y? or it goes to multiplication?
