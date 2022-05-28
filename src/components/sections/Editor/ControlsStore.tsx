import React from "react";
import { useCreateStore } from "leva";

export function ControlsStore<T extends JSX.Element>({ children }: { children: T; }) {
    const store = useCreateStore();
    return React.cloneElement(children, { store });

}