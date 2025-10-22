import { Options } from "./options";

export class OptionsHelper {
    static getDefaultOptions(): Options {
        return {
            datePrefix: null,
            useDate: false,
            ignoreLinesPrefixes: [],
            headingOrder: [],
            indentMultiplier: null,
            ignoreHeadingCase: false,
            copyOnMerge: false
        };
    }
}