// Remember to update OptionsValidator if this interface is changed.
export interface Options {
    datePrefix: string | null;
    ignoreLinesPrefixes: string[];
    headingOrder: string[];
    indentMultiplier: number;
    ignoreHeadingCase: boolean;
    copyOnMerge: boolean;
}