//import { ref, computed } from '@vue/composition-api';
//import { StorageNgon, ShapeNgon, ShapeNgonFromSaved, ShapeNgonToSaved, uniqueId } from './shape-types';
//import { defaultShapes } from './default-shapes';
/*
export function previewShapes(sp: ShapeNgon) {
    let previews = ref<ShapeNgon[]>([]);

    let initSeed = Date.now();
    defaultShapes.forEach((_: string) => {
        try {
            let newShape = ShapeNgonFromSaved(JSON.parse(_) as SavedNgon, initSeed++);
            previews.value.push(newShape);
        } catch (error) {
            console.log(`Bad shape: "${_}"`);
        }
    });

    function shapeAddToPreview() {
        let newShape = JSON.parse(JSON.stringify(sp));
        newShape.id = uniqueId();
        previews.value.push(newShape);
    }

    function shapeFromPreview(shape: ShapeNgon) {
        let upd = JSON.parse(JSON.stringify(shape)) as ShapeNgon;
        
        for (let [key, val] of Object.entries(upd)) {
            (sp as any)[key] = val; // add reactive keys separately
        }
    }

    function shapeRemove(shape: ShapeNgon) {
        previews.value = previews.value.filter((_) => _ !== shape);
    }

    let _DebugExport = computed(() => {
        function printShapes() {
            let shapeStrs = previews.value.map((_, index) => {
                let shape = ShapeNgonToSaved(_);
                return `/*${index < 9 ? '0': ''}${index+1}* / '${JSON.stringify(shape)}'`;
            });
            let s = `[\n  ${shapeStrs.join(',\n  ')},\n]\n`;
            console.log(s);
        }
        printShapes();

        let newShape = ShapeNgonToSaved(sp);
        let oldId = newShape.id;
        newShape.id = uniqueId();
        let s = `/*${previews.value.length}* /'${JSON.stringify(newShape)}', //prev "id": ${oldId}`;
        console.log(s);
        return s;
    });

    return {
        previews,
        shapeAddToPreview,
        shapeFromPreview,
        shapeRemove,
        _DebugExport,
    };
} //previewShapes()
*/
export function generatedSvg(path: string, w: number, h: number, stroke: number) {
    let style = `<style> path { stroke-width: ${stroke}; fill: none; stroke: red; } </style>`;
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">\n    <path d="${path}"/>\n    ${style}\n</svg>`;
}
