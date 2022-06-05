import { atom, Getter } from 'jotai';
import { atomWithCallback, LoadingDataState, loadingDataStateInit } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { toastError } from '@/components/UI/UiToaster';
import { dummyShape } from './api/shape-utils';
import { defLevaControls } from '@/components/UI/Leva/ControlsLeva';
import { ShapeNgon } from './api/shape-types';
import { generate } from './api/shape-generator-ngon';

//#region LocalStorage

namespace Storage {
    const KEY = 'react-svg-shapes22-01';

    type Store = {
        open1: boolean;
    };

    export let initialData: Store = {
        open1: false,
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
    }
    load();

    export const save = debounce(function _save(get: Getter) {
        let newStore: Store = {
            open1: get(section1_OpenAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

//#endregion LocalStorage

// Data files

//#region ServerReleaseNotes

const releaseNotesStateAtom = atom<LoadingDataState<string>>(loadingDataStateInit());

const runFetchReleaseNotesAtom = atom(
    (get) => get(releaseNotesStateAtom),
    (_get, set) => {
        async function fetchData() {
            set(releaseNotesStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                // const notesText = await fetchReleaseNotes();
                // const markdown = marked(notesText);
                // set(releaseNotesStateAtom, { loading: false, error: null, data: markdown });
                set(releaseNotesStateAtom, { loading: false, error: null, data: null });
            } catch (error) {
                set(releaseNotesStateAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        };
        fetchData();
    }
);
runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();

export const releaseNotesAtom = atom<string>((get) => get(releaseNotesStateAtom).data || '');

//#endregion ServerReleaseNotes

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
    }
);

// Derivative data

const correlateAtom = atom(
    null,
    (get, set) => {
        const stateNotes = get(releaseNotesStateAtom);
        if (stateNotes.loading) {
            return;
        }
    }
);

// UI state

export const section1_OpenAtom = atomWithCallback<boolean>(Storage.initialData.open1, ({ get }) => Storage.save(get));

// Shapes

export const editorShapeAtom = atom(dummyShape());

// Leva

export const levaControlsAtom = atom(defLevaControls);

export const shapePathAtom = atom(
    (get) => {
        const { scene } = dummyShape();
        const leva = get(levaControlsAtom);
        let shapeNgon: ShapeNgon = {
            ...dummyShape(),
        };
        shapeNgon.outerN = leva.nOuter;
        shapeNgon.innerN = leva.nInner;
        shapeNgon.outer = { x: leva.outerX, y: leva.outerY };
        shapeNgon.inner = { x: leva.innerX, y: leva.innerY };

        const res = generate(shapeNgon);
        return res;
    },
);

export const paramAtom = atom(1);

//////////////////////
