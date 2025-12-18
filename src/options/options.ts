// Remember to update OptionsValidator if this interface is changed.
export interface Options {
    datePrefix: string | null;
    useDate: boolean;
    ignoreLinesPrefixes: string[];
    headingOrder: string[];
    indentMultiplier: number | null;
    ignoreHeadingCase: boolean;
    copyOnMerge: boolean;
    layoutMode: string;
}