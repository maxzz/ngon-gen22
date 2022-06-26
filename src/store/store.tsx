import { Atom, atom, Getter, Setter } from 'jotai';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { initalValueShapeParams } from './ngon/shape-defaults';
import { NewShapeParams, ShapeGadgets } from './ngon/shape';
import { defaultShapes } from './ngon/shapes-vault-data';
import { generate } from './ngon/generator';
import { IO, } from './ngon/shape-io';
import { toastError } from '@/components/UI/UiToaster';
import { uuid } from '@/utils/uuid';

//#region LocalStorage

namespace Storage {
    const KEY = 'react-svg-shapes22-01';

    type Store = {
        open: StorageOpenSections;
        shapeParams: NewShapeParams;
        viewboxOptions: StorageViewboxOptions;
        vaultData: StorageVaultData;
    };

    export let initialData: Store = {
        open: {
            source: false,
            presets: false,
            variants: false,
        },
        shapeParams: initalValueShapeParams(),
        viewboxOptions: {
            showBox: false,
            showUtils: false,

            showAll: false,
            showInnerLines: true,
            showOuterLines: true,
            showInnerDots: true,
            showOuterDots: true,
        },
        vaultData: {
            shapes: [],
        }
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = { ...initialData, ...obj };
            } catch (error) {
            }
        }

        initialData.vaultData.shapes = initialData.vaultData?.shapes?.length ? initialData.vaultData.shapes : defaultShapes;
    }
    load();

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: Store = {
            open: {
                source: get(openSections.sourceAtom),
                presets: get(openSections.presetsAtom),
                variants: get(openSections.variantsAtom),
            },
            shapeParams: get(editorShapeParamsAtom),
            viewboxOptions: {
                showBox: get(viewboxOptionAtoms.showBoxAtom),
                showUtils: get(viewboxOptionAtoms.showUtilsAtom),

                showAll: get(viewboxOptionAtoms.showAllAtom),
                showInnerLines: get(viewboxOptionAtoms.showInnerLinesAtom),
                showOuterLines: get(viewboxOptionAtoms.showOuterLinesAtom),
                showInnerDots: get(viewboxOptionAtoms.showInnerDotsAtom),
                showOuterDots: get(viewboxOptionAtoms.showOuterDotsAtom),
            },
            vaultData: {
                shapes: get(_shapesAtom),
            },
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => Storage.saveDebounced(get);
}

//#endregion LocalStorage

//#region UI sections state

type StorageOpenSections = {
    source: boolean;    // generated source code
    presets: boolean;   // shape collection previews
    variants: boolean;  // multiplication
};

export const openSections: Atomize<StorageOpenSections> = {
    sourceAtom: atomWithCallback<boolean>(Storage.initialData.open.source, Storage.save),
    presetsAtom: atomWithCallback<boolean>(Storage.initialData.open.presets, Storage.save),
    variantsAtom: atomWithCallback<boolean>(Storage.initialData.open.variants, Storage.save),
};

//#endregion UI sections state

//#region Editor controls

type StorageViewboxOptions = {
    showBox: boolean;           // show box controls
    showUtils: boolean;         // show utility controls
} & ShapeGadgets;

export const viewboxOptionAtoms: Atomize<StorageViewboxOptions> = {
    showBoxAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showBox, Storage.save),
    showUtilsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showUtils, Storage.save),

    showAllAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showAll, Storage.save),
    showInnerLinesAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showInnerLines, Storage.save),
    showOuterLinesAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showOuterLines, Storage.save),
    showInnerDotsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showInnerDots, Storage.save),
    showOuterDotsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showOuterDots, Storage.save),
};

// Editor shape

export const editorShapeParamsAtom = atomWithCallback(Storage.initialData.shapeParams, Storage.save);

export const editorShapeAtom = atom(
    (get) => {
        const params = get(editorShapeParamsAtom);
        const shape = generate(params);
        return shape;
    }
);

//#endregion Editor controls

//#region Vault loader

type StorageVaultData = {
    shapes: string[];
};

const _shapesAtom = atom<string[]>(Storage.initialData.vaultData.shapes); // keep it as atom to reduce valid shapes packing when shape params changed.

type VaultSpapesArray = {
    valid: IO.ConvertResult[];
    failed: string[];
};

export const vaultSpapes: Atomize<VaultSpapesArray> = {
    validAtom: atomWithCallback<IO.ConvertResult[]>([], saveVaultShapes),
    failedAtom: atomWithCallback<string[]>([], saveVaultShapes),
};

function saveVaultShapes({ get, set }: { get: Getter, set: Setter; }) {
    const valid = get(vaultSpapes.validAtom);
    const failed = get(vaultSpapes.failedAtom);
    set(_shapesAtom, [...IO.convertResultForVault(valid), ...failed]);
    Storage.saveDebounced(get);
}

function appendShapes(get: Getter, set: Setter, newShapes: string[]) {
    const { parsedShapes, failedShapes, } = IO.parseVaultShapes(newShapes);
    const valid = get(vaultSpapes.validAtom);
    const failed = get(vaultSpapes.failedAtom);
    set(vaultSpapes.validAtom, [...valid, ...parsedShapes]);
    set(vaultSpapes.failedAtom, [...failed, ...failedShapes]); //toastError('test');
}

const runFetchVaultShapesAtom = atom(() => null, (get, set) => appendShapes(get, set, Storage.initialData.vaultData.shapes));
runFetchVaultShapesAtom.onMount = (runFetch) => runFetch();

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchVaultShapesAtom);
    }
);

//#endregion Vault loader

//#region Vault operations

export const vaultActions = {
    doSaveShapeAtom: atom(null,
        (get, set,) => {
            const shapeParams = { ...get(editorShapeParamsAtom) };
            const shape = generate(shapeParams);
            const gadgets = undefined;

            shapeParams.id = get(vaultSpapes.validAtom).find(({ id }) => id === shapeParams.id) ? uuid() : shapeParams.id;

            set(vaultSpapes.validAtom, (p) => [...p, { id: shapeParams.id, shapeParams, shape, gadgets }]);
        }
    ),
    doRemoveShapeAtom: atom(null, //TODO: should have access by Id or by index is enough?
        (get, set, idx: number) => {
            const shapes = get(vaultSpapes.validAtom);
            const newShapes = shapes.slice(0, idx).concat(shapes.slice(idx + 1));
            set(vaultSpapes.validAtom, newShapes);
        }
    ),
    doRemoveAllAtom: atom(null,
        (get, set,) => {
            set(vaultSpapes.validAtom, []);
        }
    ),
    doAppendDefaultPersetsAtom: atom(null,
        (get, set,) => {
            appendShapes(get, set, defaultShapes);
        }
    ),
};

//#endregion Vault operations
