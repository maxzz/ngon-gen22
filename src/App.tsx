import { useAtomValue } from 'jotai';
import { localStorageDataLoaderAtom } from './store';
import { App1_Header } from './components/app1-header';
import { App2_Main } from './components/app2-main';
import { App3_Footer } from './components/app3-footer';
import { UIToaster } from './components/UI/UiToaster';
import { UISymbolsDefs } from './components/UI/icons';
import './App.scss';

function LocalStorageDataLoader() {
    useAtomValue(localStorageDataLoaderAtom);
    return null;
}

function PopperRoot() {
    return (
        <div className="absolute z-50">
            <div id="portal"></div>
        </div>
    );
}

export function App() {
    return (<>
        <UIToaster />
        <PopperRoot />
        <UISymbolsDefs />
        <LocalStorageDataLoader />

        <div className="min-h-full overflow-hidden bg-slate-50">
            <div className="h-screen flex flex-col">
                <App1_Header />
                <App2_Main />
                <App3_Footer />
            </div>
        </div>
    </>);
}

// TODO: when add new shape the last four shapes are duplicated, but can be removed by clicking on 'Remove duplicated presets' button. Check why this happens.
