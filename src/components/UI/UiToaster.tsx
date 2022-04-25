import React from 'react';
import { toast as callToast, Toaster as ToasterComponent } from 'react-hot-toast';

export function UIToaster() {
    return (
        <div className="toaser">
            <ToasterComponent
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    );
}
/*
export const toastWarning: typeof callToast.custom = (message, options) => {
    return callToast(message, {
        style: {
            backgroundColor: 'tomato',
        },
        icon: '👏',
    });
};

export function toast(message: string) {
    //console.log(`%c${message}`, 'color: orange');
    toastWarning(message);
}
*/
export function toastSucceeded(message: string) {
    callToast(message, {
        style: {
            backgroundColor: 'tomato',
        },
        icon: '👏',
    });
}

export function toastError(message: string) {
    callToast.custom((t) =>
        // <div className="max-w-[540px] text-red-50 bg-red-600 border-red-700 border-2 rounded shadow-lg shadow-red-900/40">
        <div className="max-w-[540px] text-red-50 bg-red-600 border-red-700 border-2 rounded shadow-lg shadow-red-900/40">
            <div className="px-3 py-1 flex items-center justify-between">
                <div className="">{message}</div>
                <div className="ml-4 w-12 h-12 flex items-center justify-center hover:bg-red-400 active:scale-[.97] cursor-pointer select-none"
                    onClick={() => callToast.remove(t.id)}
                >❌</div>
            </div>
        </div>
    );
}

//TODO: set atom to add message to the list of errors popup
//❌✖️
