import { Options } from "./options";

export class OptionsValidator {
    static isValidOptions(obj: any): obj is Options {
        if (obj == null || typeof obj !== 'object')
            return false;

        // Check datePrefix: must be string or null
        if (!('datePrefix' in obj) || (obj.datePrefix !== null && typeof obj.datePrefix !== 'string'))
            return false;

        // Check ignoreLinesPrefixes: must be array of strings
        if (!('ignoreLinesPrefixes' in obj) || !this.isStringArray(obj.ignoreLinesPrefixes))
            return false;

        // Check headingOrder: must be array of strings
        if (!('headingOrder' in obj) || !this.isStringArray(obj.headingOrder))
            return false;

        // Check ignoreHeadingCase: must be boolean
        if (!('ignoreHeadingCase' in obj) || typeof obj.ignoreHeadingCase !== 'boolean')
            return false;

        return true;
    }

    private static isStringArray(array: any): boolean {
        return Array.isArray(array) && array.every(item => typeof item === 'string');
    }
}