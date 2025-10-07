// Remember to update OptionsValidator if this is changed!

export interface Options {
    datePrefix: string | null;
    ignoreLinesPrefixes: string[];
    headingOrder: string[];
    ignoreHeadingCase: boolean;
    copyOnMerge: boolean;
}