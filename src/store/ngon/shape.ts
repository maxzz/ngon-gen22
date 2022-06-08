export type Point2D = {
    x: number;
    y: number;
};

// In editor formats

export type Scene = {
    w: number;          // Scene width
    h: number;          // Scene height
    ofsX: number;       // Center offset X (from top left corner)
    ofsY: number;       // Center offset Y (from top left corner)
    scale: number;      // Scene scale, zoom
};

export type ShapeNgon = {
    outerN: number;     // Number of outer points
    innerN: number;     // Number of inner points
    outer: Point2D;     // length outer vector
    inner: Point2D;     // length inner vector
    stroke: number;     // Stroke width
    scene: Scene;       // Scene params
    id?: string;        // Relatively unique shape ID or generated
    gen?: string;       // Generator name: 'ngon'
};

//////////////////

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
    id?: string;        // shape ID
    genId?: string;     // shape generator name aka 'ngon'
};

export type NewShapeParamsMetaItem = {
    label: string;
    min: number;
    max: number;
    step: number;
    digits?: number;    // if defined number will be rounded before apply
    hint?: string;
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

//////////////////
