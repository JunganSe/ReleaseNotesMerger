import { Options } from "./options";

export class OptionsHelper {
    static getDefaultOptions(): Options {
        return {
            datePrefix: null,
            ignoreLinesPrefixes: [],
            headingOrder: [],
            indentMultiplier: 0,
            ignoreHeadingCase: false,
            copyOnMerge: false
        };
    }
}