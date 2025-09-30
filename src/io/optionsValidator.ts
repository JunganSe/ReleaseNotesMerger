import { Options } from "./options";

export class OptionsValidator {
    static isValidOptions(obj: any): obj is Options {
        return (obj != null)
            && (typeof obj === 'object')
            && ('datePrefix' in obj)
            && (obj.datePrefix === null || typeof obj.datePrefix === 'string')
            && ('ignoreLinesPrefixes' in obj)
            && (this.isStringArray(obj.ignoreLinesPrefixes))
            && ('headingOrder' in obj)
            && (this.isStringArray(obj.headingOrder))
            && ('ignoreHeadingCase' in obj)
            && (typeof obj.ignoreHeadingCase === 'boolean');
    }

    private static isStringArray(array: any): boolean {
        return Array.isArray(array)
            && array.every(item => typeof item === 'string');
    }
}